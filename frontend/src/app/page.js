'use client'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const handleLogin = () => {
    router.push('/auth/login')
  }

  const handleRegister = () => {
    router.push('/auth/register')
  }

  const handleGuest = () => {
    router.push('/workspace')
  }

  return (
    <html lang="en">
      <body>
        <title>Noteboard</title>
        <div className="w-full h-screen flex justify-center bg-[url('/backgroundBoard.jpg')] bg-cover bg-center opacity-85"
          style={{ backgroundColor: 'var(--bg-color)' }}>

          <div className=" w-fill absolute inset-x-0 h-24 top-12"
            style={{ backgroundColor: 'var(--secondary2-color)' }}>
          </div>

          <p className='absolute top-12 text-3xl'>
            -- Noteboard --
          </p>

          <h1 className='absolute top-20 text-6xl'>
            Welcome to your customizable Workspace!
          </h1>
          
          <div className="absolute flex flex-col space-y-4 w-1/4 inset-y-1/3">
            <button 
              className=" py-3 text-white rounded-lg shadow"
              onClick={handleLogin}
              style={{ backgroundColor: 'var(--secondary1-color)', fontSize: 24 }}
            >
              Login
            </button>
            <button 
              className=" py-3 text-white rounded-lg shadow"
              onClick={handleRegister}
              style={{ backgroundColor: 'var(--border-color)', fontSize: 24}}
            >
              Register
            </button>
            <button 
              className=" py-3 text-white rounded-lg shadow"
              onClick={handleGuest}
              style={{ backgroundColor: 'var(--secondary2-color)', fontSize: 24}}
            >
              Continue as Guest
            </button>
          </div>

        </div>
      </body>
    </html>
  )
}