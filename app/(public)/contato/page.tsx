"use client";

import Image from "next/image";
import { redirect } from "next/navigation";
import ScrambleSequence from "@/components/Scramblesequence";

export default function Home() {
  return (
    <div className=" bg-zinc-950 h-screen w-full text-zinc-50 p-32 flex justify-center items-center gap-96">
      <div className="w-2xl  flex flex-col gap-10">
        <div className="flex-wrap inline-flex gap-2.5">
          <h1 className="text-4xl font-black ">
            <ScrambleSequence
              discoveryText="Seus sonhos merecem destaque. Você precisa de soluções tão brilhantes quanto seu crescimento."
              growEffect={true}
              pauseBetweenWords={100}
              maxTotalDuration={7500}
              initialDelay={1}
            />
          </h1>

          <p className="text-2xl font-bold">
            <ScrambleSequence
              discoveryText="Isaac - Desenvolvedor de software."
              growEffect={true}
              pauseBetweenWords={0}
              maxTotalDuration={3500}
              initialDelay={8000}
            />
          </p>
        </div>

        <div className="tracking-wider text-lg">
          <ScrambleSequence
            discoveryText="Eu crio experiências incríveis e desenvolvo a sua marca, fazendo com que ela se destaque e 
            tenha sucesso no futuro."
            growEffect={true}
            pauseBetweenWords={0}
            maxTotalDuration={2000}
            initialDelay={11000}
          />
        </div>

        <div>
          <button
            className="w-[228px] flex justify-between items-center text-left text-lg font-mono tracking-widest font-light bg-zinc-200 text-zinc-950 px-5 py-0.5 
            rounded-full cursor-pointer hover:bg-rose-500 transition-all duration-300 hover:w-72 hover:font-medium group"
            type="button"
            onClick={() => redirect("/contato")}
          >
            Desenvolva comigo
            <div className="bg-zinc-950 size-0 group-hover:size-2.5 opacity-0 group-hover:opacity-100 delay-100 transition-all rotate-45" />
          </button>
        </div>
      </div>
      {/* <Image
        src="/ssilva.png"
        width={700}
        height={700}
        alt="Picture of the author"
        className="size-[700px] drop-shadow-2xl drop-shadow-zinc-800/10"
      /> */}

      <div className="fixed bg-zinc-300 w-full h-56 bottom-0 left-0 hidden"></div>
    </div>
  );
}
