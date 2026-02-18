/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
"use client"
import type React from "react";
import { useEffect, useRef, useState } from "react";

interface ScrambleSequenceProps {
  // Modo sequência: { "palavra": tempoEmMs }
  sequence?: Record<string, number>;
  
  // Modo descoberta: texto completo que será revelado palavra por palavra
  discoveryText?: string;
  
  // Configurações gerais
  loop?: boolean;
  duration?: number; // Duração da animação de cada palavra
  pauseBetweenWords?: number; // Pausa entre palavras no modo descoberta
  initialDelay?: number;
  
  // Efeito crescente: palavra cresce de 1 caractere até o tamanho completo
  growEffect?: boolean;
  
  // Limites de duração
  maxDurationPerWord?: number; // Duração máxima para cada palavra (ms)
  maxTotalDuration?: number; // Duração máxima para o texto completo no modo descoberta (ms)
  
  onComplete?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const ScrambleSequence: React.FC<ScrambleSequenceProps> = ({
  sequence,
  discoveryText,
  loop = false,
  duration = 2000,
  pauseBetweenWords = 500,
  initialDelay = 0,
  growEffect = false,
  maxDurationPerWord,
  maxTotalDuration,
  onComplete,
  className = "",
  style = {},
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [displayText, setDisplayText] = useState<string>("");
  const [revealedWords, setRevealedWords] = useState<string[]>([]);
  const [scrambleKey, setScrambleKey] = useState<number>(0);

  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initialDelayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Determina se está em modo descoberta ou sequência
  const isDiscoveryMode = !!discoveryText;
  const words = isDiscoveryMode 
    ? discoveryText.split(/\s+/).filter(w => w.length > 0)
    : [];
  const sequenceEntries = sequence ? Object.entries(sequence) : [];
  
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

  // Calcula a duração efetiva para cada palavra no modo descoberta
  const getEffectiveDuration = (wordIndex: number): number => {
    let effectiveDuration = duration;
    
    // Aplica limite por palavra se definido
    if (maxDurationPerWord !== undefined) {
      effectiveDuration = Math.min(effectiveDuration, maxDurationPerWord);
    }
    
    // No modo descoberta, aplica limite total se definido
    if (isDiscoveryMode && maxTotalDuration !== undefined && words.length > 0) {
      // Calcula duração média por palavra para não exceder o total
      const totalWords = words.length;
      const totalPauseTime = (totalWords - 1) * pauseBetweenWords;
      const availableAnimationTime = maxTotalDuration - totalPauseTime;
      const averageDurationPerWord = Math.max(100, availableAnimationTime / totalWords);
      
      effectiveDuration = Math.min(effectiveDuration, averageDurationPerWord);
    }
    
    // Garante um mínimo de 100ms para ter animação visível
    return Math.max(100, effectiveDuration);
  };

  const getRandomChar = (): string => {
    return chars[Math.floor(Math.random() * chars.length)];
  };

  // Limpa timers e animações
  const cleanup = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = null;
    }
    if (initialDelayTimeoutRef.current) {
      clearTimeout(initialDelayTimeoutRef.current);
      initialDelayTimeoutRef.current = null;
    }
  };

  // Avança para próxima palavra
  const goToNext = () => {
    const maxLength = isDiscoveryMode ? words.length : sequenceEntries.length;
    const nextIndex = currentIndex + 1;

    if (nextIndex >= maxLength) {
      if (loop) {
        setCurrentIndex(0);
        setRevealedWords([]);
        setDisplayText(""); // Limpa o texto antes de recomeçar
        setScrambleKey((prev) => prev + 1);
        setIsAnimating(true);
      } else {
        setIsAnimating(false);
        if (onComplete) {
          onComplete();
        }
      }
    } else {
      setDisplayText(""); // Limpa o texto antes da próxima palavra
      setCurrentIndex(nextIndex);
      setScrambleKey((prev) => prev + 1);
      setIsAnimating(true);
    }
  };

  // Efeito para lidar com o delay inicial
  useEffect(() => {
    if (hasStarted) return;

    if (initialDelayTimeoutRef.current) {
      clearTimeout(initialDelayTimeoutRef.current);
    }

    if (initialDelay > 0) {
      initialDelayTimeoutRef.current = setTimeout(() => {
        setHasStarted(true);
        setIsAnimating(true);
      }, initialDelay);
    } else {
      setHasStarted(true);
      setIsAnimating(true);
    }

    return () => {
      if (initialDelayTimeoutRef.current) {
        clearTimeout(initialDelayTimeoutRef.current);
      }
    };
  }, [initialDelay, hasStarted]);

