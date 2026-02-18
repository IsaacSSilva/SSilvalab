"use client"

import ScrambleSequence from "@/components/Scramblesequence"

const sequence = {
  "Hi": 1500,
  "My name is Isaac": 1000,
  "I am a developer": 1500,
  "Developer Full Stack": 1500,
  "this is my portfolio": 2500,
  "have a good time": 1000,
  "S. Silva": 1000 * 60 * 2.5,
};

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="h-96 w-3xl rounded-4xl bg-zinc-950 text-white p-11
        flex flex-col justify-between
      "
      >
        <div className="flex flex-col gap-2.5">
          <h1 className="h-[36px]">
            <ScrambleSequence 
              sequence={sequence} 
              loop={true}
              initialDelay={1}
              growEffect={true}
 
              className="text-4xl font-[600]"
            />
          </h1>

          {/* <p className="font-mono font-[100] text-md text-white/60 w-lg">
            In my portfolio, you can use any of my projects. You can list them using: 
            <span className="text-zinc-950 bg-amber-50/60 px-2.5 rounded text-xs mx-1">ls</span>. Then type the name of the project and run: <span className="text-zinc-950 bg-amber-50/60 px-2.5 rounded text-xs mx-1">shear run</span>.
          </p> */}
          <ScrambleSequence
    sequence={{ "TECNOLOGIA": 2000, "INOVAÇÃO": 2000 }}
    growEffect={true}
    loop={true}
              initialDelay={1}

    />
    <ScrambleSequence
  discoveryText="Seu texto longo aqui será revelado palavra por palavra"
  growEffect={true}
  pauseBetweenWords={300}
maxTotalDuration={8000}    
 
              initialDelay={100}

/>
        </div>
        
        

        <div className="font-mono flex flex-col gap-2.5">
          <div className="flex justify-between uppercase text-sm">
            <span>terminal</span>
            <span>not running</span>
          </div>
          <div className="flex gap-1.5 justify-center items-center">

            <input
              type="text"
              name="cmd"
              id="cmd"
              placeholder="terminal"
              className="w-full h-12 border border-zinc-700/50 p-2.5 rounded-md
          outline-none"
            />
          </div>
        </div>

        <div className="font-mono text-lg"></div>
      </div>
    </div>
  );
}
