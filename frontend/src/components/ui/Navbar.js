'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const [user, setUser] = useState(null)
  const [currentPath, setCurrentPath] = useState('/')
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('userData')
    if (userData) {
      setUser(JSON.parse(userData))
    }
    setCurrentPath(window.location.pathname)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('userData')
    /*fetch('http://localhost:5001/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    }).then(() => {
      window.location.href = '/'
    }).catch(err => {
      console.error('Logout failed', err)
    })*/
    router.push('/')
  }

  const NavLink = ({ href, children }) => (
    <a 
      href={href} 
      className="text-white hover:text-gray-300"
      onClick={(e) => {
        e.preventDefault()
        router.push(href)
      }}
    >
      {children}
    </a>
  )

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink href="/">
          <span className="text-white text-xl font-bold">My App</span>
        </NavLink>
        <div className="space-x-4">
          {!user ? (
            <>
              <NavLink href="/auth/login">Login</NavLink>
              <NavLink href="/auth/register">Register</NavLink>
            </>
          ) : (
            <>
              <span className="text-white mr-4">
                Welcome, {user.username}
              </span>
              <button 
                onClick={handleLogout}
                className="text-white hover:text-gray-300"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

