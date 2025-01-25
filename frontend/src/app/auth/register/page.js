'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
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

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(String(email).toLowerCase())
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const fieldErrors = {}
      if (!formData.username){
        fieldErrors.username = '* Username is required'
      }
      if (!formData.email) {
        fieldErrors.email = '* Email is required'
      } else if (!validateEmail(formData.email)) {
        fieldErrors.email = '* Invalid email format'
      }
      if (!formData.password) {
        fieldErrors.password = '* Password is required'
      } /*else if (formData.password.length < 6) {
        fieldErrors.password = 'Password must be at least 6 characters'
      }*/

      if (Object.keys(fieldErrors).length > 0) {
        setErrors(fieldErrors)
        return
      }

      const res = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed')
      }

      router.push('/auth/login')
    } catch (err) {
      setErrors({ general: err.message })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
      {errors.general && <div className="text-red-500">{errors.general}</div>}
        {/* Add design/styling here */}
        <form onSubmit={handleSubmit} className="space-y-6 relative">
          
          <div className="relative">
            {errors.username && <div className="text-red-500 absolute -top-5 left-0 text-sm">{errors.username}</div>}
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="relative">
            {errors.email && <div className="text-red-500 absolute -top-5 left-0 text-sm">{errors.email}</div>}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="relative">
            {errors.password && <div className="text-red-500 absolute -top-5 left-0 text-sm">{errors.password}</div>}
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
            Register
          </button>
        </form>
      </div>
    </div>
  )
}
