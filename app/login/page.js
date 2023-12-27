'use client'

import {  useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'


export default function Login(prop) {
  const route= useRouter()
  const [error , setError]=useState()

  
  const handleSubmit= async (e)=>{
    e.preventDefault()

    const formData= new FormData(e.currentTarget)
    const res= await signIn("credentials",{
      usuario:formData.get('usuario'),
      contraseña:formData.get('contraseña'),
      redirect:false
    })
    console.log(res)
    if(res?.error){
       return setError(res.error)
    };

    if (res?.ok) {
      route.refresh()
      return route.push('/scan')
    };
    
  }

  return (
    <main className="bg-gradient-to-b from-blue-300 via-blue-600 to-black grid min-h-screen items-center justify-center grid h-screen w-full lg:p-4 ">
       
      <div className="flex flex-col gap-4  w-full h-1/2 lg:h-3/4 bg-white rounded-lg p-6 lg:p-10">
                
        <h4 className='text-xl md:text-2xl lg:text-4xl text-center text-gray-700'>Inicia sesión</h4>
        {error && <span className='text-red-500'>*{error }</span>}
            <form className='h-full bg-gray-100 lg:p-10 flex flex-col gap-6' onSubmit={handleSubmit}>

              
              <div className='flex flex-col gap-2 p-2 lg:p-0'>
                <label className='text-gray-700 text-md md:text-lg'>Usuario</label>
                <input className='text-gray-700 text-md md:text-lg' placeholder='usuario' name='usuario'></input>
              </div>
            <div className='flex flex-col gap-2 p-2 lg:p-0'>
              <label className='text-gray-700 text-md md:text-lg'>Contraseña</label>
              <input className='text-gray-700 text-md md:text-lg' placeholder='...' name='contraseña'></input>
            </div>
            <button type='submit' className='rounded-md text-white bg-blue-600 p-2 w-fit self-center'>Iniciar sesión</button>
            </form>
                    
      </div>
    </main>   
  )
}
