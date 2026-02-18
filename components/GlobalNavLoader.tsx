// app/components/GlobalNavLoader.tsx
"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export default function GlobalNavLoader() {
  const pathname = usePathname();
  const prevPath = useRef(pathname);
  const [visible, setVisible] = useState(false);
  const hideTimeout = useRef<number | null>(null);

  useEffect(() => {
    // Detecta clique em links internos (delegation)
    function onDocClick(e: MouseEvent) {
      const a =
        (e.target as Element).closest && (e.target as Element).closest("a");
      if (!a) return;
      const href = (a as HTMLAnchorElement).getAttribute("href");
      if (!href) return;
      // ignora links externos, anchors, tel:, mailto:, etc
      if (
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("#")
      )
        return;
      setVisible(true);
      if (hideTimeout.current) {
        window.clearTimeout(hideTimeout.current);
        hideTimeout.current = null;
      }
    }

    document.addEventListener("click", onDocClick, true);
    return () => document.removeEventListener("click", onDocClick, true);
  }, []);

  useEffect(() => {
    // Quando pathname muda, consideramos que a navegação terminou.
    if (prevPath.current !== pathname) {
      const minMs = 2000;
      const start = performance.now();
      const finalize = () => {
        setVisible(false);
      };
      const elapsed = performance.now() - start;
      const rem = Math.max(0, minMs - elapsed);
      hideTimeout.current = window.setTimeout(finalize, rem);
      prevPath.current = pathname;
    }
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(2,6,23,0.85)",
        color: "white",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div style={{ marginBottom: 12 }}>Carregando (mín. 2s)</div>
        <div
          style={{
            width: 64,
            height: 8,
            background: "rgba(255,255,255,0.12)",
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: "100%",
              transformOrigin: "left center",
              animation: "progress 2s linear forwards",
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { transform: scaleX(0); background: rgba(255,255,255,0.25); }
          to   { transform: scaleX(1); background: rgba(255,255,255,0.9); }
        }
      `}</style>
    </div>
  );
}
