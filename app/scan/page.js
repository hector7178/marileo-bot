'use client'
import Image from 'next/image';
import QR from '../components/QR'
import { useState, useEffect } from 'react';

export default function Page(params) {
 const [imgQr, setImg]=useState();
 const [user, setUser]=useState();
 useEffect(()=>{
    setInterval(() => { 
        try {
            
            const nombre = async ()=> {
            const url = `http://18.230.95.57/`
            let respuesta = await fetch (url,  {
                method: "GET",
                mode: "no-cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "omit", // include, *same-origin, omit
                headers: {
                  "Content-Type": "application/json",
                },
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
               })
            let response = await respuesta?.json();
            return response;        
            }
        
            nombre().then( (e)=>{
                 console.log(e)
                 setImg(e.image)
                 setUser(e.user)
            }).catch((error)=>console.log(error))
    
    
        } catch (error) {
            console.log(error)
        }
        
    },5000)
 },[])   
 
    console.log('qlq',imgQr , user)
    return (  
    <main className="bg-gradient-to-b from-blue-300 via-blue-600 to-black flex min-h-screen justify-center grid h-screen  p-4 lg:p-24">
       
       <div className='w-[50vw] h-full bg-white rounded-xl grid grid-rows-3 content-center shadow-lg shadow-black'>
        <div className='row-span-2 grid justify-center items-center w-full'>
        {

        <QR Qr={user && user !== 'sesion no iniciada'?'logued':imgQr?`data:image/png;base64,${imgQr}`:undefined}/>
       
        }
        </div>
        <div className='row-span-1  p-6'>
            <div className='bg-gray-200 rounded-md w-full h-full grid justify-center items-center'>
                {!user?
               
                <span className='animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full'></span>
                :
                
                user !== 'sesion no iniciada'? 
                <div className='flex flex-row gap-4'>
                <span className='text-blue-400'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </span>
                <diV>
                    <h3 className='text-black'>{user?.id}</h3>
                    <h3 className='text-black'>{user?.name}</h3>
                </diV>
                
                </div>
                :
                <div className='flex flex-row gap-4'>
                <span className='text-red-400'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </span>
                <h3 className='text-black'>{user}</h3>
                
                </div>
                
                
                }
                
            </div>

        </div>
       </div>
       
    </main>
    )
}


