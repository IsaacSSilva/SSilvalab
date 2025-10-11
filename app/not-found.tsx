import Image from 'next/image'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <div className='flex gap-5'>
        <div>
          <Image alt='' src={"/Face_Palm.png"} width={360} height={360} />
        </div>
        <div className='flex flex-col gap-3.5 justify-evenly'>
          <h2 className='text-8xl tracking-wide'>Ops...</h2>
          <p className='text-2xl tracking-wide'>Sinto muito, Caimos na <span className='bg-zinc-900 rounded-md text-zinc-50 dark:text-zinc-950
              dark:bg-zinc-50 px-1 py-0.5 font-bold font-mono'>Not Found</span></p>
          <p className='font-medium text-lg tracking-wider'>Não foi possível encontrar a pagina solicitada.</p>
          <Link href="/" 
          className='dark:bg-white dark:text-zinc-950 text-zinc-50 bg-zinc-950 w-fit px-4 py-1 rounded-full
            cursor-pointer dark:hover:bg-zinc-300 hover:bg-zinc-600 transition-colors duration-300
          '>Return Home</Link>
        </div>
       
      </div>
      
    </div>
  )
}