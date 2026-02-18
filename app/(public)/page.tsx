"use client";

import { motion } from "framer-motion";
import { div } from "framer-motion/client";
import { AlignCenter, Plus, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import pins from "@/components/pins-data.json";
import PinterestLayout from "@/components/print";
import ScrambleSequence from "@/components/Scramblesequence";
import { TelePrompt } from "@/components/telePrompt";

export default function Home() {
  const [sobre, setSobre] = useState(0);
  const [work, setWork] = useState(false);
  const [about, setAbout] = useState(false);
  const [idea, setIdea] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [projects, setProjects] = useState(false);
  const sobremin = [
    "Sou uma pessoa criativa",
    "gosto de rock",
    "sou dedicado",
    "tenho curiosidade",
    "trabalho como freelancer na minha cidade",
    "gosto de eletrônica",
    "aceito trabalhos e seus projetos",
    "estou estudando inglês e espanhol",
  ];

  useEffect(() => {
    if (sobre >= sobremin.length) {
      setSobre(0);
      return;
    }
  }, [sobre]);

  return (
    <main className="w-full h-screen overflow-hidden">
      <header className="w-full text-zinc-50 flex justify-between px-5 py-2.5 tracking-wider absolute top-0 z-50 select-none">
        <span className="font-black">S.Silva</span>
        <TelePrompt />
        <span className="font-black tracking-widest italic">@2026</span>
      </header>

      <div className="w-full max-w-[1800px] text-zinc-50 py-32 px-20 flex flex-col gap-24 m-auto ">
        <div className="w-full flex ">
          <motion.div
            initial={{ x: "-50%", right: "-50%" }}
            animate={{ x: 0, right: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: 13.8, // espera 0.3s antes de começar
            }}
            className=" w-2xl flex flex-col gap-10 md:border-l-4 relative border-zinc-200/5 md:pl-7 "
          >
            <div className="flex-wrap inline-flex gap-2.5">
              <h1 className="md:text-4xl text-2xl font-black ">
                <ScrambleSequence
                  discoveryText={
                    "Seus sonhos merecem destaque. Você precisa de soluções tão brilhantes quanto seu crescimento."
                  }
                  growEffect={true}
                  pauseBetweenWords={100}
                  maxTotalDuration={7500}
                  initialDelay={1}
                  className="cursor-progress select-none"
                />
              </h1>

              <p className="md:text-2xl text-lg font-bold">
                <ScrambleSequence
                  discoveryText="Isaac - Desenvolvedor de software."
                  growEffect={true}
                  pauseBetweenWords={0}
                  maxTotalDuration={1500}
                  initialDelay={8000}
                  className="cursor-progress select-none"
                />
              </p>
            </div>

            <div className="tracking-wider md:text-lg">
              <ScrambleSequence
                discoveryText="vamos crio experiências incríveis e desenvolvo a sua marca, fazendo com que ela se destaque e 
                tenha sucesso no futuro."
                growEffect={true}
                pauseBetweenWords={0}
                maxTotalDuration={2000}
                initialDelay={10000}
                className="cursor-progress select-none"
              />
            </div>
          </motion.div>
        </div>

        <div className="md:grid grid-rows-2 grid-cols-4 gap-9 w-full max-w-3xl h-80 uppercase select-none hidden md:text-xl lg:text-2xl">
          <div
            className="bg-amber-300 size-full row-span-2 rounded-md bg-[url('/1.jpg')] bg-cover bg-center bg-no-repeat font-black ext-zinc-950 p-5 
          hover:bg-bottom-left transition-all duration-300 overflow-hidden group flex flex-col justify-between cursor-crosshair"
            onClickCapture={() => {
              setWork(true);
            }}
          >
            <h3 className="">Meu trabalho</h3>
            <p
              className="lowercase font-bold tracking-wider font-mono text-xs relative -right-[150%] 
              group-hover:right-0 transition-all duration-500 text-zinc-50"
            >
              Sou Desenvolvedor full-stack, vamos criar algo juntos ?
            </p>
          </div>
          {/** biome-ignore lint/a11y/noStaticElementInteractions: <explanation> */}
          <div
            className="bg-amber-300 size-full col-span-2 rounded-md bg-[url('/2.jpg')] bg-cover bg-center bg-no-repeat font-black text-zinc-50 p-5
          hover:bg-bottom-left transition-all duration-300 overflow-hidden group flex flex-col justify-between cursor-crosshair"
            onMouseLeave={() => {
              setSobre(sobre + 1);
            }}
            onClickCapture={() => {
              setAbout(true);
            }}
          >
            <h3 className="">Sobre</h3>
            <p
              className="lowercase font-bold tracking-wider font-mono text-xs relative -bottom-[150%] 
              group-hover:bottom-0 transition-all duration-75 text-zinc-50"
            >
              {sobremin[sobre]}
            </p>
          </div>
          <div
            className="bg-amber-300 size-full col-span-1 rounded-md bg-[url('/3.jpg')] bg-cover bg-center bg-no-repeat font-black text-zinc-950 p-5
          hover:bg-bottom-left transition-all duration-300 overflow-hidden group flex flex-col justify-between cursor-crosshair"
            onClickCapture={() => {
              setProjects(true);
            }}
          >
            <h3 className="">Projetos</h3>
            <p
              className="lowercase font-bold tracking-wider font-mono text-xs relative -right-[150%] 
              group-hover:right-0 transition-all duration-500 text-zinc-50"
            >
              Vai ter mais...
            </p>
          </div>
          {/* <div
            className="bg-amber-300 size-full row-span-2 rounded-md bg-[url('/4.jpg')] bg-cover bg-center bg-no-repeat font-black text-zinc-50 p-5
          hover:bg-bottom-left transition-all duration-300 overflow-hidden group flex flex-col justify-between hidden cursor-crosshair"
            // onClickCapture={() => {
            //   setAbout(true);
            // }}
          >
            <h3 className="">urld</h3>
            <p
              className="lowercase font-bold tracking-wider font-mono text-xs relative -right-[150%] 
              group-hover:right-0 transition-all duration-500"
            >
              tenha uma maior costumizacao com URL dynamic.
            </p>
          </div> */}
          {/* <div className="bg-amber-300 size-full rounded-md bg-[url('/5.jpg')] bg-cover bg-center bg-no-repeat 
          font-black text-zinc-950 p-5 hidden cursor-crosshair"
            // onClickCapture={() => {
            //   setAbout(true);
            // }}
          >
            <h3 className="">rede</h3>
          </div> */}
          <div
            className="bg-amber-300 size-full col-span-3 rounded-md bg-[url('/7.png')] bg-cover bg-center overflow-hidden group
          bg-no-repeat font-black text-zinc-50 p-5 flex flex-col justify-between hover:bg-bottom-left transition-all duration-300 cursor-crosshair"
            onClickCapture={() => {
              setIdea(true);
            }}
          >
            <h3 className="">tem uma ideia ?</h3>
            <p className="lowercase font-bold tracking-wider font-mono text-xs relative -bottom-10 group-hover:bottom-0 transition-all duration-500">
              Iremos tornar seus sonhos mais do que realidade!
            </p>
          </div>
        </div>
      </div>
      <div className="w-full bg-amber-400 text-zinc-50 md:hidden block">
        {openMenu && (
          <div className="fixed w-full h-screen top-0 bg-zinc-950/65 ">
            <div className="grid grid-cols-2 grid-flow-row gap-10 w-full h-2/3 pt-20 px-10">
              <div
                className="bg-amber-300 size-full rounded-md bg-[url('/1.jpg')] bg-cover bg-center bg-no-repeat font-black ext-zinc-950 p-5 
                hover:bg-bottom-left transition-all duration-300 overflow-hidden group flex flex-col justify-between cursor-crosshair"
                onClickCapture={() => {
                  setWork(true);
                }}
              >
                <h3 className="">Meu trabalho</h3>
                <p
                  className="lowercase font-bold tracking-wider font-mono text-xs relative -right-[150%] 
                  group-hover:right-0 transition-all duration-500 text-zinc-50"
                >
                  Sou Desenvolvedor full-stack, vamos criar algo juntos ?
                </p>
              </div>
              {/** biome-ignore lint/a11y/noStaticElementInteractions: <explanation> */}
              <div
                className="bg-amber-300 size-full rounded-md bg-[url('/2.jpg')] bg-cover bg-center bg-no-repeat font-black text-zinc-50 p-5
              hover:bg-bottom-left transition-all duration-300 overflow-hidden group flex flex-col justify-between cursor-crosshair"
                onMouseLeave={() => {
                  setSobre(sobre + 1);
                }}
                onClickCapture={() => {
                  setAbout(true);
                }}
              >
                <h3 className="">Sobre</h3>
                <p
                  className="lowercase font-bold tracking-wider font-mono text-xs relative -bottom-[150%] 
                  group-hover:bottom-0 transition-all duration-75 text-zinc-50"
                >
                  {sobremin[sobre]}
                </p>
              </div>
              <div
                className="bg-amber-300 size-full rounded-md bg-[url('/3.jpg')] bg-cover bg-center bg-no-repeat font-black text-zinc-950 p-5
              hover:bg-bottom-left transition-all duration-300 overflow-hidden group flex flex-col justify-between cursor-crosshair"
                onClickCapture={() => {
                  setProjects(true);
                }}
              >
                <h3 className="">Projetos</h3>
                <p
                  className="lowercase font-bold tracking-wider font-mono text-xs relative -right-[150%] 
                  group-hover:right-0 transition-all duration-500 text-zinc-50"
                >
                  Vai ter mais...
                </p>
              </div>
              <div
                className="bg-amber-300 size-full rounded-md bg-[url('/7.png')] bg-cover bg-center overflow-hidden group
              bg-no-repeat font-black text-zinc-50 p-5 flex flex-col justify-between hover:bg-bottom-left transition-all duration-300 cursor-crosshair"
                onClickCapture={() => {
                  setIdea(true);
                }}
              >
                <h3 className="">tem uma ideia ?</h3>
                <p className="lowercase font-bold tracking-wider font-mono text-xs relative -bottom-20 group-hover:bottom-0 transition-all duration-500">
                  Iremos tornar seus sonhos mais do que realidade!
                </p>
              </div>
              
            </div>
          </div>
        )}
        <Plus 
          className="fixed left-1/2 -translate-x-1/2 bottom-20 text-zinc-950 
          bg-zinc-50 rounded-full size-9 p-1 z-50 cursor-pointer" 
          onClickCapture={() => {
            setOpenMenu(!openMenu)
            if (work || about || idea || projects !== true) {
              setWork(false)
              setAbout(false)
              setIdea(false)
              setProjects(false)
              return
            }
          }}
        />

        
      </div>

      {/* work */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: work ? 0 : "-100%" }}
        transition={{
          duration: 0.25,
          ease: "easeIn",
          delay: 0, // espera 0.3s antes de começar
        }}
        className="fixed w-full h-screen bg-zinc-950 right-[00%] top-0"
      >
        <div
          className="absolute top-20 left-52 border border-zinc-200 rounded-lg rounded-r-none
        text-zinc-50 flex gap-2.5 py-1 px-2.5 font-mono cursor-pointer"
          onClickCapture={() => {
            setWork(false);
          }}
        >
          <X className="size-5 " />{" "}
          <p className="tracking-wider text-sm">voltar</p>
        </div>
        <div className="max-w-7xl h-screen m-auto z-50 ">
          <PinterestLayout pins={pins.pins} />
        </div>
      </motion.div>

      {/* about */}
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: about ? 0 : "-100%" }}
        transition={{
          duration: 0.25,
          ease: "easeIn",
          delay: 0, // espera 0.3s antes de começar
        }}
        className="fixed w-full h-screen bg-zinc-950 right-[00%] top-0"
      >
        <div
          className="absolute top-20 left-52 border border-zinc-200 rounded-lg rounded-r-none
        text-zinc-50 flex gap-2.5 py-1 px-2.5 font-mono cursor-pointer"
          onClickCapture={() => {
            setWork(false);
          }}
        >
          <X className="size-5 " />{" "}
          <p className="tracking-wider text-sm">voltar</p>
        </div>
        <div className="max-w-7xl h-screen m-auto z-50 ">
          <PinterestLayout pins={pins.pins} />
        </div>
      </motion.div>

      {/* idea ? */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: idea ? 0 : "100%" }}
        transition={{
          duration: 0.25,
          ease: "easeIn",
          delay: 0, // espera 0.3s antes de começar
        }}
        className="fixed w-full h-screen bg-zinc-950 right-[00%] top-0"
      >
        <div
          className="absolute top-20 left-52 border border-zinc-200 rounded-lg rounded-r-none
        text-zinc-50 flex gap-2.5 py-1 px-2.5 font-mono cursor-pointer"
          onClickCapture={() => {
            setWork(false);
          }}
        >
          <X className="size-5 " />{" "}
          <p className="tracking-wider text-sm">voltar</p>
        </div>
        <div className="max-w-7xl h-screen m-auto z-50 ">
          <PinterestLayout pins={pins.pins} />
        </div>
      </motion.div>

      {/* projects */}
      <motion.div
        initial={{ x: "200%" }}
        animate={{ x: projects ? 0 : "200%" }}
        transition={{
          duration: 0.25,
          ease: "easeIn",
          delay: 0, // espera 0.3s antes de começar
        }}
        className="fixed w-full h-screen bg-zinc-950 right-[00%] top-0"
      >
        <div
          className="absolute top-20 left-52 border border-zinc-200 rounded-lg rounded-r-none
        text-zinc-50 flex gap-2.5 py-1 px-2.5 font-mono cursor-pointer"
          onClickCapture={() => {
            setWork(false);
          }}
        >
          <X className="size-5 " />{" "}
          <p className="tracking-wider text-sm">voltar</p>
        </div>
        <div className="max-w-7xl h-screen m-auto z-50 ">
          <PinterestLayout pins={pins.pins} />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          delay: 45, // espera 0.3s antes de começar
        }}
        className="fixed hidden md:block"
      >
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
            delay: 15, // espera 0.3s antes de começar
          }}
          className="bg-zinc-200 min-w-80 max-w-fit h-20 rounded-md flex gap-5 justify-between items-center px-2.5 
            shadow-xl shadow-zinc-950/20 drop-shadow-xl drop-shadow-zinc-800/10 fixed bottom-14 right-32 z-50 border border-zinc-400"
        >
          <Image
            src="/ssilva.png"
            width={64}
            height={64}
            alt="Picture of the author"
            className="size-[64px] drop-shadow-2xl drop-shadow-zinc-800/10"
          />

          <div className="w-52 h-full text-zinc-950 flex flex-col gap-1 justify-center flex-wrap">
            <p className="font-mono font-extralight tracking-wider text-xs text-zinc-950/70">
              Hi, My name is Isaac
            </p>
            <h3 className="tracking-widest font-sm font-bold">
              Welcome to my portfolio.
            </h3>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
