'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
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

      // Redirect to login page after successful registration
      router.push('/auth/login')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Add your register page design/styling here */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-500">{error}</div>}
          
          <div>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-2 border rounded"
              required
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
