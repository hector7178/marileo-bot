import Image from "next/image"

const QR =  (props) => {
    console.log('prop',props)
    return(
    <div className="w-full h-full row-span-2 grid justify-center items-center">
            {props?.Qr === 'logued' ? 
            
            <div>
                <span className="text-black text-xl">Sesión iniciada</span>
                <span className='text-blue-400 w-12 h-12'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </span>
            </div>
            :
            props?.Qr !== undefined?
            <Image 
            src={ props.Qr} 
            height={100} 
            width={100} 
            className='w-full' 
            alt='Qr imagen'>
            </Image>
            :

            <div 
            className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" 
            role="status" 
            aria-label="loading">
            <span className="sr-only">Loading...</span>
            </div>}
    </div>)
}
export default QR