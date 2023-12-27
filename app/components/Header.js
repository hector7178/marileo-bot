'use client'
import React, { useState } from 'react'
import { useRouter,usePathname } from 'next/navigation'
import Link from 'next/link'
function Header() {
    const href={
        inicio:'/',
        scan:'/scan',
        menssage:'/message',
        configuracion:'/configuracion'
      }
    const router=usePathname()

    const [open, setOpen]=useState(false)


  return (
    <header className='h-[10vh] w-screen fixed z-10 bg-blue-300 md:bg-transparent items-center flex px-6  md:px-20 py-4 '>
    <ul className='hidden md:flex flex-row gap-4 w-full lg:gap-8 justify-end '>
     
      <li><Link href={'/'} className={router===href.inicio?' sm:text-sm md:text-md lg:text-lg hover:opacity-90 text-white border-b-2 border-white':'sm:text-sm  md:text-md lg:text-lg hover:opacity-90 text-white'} >Inicio</Link></li>
      <li><Link href={'/scan'} className={router===href.scan?' sm:text-sm md:text-md lg:text-lg hover:opacity-90 text-white border-b-2 border-white':'sm:text-sm md:text-md lg:text-lg hover:opacity-90 text-white'}>Escanear</Link></li>
      <li><Link href={'/message'} className={router===href.menssage?' sm:text-sm md:text-md lg:text-lg hover:opacity-90 text-white border-b-2 border-white':'sm:text-sm  md:text-md lg:text-lg hover:opacity-90 text-white'}>Mensajes</Link></li>
      <li><Link href={'/configuracion'} className={router===href.configuracion?' sm:text-sm md:text-md lg:text-lg hover:opacity-90 text-white border-b-2 border-white':'sm:text-sm  md:text-md lg:text-lg hover:opacity-90 text-white'}>Configuración</Link></li>
    </ul>
    {!open
      ?
     <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>setOpen(true)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className='w-8 h-8 absolute top-6 right-6 md:hidden text-white'>
     <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
     </svg>
     :
    <ul className='flex md:hidden flex-col bg-blue-300 gap-4 w-1/2 lg:gap-8 absolute top-6 right-0 p-6 items-end justify-end'>
       <li className="text-white hover:text-red-400 w-8 h-8" onClick={()=>setOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width:'100%',height:'100%'}} >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
      </li>
      <li><Link href={'/'} className={router===href.inicio?' sm:text-sm md:text-md lg:text-lg hover:opacity-90 text-white border-b-2 border-white':'sm:text-sm  md:text-md lg:text-lg hover:opacity-90 text-white'} >Inicio</Link></li>
      <li><Link href={'/scan'} className={router===href.scan?' sm:text-sm md:text-md lg:text-lg hover:opacity-90 text-white border-b-2 border-white':'sm:text-sm md:text-md lg:text-lg hover:opacity-90 text-white'}>Escanear</Link></li>
      <li><Link href={'/message'} className={router===href.menssage?' sm:text-sm md:text-md lg:text-lg hover:opacity-90 text-white border-b-2 border-white':'sm:text-sm  md:text-md lg:text-lg hover:opacity-90 text-white'}>Mensajes</Link></li>
      <li><Link href={'/configuracion'} className={router===href.configuracion?' sm:text-sm md:text-md lg:text-lg hover:opacity-90 text-white border-b-2 border-white':'sm:text-sm  md:text-md lg:text-lg hover:opacity-90 text-white'}>Configuración</Link></li>
    </ul>}
  </header>
  )
}

export default Header