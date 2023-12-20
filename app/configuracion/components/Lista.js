'use client'

import React,{useState} from 'react'

function Lista(props) {

  const [dataLista, setDatalista]=useState(props.data)
  const [activacion, setActivacion]=useState(props.activacion)
  const [error, setError]=useState()
  const [alert,setAlert]=useState(false)

  const handleSubmit = async (e)=>{
    e.preventDefault();
   
    if(dataLista){

       try {
        await fetch('http://18.230.95.57/actualizar/respuestas', {
            method: "POST", 
             headers: {
               "Content-Type": "application/json",
             },
             body: JSON.stringify({
                 respuesta:'lista',
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

    const selected= e.target.getAttribute("dat");
    const value= e.target.value;
    const name= e.target.name;

   
   const newData=dataLista?.map((dat,index)=>{
   
    if(selected===index.toString()){
      const res= name==='precio'? {...dat,[name]:Number(value)}:{...dat,[name]:value}
      return res
    }
    return dat
   })

    
    setDatalista((prev)=>prev=newData)
  }


  return (
    <section className='overflow-hidden overflow-y-auto flex flex flex-col bg-white  h-full w-full '>
    { alert?<div className='absolute w-[50%] h-[30%] bg-gray-300 left-[25%] rounded-md shadow-lg flex flex-col p-6 justify-between'>
      <span className='text-lg  text-black '>Actualizado con exito!! </span>
      <button className='w-fit h-fit p-2 bg-blue-600 rounded-md' onClick={()=>setAlert(false)}> cerrar</button>
      </div>
      :null
    }
    <span className='text-2xl text-black'>Servicios</span>
    <form className='grid grid-cols-1 lg:grid-cols-2 items-center justify-center h-full w-full gap-2  p-4'>
     <div className='lg:col-span-2 col-span-1 w-3/4 h-fit flex flex-col'>
      <label className='text-gray-600 text-lg'>Palabra de activacion:</label>
      <input
       type='text' 
       className='text-black text-lg border-gray-200 border-2'
       onChange={(e)=>setActivacion(e.target.value)}
       defaultValue={props.activacion}></input>
     </div>
     <span className='text-lg text-black lg:col-span-2 col-span-1'>Lista</span>
      {props?.data?.map((e,index)=>{
        return <div key={index} className='border-2 border-grey-500 bg-gray-100 rounded-md w-full h-[30vh] grid grid-rows-7 gap-2 p-2 px-4 overflow-y-auto'> 
          <div className='row-span-2 w-full h-full flex flex-col'>
          <label className='text-gray-600 text-md'>Nombre del servicio:</label>
          <input  className='text-black' type='text' name='servicio'  dat={index} onChange={handle} defaultValue={e.servicio}/>
          </div>
          <div className='row-span-2 w-full h-full flex flex-col'>
          <label className='text-gray-600 text-md'>Precio del servicio:</label>
          <input className='text-black'  type='number' name='precio' dat={index} onChange={handle} defaultValue={e.precio}/>
          </div>
          <div className='row-span-3 w-full h-full flex flex-col'>
          <label className='text-gray-600 text-md'>Texto mensaje respuesta:</label>
          <textarea  className='text-black' type='text' name='texto' dat={index} onChange={handle} defaultValue={e.texto}/>
          </div>
         </div>
      })}
      <button type='submit' className='w-full h-fit text-lg rounded-md text-white p-2 bg-blue-600 lg:col-span-2 hover:opacity-70' onClick={handleSubmit}> Actualizar lista </button>
    </form>
    

    </section>
  )
}

export default Lista