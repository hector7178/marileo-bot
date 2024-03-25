'use client'

import React,{useState} from 'react'

function Pago(props) {

  const [dataLista, setDatalista]=useState(props.data)
  const [activacion, setActivacion]=useState(props.activacion)
  const [error, setError]=useState()
  const [alert,setAlert]=useState(false)

  const handleSubmit = async (e)=>{
    e.preventDefault();
   
    if(dataLista){

       try {
        await fetch('http://15.228.147.124:5000/actualizar/respuestas', {
            method: "POST", 
             headers: {
               "Content-Type": "application/json",
             },
             body: JSON.stringify({
                 respuesta:'revendedores',
                 datos:dataLista,
                 activacion:activacion
             }), //
           });
           setAlert(true)
       } catch (error) {
        console.log('error', error)
       }
       }else{
        setError('error')
       }   
    }


  const handle=(e)=>{

    const value= e.target.value;
    const name= e.target.name;
    setDatalista((prev)=>prev = value)
  
  }


  return (
    <section className='overflow-hidden overflow-y-auto flex flex flex-col bg-white  h-full w-full '>
    { alert?<div className='absolute w-[50%] h-[30%] bg-gray-300 left-[25%] rounded-md shadow-lg flex flex-col p-6 justify-between'>
      <span className='text-sm md:text-md lg:text-lg  text-black '>Actualizado con exito!! </span>
      <button className='w-fit h-fit p-2 bg-blue-600 rounded-md' onClick={()=>setAlert(false)}> cerrar</button>
      </div>
      :null
    }
    <span className='text-md md:text-lg lg:text-2xl text-black'>Revendedores</span>
    <form className='grid grid-cols-1 lg:grid-cols-2 items-center justify-center h-full w-full gap-2  p-4'>
     <div className='lg:col-span-2 col-span-1 w-3/4 h-fit flex flex-col'>
      <label className='text-gray-600 text-lg'>Palabra de activacion:</label>
      <input
       type='text' 
       className='text-black text-sm md:text-md lg:text-lg border-gray-200 border-2'
       onChange={(e)=>setActivacion(e.target.value)}
       defaultValue={props.activacion}></input>
     </div>
     <div className='flex flex-col lg:col-span-2 col-span-1'>
      <label className='text-gray-500 text-md'>Respuesta:</label>

      <textarea 
      onChange={handle}
      className='h-[30vh] text-sm md:text-md text-black border-2 border-gray-200 rounded-lg' defaultValue={props.data}></textarea>
     </div>
    <button type='submit' className='w-full h-fit text-sm md:text-md lg:text-lg rounded-md text-white p-2 bg-blue-600 lg:col-span-2 hover:opacity-70' onClick={handleSubmit}> Actualizar lista </button>
    </form>
    

    </section>
  )
}

export default Pago
