'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const router = useRouter()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      
      const fieldErrors = {}
      if(!formData.identifier){
        fieldErrors.identifier = 'Username or email is required'
      }
      if(!formData.password){
        fieldErrors.password = 'Password is required'
      }
      if (Object.keys(fieldErrors).length > 0) {
        setErrors(fieldErrors)
        return
      }

      const res = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Login failed')
      }

      //localStorage.setItem('token', data.token)
      //localStorage.setItem('userData', JSON.stringify(data.user))
      
      router.push('/workspace')
    } catch (err) {
      setErrors({ general: err.message })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
      {errors.general && <div className="text-red-500">{errors.general}</div>}
        {/* Add design/styling here */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.identifier && <div className="text-red-500">{errors.identifier}</div>}
          <div>
            <input
              type="text"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              placeholder="Email or Username"
              className="w-full p-2 border rounded"
            />
          </div>

          {errors.password && <div className="text-red-500">{errors.password}</div>}
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-2 border rounded"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}