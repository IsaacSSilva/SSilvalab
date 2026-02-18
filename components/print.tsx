"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ICreator {
  name: string;
  avatar?: string;
}

interface IPin {
  id: number;
  title: string;
  description?: string;
  height: number;
  image?: string;
  gradient?: string;
  creator: ICreator;
}

interface IPinWithKey extends IPin {
  key: string;
  setIndex: number;
}

interface PinterestLayoutProps {
  pins: IPin[];
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PinterestLayout({ pins }: PinterestLayoutProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [, setIsScrolling] = useState<boolean>(false);

  // Valida e normaliza os pins
  const validPins: IPin[] = Array.isArray(pins) ? pins : [];

  // Cria 3 cópias do conteúdo para loop suave (memoizado)
  const triplicatedPins = useMemo<IPinWithKey[]>(() => {
    if (validPins.length === 0) return [];

    return [
      ...validPins.map((pin, i): IPinWithKey => ({ ...pin, key: `set1-${i}`, setIndex: 0 })),
      ...validPins.map((pin, i): IPinWithKey => ({ ...pin, key: `set2-${i}`, setIndex: 1 })),
      ...validPins.map((pin, i): IPinWithKey => ({ ...pin, key: `set3-${i}`, setIndex: 2 })),
    ];
  }, [validPins]);

  // Distribui pins nas colunas (memoizado)
  const columns = useMemo<IPinWithKey[][]>(() => {
    const cols: IPinWithKey[][] = [[], [], []];

    triplicatedPins.forEach((pin, index) => {
      cols[index % 3].push(pin);
    });

    return cols;
  }, [triplicatedPins]);

  // Gerencia o loop infinito do scroll
  const handleScroll = useCallback((): void => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;

    // Calcula a altura de um "set" de pins (1/3 do conteúdo total)
    const setHeight = scrollHeight / 3;

    // Quando passar do segundo set (66%), volta para o primeiro set (33%)
    if (scrollTop > setHeight * 2) {
      container.scrollTop = setHeight;
    }

    // Quando voltar antes do primeiro set (33%), pula para o segundo set (66%)
    if (scrollTop < setHeight) {
      container.scrollTop = setHeight * 2;
    }

    // Detecta quando está scrollando
    setIsScrolling(true);
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 150);
  }, []);

  // Inicializa o scroll no meio (segundo set)
  useEffect(() => {
    if (scrollContainerRef.current && triplicatedPins.length > 0) {
      const container = scrollContainerRef.current;
      setTimeout(() => {
        const setHeight = container.scrollHeight / 3;
        container.scrollTop = setHeight;
      }, 100);
    }
  }, [triplicatedPins]);

  // Cleanup do timeout
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  if (validPins.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Nenhum pin disponível</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="absolute w-full max-w-7xl h-screen overflow-hidden"
    >
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="absolute top-0 bottom-0 left-0 right-0 overflow-y-auto custom-scrollbar scrollhiden"
      >
        {/* Masonry Grid */}
        <div className="grid grid-cols-3 gap-8 p-4">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-8">
              {column.map((pin, index) => (
                <motion.div
                  key={pin.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: columnIndex * 0.05 + (index % 10) * 0.02,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.2 },
                  }}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-shadow duration-300"
                  style={{ height: `${pin.height}px` }}
                >
                  {/* Image ou Gradient Background */}
                  {pin.image ? (
                    <img
                      src={pin.image}
                      alt={pin.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${pin.gradient ?? ""}`}
                    />
                  )}

                  {/* Overlay com informações */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-5"
                  >
                    <h3 className="playfair text-white text-xl font-semibold mb-2">
                      {pin.title}
                    </h3>
                    {pin.description && (
                      <p className="text-white/80 text-sm mb-3 line-clamp-2">
                        {pin.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2">
                      {pin.creator.avatar ? (
                        <img
                          src={pin.creator.avatar}
                          alt={pin.creator.name}
                          className="w-8 h-8 rounded-full border border-white/30"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30" />
                      )}
                      <span className="text-white/90 text-sm">
                        {pin.creator.name}
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}