  // Efeito principal de animação
  useEffect(() => {
    const dataSource = isDiscoveryMode ? words : sequenceEntries;
    
    if (!isAnimating || !hasStarted || dataSource.length === 0) return;

    cleanup();
    startTimeRef.current = null;

    const targetWord = isDiscoveryMode 
      ? words[currentIndex]
      : sequenceEntries[currentIndex][0];
      
    const pauseTime = isDiscoveryMode 
      ? pauseBetweenWords 
      : sequenceEntries[currentIndex][1];

    // Calcula a duração efetiva para esta palavra
    const effectiveDuration = isDiscoveryMode 
      ? getEffectiveDuration(currentIndex)
      : (maxDurationPerWord !== undefined ? Math.min(duration, maxDurationPerWord) : duration);

    // No modo sequência, sempre seta displayText inicial
    // No modo descoberta, só seta se for a primeira palavra (currentIndex === 0)
    if (!isDiscoveryMode || currentIndex === 0) {
      const initialScrambled = growEffect
        ? getRandomChar()
        : targetWord.split("").map(() => getRandomChar()).join("");
      
      setDisplayText(initialScrambled);
    }
    // No modo descoberta (palavras subsequentes), displayText já foi setado no setTimeout anterior

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / effectiveDuration, 1);

      let newText: string;

      if (growEffect) {
        // EFEITO CRESCENTE: palavra cresce de 1 caractere até o tamanho completo
        const currentLength = Math.max(1, Math.ceil(progress * targetWord.length));
        const visiblePart = targetWord.slice(0, currentLength);
        
        newText = visiblePart
          .split("")
          .map((char, index) => {
            // Calcula quando cada caractere deve ser revelado
            const charRevealTime = index / targetWord.length;
            
            if (progress < charRevealTime) {
              return getRandomChar();
            } else {
              const timeSinceReveal = progress - charRevealTime;
              const revealProgress = timeSinceReveal / (1 - charRevealTime);
              
              // Aumenta gradualmente a chance de mostrar o caractere correto
              if (revealProgress > 0.7 || Math.random() < revealProgress * revealProgress) {
                return char;
              } else {
                return getRandomChar();
              }
            }
          })
          .join("");
      } else {
        // EFEITO ORIGINAL: todos os caracteres desde o início
        const charResolveDelays = targetWord.split("").map((_, index) => {
          const startPercent = (index / targetWord.length) * 0.3;
          const durationPercent = 0.7;
          return { startPercent, durationPercent };
        });

        newText = targetWord
          .split("")
          .map((char, index) => {
            const { startPercent, durationPercent } = charResolveDelays[index];
            const charStartTime = startPercent;
            const charEndTime = startPercent + durationPercent;

            if (progress < charStartTime) {
              return getRandomChar();
            } else if (progress >= charEndTime) {
              return char;
            } else {
              const charProgress = (progress - charStartTime) / durationPercent;
              if (charProgress > 0.8 || Math.random() < charProgress * charProgress) {
                return char;
              } else {
                return getRandomChar();
              }
            }
          })
          .join("");
      }

      setDisplayText(newText);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Completa a animação mostrando a palavra final
        setDisplayText(targetWord);
        
        // No modo descoberta, agenda a transição para a próxima palavra
        if (isDiscoveryMode) {
          pauseTimeoutRef.current = setTimeout(() => {
            const nextIdx = currentIndex + 1;
            
            // Verifica se tem próxima palavra
            if (nextIdx < words.length) {
              const nextWord = words[nextIdx];
              // Prepara o scrambled inicial para a próxima palavra
              const initialScrambled = growEffect
                ? getRandomChar()
                : nextWord.split("").map(() => getRandomChar()).join("");
              
              // Atualiza tudo de uma vez
              setRevealedWords(prev => [...prev, targetWord]);
              setDisplayText(initialScrambled); // Já começa com scrambled!
              setCurrentIndex(nextIdx);
              setScrambleKey((prev) => prev + 1);
            } else if (loop) {
              // Reinicia o loop
              setRevealedWords([]);
              setDisplayText("");
              setCurrentIndex(0);
              setScrambleKey((prev) => prev + 1);
            } else {
              // Terminou
              setRevealedWords(prev => [...prev, targetWord]);
              setDisplayText("");
              setIsAnimating(false);
              if (onComplete) {
                onComplete();
              }
            }
          }, pauseTime);
        } else {
          // Modo sequência normal
          pauseTimeoutRef.current = setTimeout(() => {
            goToNext();
          }, pauseTime);
        }
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return cleanup;
  }, [currentIndex, scrambleKey, isAnimating, hasStarted, maxDurationPerWord, maxTotalDuration]);

  // Reset quando as props mudam
  useEffect(() => {
    setCurrentIndex(0);
    setRevealedWords([]);
    setScrambleKey((prev) => prev + 1);
    setHasStarted(false);
    setIsAnimating(false);
    setDisplayText("");
  }, [sequence, discoveryText, growEffect, maxDurationPerWord, maxTotalDuration]);

  if (!hasStarted) {
    return null; // Não mostra nada durante o delay inicial
  }

  // Modo descoberta: mostra palavras já reveladas + palavra atual animando
  if (isDiscoveryMode) {
    if (words.length === 0) return null;
    
    return (
      <span className={className} style={style}>
        {revealedWords.map((word, index) => (
          <span key={`revealed-${index}`}>
            {word}
            {" "}
          </span>
        ))}
        {isAnimating && displayText && <span>{displayText}</span>}
      </span>
    );
  }

  // Modo sequência: mostra apenas a palavra atual
  if (sequenceEntries.length === 0) return null;
  
  return (
    <span className={className} style={style}>
      {displayText || sequenceEntries[0][0]}
    </span>
  );
};

export default ScrambleSequence;