'use client'
import React from 'react'
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

  return (
    <header className='h-[10vh] w-screen fixed z-10 bg-blue-300 md:bg-transparent items-center flex px-6  md:px-20 py-4 '>
    <ul className='flex flex-row gap-4 w-full lg:gap-8 justify-end'>
      <li><Link href={'/'} className={router===href.inicio?' sm:text-sm md:text-md md:text-lg hover:opacity-90 text-white border-b-2 border-white':' text-md md:text-lg hover:opacity-90 text-white'} >Inicio</Link></li>
      <li><Link href={'/scan'} className={router===href.scan?' sm:text-sm md:text-md md:text-lg hover:opacity-90 text-white border-b-2 border-white':' text-md md:text-lg hover:opacity-90 text-white'}>Escanear</Link></li>
      <li><Link href={'/message'} className={router===href.menssage?' sm:text-sm md:text-md md:text-lg hover:opacity-90 text-white border-b-2 border-white':' text-md md:text-lg hover:opacity-90 text-white'}>Mensajes</Link></li>
      <li><Link href={'/configuracion'} className={router===href.configuracion?' sm:text-sm md:text-md md:text-lg hover:opacity-90 text-white border-b-2 border-white':' text-md md:text-lg hover:opacity-90 text-white'}>Configuracion</Link></li>
    </ul>
  </header>
  )
}

export default Header