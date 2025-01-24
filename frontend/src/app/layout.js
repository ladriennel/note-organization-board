
import "./globals.css";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}

/*import { Kirang_Haerang } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/ui/Navbar'

const kirang = Kirang_Haerang({ subsets: ['latin'] })

export const metadata = {
  title: 'Noteboard app',
  description: 'Customizable note and workspace application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="container mx-auto px-4">
          <h1 className={kirang.className}>Welcome to Noteboard!</h1>
          {children}
        </div>
      </body>
    </html>
  )
}
*/