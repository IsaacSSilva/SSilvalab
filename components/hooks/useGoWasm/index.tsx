"use client";
// hooks/useGoWasm.ts
import { useCallback, useEffect, useState } from "react";

interface GoWasmModule {
  run: (...args: any[]) => any;
  [key: string]: any;
}

export const useGoWasm = (wasmUrl: string) => {
  const [module, setModule] = useState<GoWasmModule | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let go: any;

    const loadWasm = async () => {
      try {
        // @ts-expect-error - Go é global do wasm_exec.js
        if (!window.Go) {
          throw new Error(
            "Go WASM runtime não carregado. Adicione wasm_exec.js ao projeto.",
          );
        }

        // @ts-expect-error
        go = new window.Go();

        const response = await fetch(wasmUrl);
        const wasmBuffer = await response.arrayBuffer();

        const result = await WebAssembly.instantiate(
          wasmBuffer,
          go.importObject,
        );

        // Rodar o módulo Go
        go.run(result.instance);

        // Aguardar um pouco para garantir que as funções foram exportadas
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Pegar as funções exportadas
        setModule(window as any);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar WASM");
        setLoading(false);
      }
    };

    loadWasm();

    return () => {
      // Cleanup se necessário
    };
  }, [wasmUrl]);

  const execute = useCallback(
    (functionName: string, ...args: any[]) => {
      if (!module) {
        throw new Error("Módulo WASM não carregado");
      }

      const func = (window as any)[functionName];
      if (typeof func !== "function") {
        throw new Error(
          `Função '${functionName}' não encontrada no módulo WASM`,
        );
      }

      return func(...args);
    },
    [module],
  );

  return { module, loading, error, execute };
};
