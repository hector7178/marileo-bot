'use client'

import Image from 'next/image'
import Link from 'next/link'


export default function Home() {
    
  return (
    <main className="bg-gradient-to-b from-blue-300 via-blue-600 to-black flex min-h-screen   p-4 lg:p-24">
    <div className='p-2 flex md:grid md:grid-cols-3 w-full items-center flex-col-reverse justify-center gap-4'>
        
        <div className='relative h-1/3 md:h-[50vh] w-full col-span-1 '>
          <Image src={'/bitmap.svg'} width={100} height={100} className=' h-full w-full ' alt='bot'></Image>
          <span className='rounded-lg  bg-sky-300 w-1/4  left-[37.5%] h-2  absolute top-[105%] animate-pulse '></span >
          <span className=' rounded-lg bg-sky-400 w-[18%] left-[41%] h-2 absolute top-[113%] animate-pulse '></span >
          <span className=' rounded-lg bg-sky-500 w-[11%] left-[44.5%] h-2 absolute top-[121%] animate-pulse '></span >
        </div>
        <div className='flex flex-col col-span-2 p-6 gap-4 relative  w-full sm:w-3/4 lg:w-full'>
          <span className=' text-white  font-mono font-bold before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-600 before:shadow-sm before:shadow-black '>
          </span>
          <span className=' text-white text-4xl lg:text-8xl font-mono font-bold before:block before:absolute before:-inset-2  before:bg-blue-500  before:shadow-md before:shadow-black'>
          <span className='text-white relative'>BOT MARILEO</span>
          </span>
          <Link className=' font-bold opacity-90 bg-sky-500 hover:bg-sky-900 transition duration-150 ease-in-out rounded-md text-white p-4 hover:scale-90 w-fit h-fit' href={'/scan'}>Escanea el Qr</Link>
        </div>
    </div>
    </main>
  )
}
