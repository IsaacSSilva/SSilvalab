import { AudioWaveform, ChevronsLeftRightEllipsis, Computer } from "lucide-react";
import DatalistInput from "@/components/datalistInput";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center ">
      <main className="max-w-7xl w-full h-screen flex items-center">
        <div>
          <div>
            <h1 className="tracking-wide text-8xl font-bold">Isaac S.Silva</h1>
            <p className="tracking-wider font-light text-2xl ">
              <span
                className="text-transparent bg-gradient-to-bl bg-clip-text bg-radial-at-tl 
              from-orange-800 via-fuchsia-900 to-indigo-700 tracking-[3px]"
              >
                FullStack
              </span>{" "}
              Developer, focused on <span className="font-normal">BackEnd</span>
            </p>
          </div>
          <div className="py-10">
            <DatalistInput className="focus:outline-none focus:ring-0" />
            <span className="font-extralight text-[11px] font-mono mx-2.5">
              digite <span className="bg-zinc-900 rounded-md">`/`</span> para os
              repo`s
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
