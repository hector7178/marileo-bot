import './globals.css'
import { Inter } from 'next/font/google'
import Provider from './lib/provider'
import Header from './components/Header'



const inter = Inter({ subsets: ['latin'] })



export const metadata = {
  title: 'Bot',
  description: 'Marileo bot',
}

export default function RootLayout({ children }) {
  
 
 

  return (
    <html lang="en">
      
      <body className={inter.className}>
        <Provider>
        <Header/>
        {children}
        </Provider>
      </body>
    </html>
  )
}
