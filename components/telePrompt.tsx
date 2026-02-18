import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export function TelePrompt() {
  const prompts = [
    "Aproveite",
    "Seu negocio pode ser mais proficional com um web site",
    "Do jeito que voce quiser",
    "que tal um sitema de organizacao pensado para a sua empresa ?",
    "Nao perda tempo, deixe tudo com a cara do seu negocio",
    "De uma espereincia que so sua marca pode dar",
    "Aproveite a oportunidade, vamos conectar sua empresa ao sucesso !",
    "💻  🤓☝️"
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroll = scrollRef.current;
    if (!scroll) return;

    let position = 0;
    const speed = 0.5; // pixels por frame

    const animate = () => {
      position -= speed;
      
      // Reset quando completar o primeiro set
      if (Math.abs(position) >= scroll.scrollWidth / 2) {
        position = 0;
      }
      
      scroll.style.transform = `translateX(${position}px)`;
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <motion.div
      initial={{ y: '-200%' }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
        delay: 0.8,
      }} 
      className="relative overflow-hidden h-10 w-52 bg-[url('/8.jpg')] bg-cover bg-right-top bg-no-repeat rounded-2xl
      border-2 border-zinc-950 shadow-lg shadow-zinc-50/10"
    >
      <div 
        ref={scrollRef}
        className="flex gap-4 absolute whitespace-nowrap"
      >
        {/* Duplicar para criar loop infinito */}
        {[...prompts, ...prompts].map((prompt, index) => (
          <div 
            key={index}
            className="flex items-center h-10 px-4 font-bold text-sm font-jetbrains text-white"
          >
            {prompt}
          </div>
        ))}
      </div>
    </motion.div>
  );
}