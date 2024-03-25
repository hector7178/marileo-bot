'use client'
import { useEffect, useRef, useState } from "react"

export default function Page(params) {
    const [ErrorNum,setErrorNum]=useState()
 
    const [msj, setMsj]=useState('')
    const [num, setNum]=useState('')
    const [show, setShow]=useState(false)
    const [chatSelected, setChatSelected]=useState('default')
    const [mensajesChat,setMensajechat]=useState()


    
    useEffect(()=>{
        setInterval(() => { 
            try {
                
                const nombre = async ()=> {
                const url = `http://15.228.147.124:5000/chatlist`
                let respuesta = await fetch (url)
                let response = await respuesta?.json();
                return response;        
                }
            
                nombre().then( (e)=>{
        
                    const data = JSON.parse(e);
                    
                    setMensajechat(data)
                })
        
        
            } catch (error) {
                console.log(error)
            }
            
        },500)
     },[])  

   
    const chat=useRef()
    const focus=useRef()
    const inputText=useRef()

    const clickSubmit=async (e)=>{
        if(e.key==='Enter'){
            let tlf= num.toString();
       
        

        
        if(num && tlf.length >= 11 && msj !=='' && msj){

           try {
            await fetch('http://18.230.95.57:5000/sendmessage', {
                method: "POST", 
                 headers: {
                   "Content-Type": "application/json",
                 },
                 body: JSON.stringify({
                     mensaje:msj,
                     number:tlf
                 }), //
               });

            setChatSelected(tlf +"@s.whatsapp.net")
              
            focus.current.scrollIntoView({ block: "start", behavior: "smooth" });
              
            inputText.current.value='';
            setMsj('');
           } catch (error) {
            console.log('error', error)
           }
           }else{
            setErrorNum('Debes ingresar un mensaje y un numero valido, incluyendo el codigo del pais. ejemplo...584125862586 ')
           }
  
        }
        
    }

    useEffect(()=>{
        document.addEventListener("keydown", clickSubmit, false);
    
        return () => {
          document.removeEventListener("keydown", clickSubmit, false);
        };
    },[msj])

    

    const handleSubmit = async (e)=>{
        e.preventDefault();
        let tlf= num.toString();
       
        if(num && tlf.length >= 11 && msj !=='' && msj){

           try {
            await fetch('http://18.230.95.57:5000/sendmessage', {
                method: "POST", 
                 headers: {
                   "Content-Type": "application/json",
                 },
                 body: JSON.stringify({
                     mensaje:msj,
                     number:tlf
                 }), //
               });

            setChatSelected(tlf +"@s.whatsapp.net")
              
            focus.current.scrollIntoView({ block: "start", behavior: "smooth" });
              
            inputText.current.value='';
            setMsj('');
           } catch (error) {
            console.log('error', error)
           }
           }else{
            setErrorNum('Debes ingresar un mensaje y un numero valido, incluyendo el codigo del pais. ejemplo...584125862586 ')
           }   
    }

   

   
    
    

    return (  
    <main className={`bg-gradient-to-b from-blue-300 via-blue-600 to-black grid min-h-screen ${ show ? 'lg:grid-cols-3 items-center ':' justify-center content-center'} h-screen   gap-4`}>
    
    {show?
    <div className="col-span-1 bg-white h-full w-3/4 lg:w-full rounded-lg p-2 lg:p-6 flex flex-col absolute lg:relative  z-20 ">
        <span className="absolute top-2 right-2 text-gray-300 hover:text-red-400 w-8 h-8" onClick={()=>setShow(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width:'100%',height:'100%'}} >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </span>
            <div className="bg-white p-2 rounded-md flex flex-col gap-2">
                <button 
                onClick={()=>setChatSelected('default')}
                className="text-white text-lg w-fit h-fit p-2 rounded-md bg-blue-600 hover:scale-105">Enviar nuevo mensaje</button>
                <div>
                    <span className="text-black">Ingresar numero de teléfono</span>
                </div>
                <input name="telNo" type="tel"  className='border-blue-200 rounded-md border-2 text-black' onChange={(e)=>setNum(e.target.value)}/>
            </div>
        <div className="bg-gray-300 w-full h-full p-4 flex flex-col gap-4">
            


           <span>Chat activos</span> 

           <div className="overflow-y-auto h-[60vh] p-2 gap-2 flex flex-col">
           {mensajesChat?
           mensajesChat?.map((e,index)=>{
            return(<div key={index} id={e.id_chat} className="bg-white p-2 rounded-md flex flex-col gap-2 hover:bg-gray-100" onClick={()=>{
                setChatSelected(e.id_chat );
                setNum(e?.id_chat?.slice(0,-15));
                }
                }>
                <h2 className="text-black text-lg"> Chat</h2>
                <div>
                    <span className="text-black">{e.id_chat}</span>
                </div>
            </div>)})
            :
            <span>No hay mensajes aún</span>}
            </div>
        </div>
    </div>:
    <button className=" absolute top-2 left-4 h-10 w-10 text-white z-20" onClick={()=>setShow((e)=>!e)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
    </button>
  }

    <div className={`${show?'w-full h-3/4':' h-[80vh] w-[90vw] lg:h-[70vh] lg:w-[65vw]'}  md:col-span-2 bg-white  rounded-lg p-2 md:p-6 grid grid-rows-4 gap-2 md:gap-4`}>
        
        {ErrorNum && 
            <div className="absolute left-1/3 lg:w-1/3 w-3/4 lg:h-1/3 h-1/4 bg-white rounded-lg shadow-lg shadow-black p-8 flex flex-col justify-between">
            <span className="text-black">{ErrorNum}</span>
            <div className="flex flex-row justify-end gap-4">
                <button className='bg-gray-500 hover:scale-105 font-bold rounded-md h-fit w-fit p-2' onClick={()=>setErrorNum()}>
                    Cancelar
                </button>
                <button className='bg-blue-500 hover:scale-105 font-bold rounded-md h-fit w-fit p-2' onClick={()=>{
                setErrorNum()
                setShow(true)
                }}>
                    Agregar numero
                </button>
            </div>
            </div>}
        <div ref={chat} className="bg-gray-300 rounded-md p-6 row-span-3 h-[55vh] md:h-[50vh] gap-2 flex flex-col overflow-y-auto">
            {mensajesChat?
            mensajesChat?.find((e)=> e.id_chat===chatSelected)?.mensajes?.map( (ev, index)=>  {
      
            return (
           ev.user ==='admin' || ev.user === '584128220099'? 
            <div key={index} className="relative flex flex-col self-end text-white mt-4 h-fit w-3/4 lg:w-1/2 bg-blue-600  rounded-lg p-4 " >
              
                    <span className="text-blue-200 text-end absolute top-0 right-2">{ev.user}</span>
                    <p disabled className="text-white max-w-3/4 break-words h-fit">{ev.mensaje}</p>
            </div>
            :
            <div key={index} className=" relative flex flex-col justify-self-start text-white h-fit w-3/4 lg:w-1/2 bg-white rounded-lg p-4" >
              
            <span className="text-gray-600 absolute top-0 left-2">{ev.user}</span>
              <p className="text-black text-end max-w-3/4 break-words h-fit ">{ev.mensaje}</p>
            </div>)})
            :
            <span>Cargando...</span>}

            <div ref={focus} id='focus' className="h-6 w-4 text-gray-300 p-4 "> .</div>
        </div>
        <div className="bg-gray-300 rounded-md p-4 grid row-span-1 grid-cols-5 gap-2 items-center"> 
            <textarea ref={inputText} type='text' onChange={(e)=>setMsj(e.target.value)}  className="w-full h-full col-span-4 text-black rounded-md resize-none"/>
            <button onClick={handleSubmit} className="hover:scale-105 text-white font-bold w-fit h-fit bg-blue-500 text-center p-2 justify-between col-span-1 rounded-md flex flex-row"> 
                Enviar
               
            </button> 
        </div>
        

    </div>

    </main>
    )
}


