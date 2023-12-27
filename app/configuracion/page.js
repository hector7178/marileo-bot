'use client'
import React, { useEffect, useState } from 'react'
import Lista from "./components/Lista"
import Ofertas from "./components/Ofertas"
import Pago from "./components/Pago"
import Revendedores from "./components/Revendedores"
import Saludo from "./components/Saludo"
import Soporte from "./components/Soporte"

function page() {
  const [data, setData]=useState();
  const [key, setKay]=useState();
  const [dataSelected, setDataSelected]=useState('saludo');
  const [show, setShow]=useState(false)
  const [act, setAct]=useState()

  useEffect(()=>{
    try {
                
      const nombre = async ()=> {
      const url = `http://18.230.95.57:5000/respuestas`
      let respuesta = await fetch (url)
      let response = await respuesta?.json();
      return response;        
      }
  
      nombre().then( (e)=>{

          const data = JSON.parse(e);
          setAct(data.activacion)
          setKay(Object.keys(data.respuestas)?.filter((key) => key !== '_id' && key !== 'text' && key !== '__v'&& key !== 'updatedAt'))
          setData(data.respuestas)
      })


  } catch (error) {
      console.log(error)
  }

  },[])

  return (
    <main className={` relative bg-gradient-to-b from-blue-300 via-blue-600 to-black min-h-screen h-screen  w-screen gap-4`}>
   { show?
    <section className={`absolute bg-white h-full w-2/3 md:w-1/3 p-6 z-20 relative`}>
      <span 
      onClick={()=>setShow(false)}
      className='absolute right-2 w-fit h-fit p-2 '>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-500 hover:text-red-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </span>
      
      <ul className='h-full w-full py-8 md:p-4 p-2 gap-4 flex flex-col'>
        {!key?
        <span className='text-black'>Cargando...</span>
        :
        key?.map((e, index)=>{

          const firstLetter= e.slice(0,1);
          const rest=e.slice(1,e.length);
          const strg=firstLetter?.toUpperCase() + rest;
          return <li 
          key={index} 
          className={`cursor-pointer border-l-2  sm:text:sm md:text-md lg:text-lg w-full h-fit p-2 ${dataSelected===e? 'border-blue-600 text-blue-600 indent-6':'border-neutral-500 indent-2 text-black'}`}
          onClick={()=>setDataSelected(e)}
          >{strg}</li>
        })}
      </ul>

    </section>
    :
    <div 
    className='absolute left-0 bg-white shadow-lg w-[40%] md:w-[35%] h-full z-20 relative'
    onClick={()=>setShow(true)}
    style={{clipPath:'polygon(0 0, 18% 32%, 18% 68%, 0% 100%)'}}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute top-[50%] left-[5%] text-blue-600 w-6 h-6 md:w-10 md:h-10 lg:w-12 lg:h-12">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
      </svg>

    </div>
    }
    <section className={`absolute h-[80%] top-[10%] w-full md:w-2/3 ${show? 'right-[16.5%] md:right-0':'md:right-[16.5%] right-0 p-10'}  pt-16 lg:pt-10 md:p-14`}>
      <div className='w-full h-full  bg-white rounded-lg p-2 md:p-6'>
        {
          data?
          dataSelected==="saludo"?
          <Saludo  data={data["saludo"]}  activacion={act["saludo"]} />:
          dataSelected==="ofertas"?
          <Ofertas  data={data["ofertas"]} activacion={act["ofertas"]} />:
          dataSelected==="lista"?
          <Lista  data={data["lista"]} activacion={act["lista"]} />:
          dataSelected==="soporte"?
          <Soporte  data={data["soporte"]} activacion={act["soporte"]} />:
          dataSelected==="pago"?
          <Pago  data={data["pago"]} activacion={act["pago"]} />:
          dataSelected==="revendedores"?
          <Revendedores  data={data["revendedores"]} activacion={act["revendedores"]} />:
          <span className='text-black'>No seleccionado</span>
          :
          <span className='text-black'>Cargando...</span>

        }
      </div>
    </section>
    
    </main>
  )
}

export default page