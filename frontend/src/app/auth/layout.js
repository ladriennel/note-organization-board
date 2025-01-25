
import '../globals.css'
//import Navbar from '../../components/ui/Navbar'


export const metadata = {
  title: 'Noteboard app',
  description: 'Customizable note and workspace application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/*<Navbar />*/}
        <div className="relative w-full h-screen "
          style={{ backgroundColor: 'var(--bg-color)' }}>

          <div className="absolute inset-0 h-3/5 mt-36 bg-blue-500 z-10"
            style={{ backgroundColor: 'var(--border-color)' }}>
          </div>

          <div className="relative w-3/5 h-2/5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-lg z-20"
            style={{ backgroundColor: 'var(--secondary4-color)' }}>
          </div>

          <div className="absolute w-5/6 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}



