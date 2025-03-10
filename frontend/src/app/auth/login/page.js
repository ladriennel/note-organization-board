'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const LoginPage = () => {
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
      if (!formData.identifier) {
        fieldErrors.identifier = '* Username or email is required'
      }
      if (!formData.password) {
        fieldErrors.password = '* Password is required'
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
        if (data.error === 'Invalid password or user') {
          fieldErrors.identifier = '* Incorrect login information or cannot find user'
        } else if (data.error === 'Could not login') {
          fieldErrors.identifier = '* Could not login'
        }
        setErrors(fieldErrors)
        return
      }

      //localStorage.setItem('token', data.token)
      //localStorage.setItem('userData', JSON.stringify(data.user))
      sessionStorage.removeItem('isGuest');
      router.push('/workspace')
    } catch (err) {
      setErrors({ general: err.message })
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center">
      <title>Login</title>
      <div className="w-full max-w-md relative">
        <h1 className="w-full text-5xl absolute -top-2/3 right-1/3 whitespace-nowrap">------------------ Login! ------------------</h1>
        {errors.general && <div className="text-red-500">{errors.general}</div>}
        {/* Add design/styling here */}
        <form onSubmit={handleSubmit} className="space-y-6 relative">
          <div className="relative">
            {errors.identifier && <div className="text-red-500 absolute -top-5 left-0 text-sm">{errors.identifier}</div>}
            <input
              type="text"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              placeholder="Email or Username"
              className="w-full p-2 border rounded placeholder-white"
              style={{ backgroundColor: 'var(--secondary1-color)' }}
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
              className="w-full p-2 border rounded placeholder-white"
              style={{ backgroundColor: 'var(--border-color)' }}
            />
          </div>

          <button
            type="submit"
            className="w-full text-white p-2 rounded"
            style={{ backgroundColor: 'var(--bg-color)', fontSize: 20 }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
export default LoginPage