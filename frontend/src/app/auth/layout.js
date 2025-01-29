'use client'
import { useRouter } from 'next/navigation'
import '../globals.css'
//import Navbar from '../../components/ui/Navbar'


const RootLayout = ({ children }) => {
  const router = useRouter()

  const handleBack = () => {
    router.push('/')
  }

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

          <div className="relative flex justify-center top-40">
            <button
              className="absolute w-1/4 top-20 text-white rounded-lg shadow z-50"
              onClick={handleBack}
              style={{ backgroundColor: 'var(--bg-color)', fontSize: 18 }}
            >
              Back
            </button>

          </div>

          <div className="absolute w-5/6 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
            {children}
          </div>



        </div>
      </body>
    </html>
  )
}

export default RootLayout

