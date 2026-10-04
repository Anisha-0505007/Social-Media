import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { axiosInstance } from '../axioscalls/axios'
import { getApiErrorMessages } from '../axioscalls/getApiErrorMessages.js'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loader, setLoader] = useState(false)
  const [errors, setErrors] = useState([])
  const { setUser } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors([])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoader(true)
    setErrors([])

    try {
      const res = await axiosInstance.post('/users/login', form)
      setUser(res.data.userData)
      navigate('/home', { replace: true })
    } catch (error) {
      setErrors(getApiErrorMessages(error, 'Unable to log in. Please try again.'))
    } finally {
      setLoader(false)
    }
  }

  return (
    <main className="auth-page auth-page--login">
      <div className="auth-intro">
        <Link to="/" className="auth-wordmark" aria-label="SST Social home">S<span>.</span></Link>
        <p className="auth-kicker">A little more connected</p>
        <h1>Log in to your account</h1>
        <p className="auth-description">Your people are just a moment away.</p>
      </div>

      <div className="auth-content">
        <div className="auth-card">
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="email">Email address</label>
              <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="alex@example.com" required autoComplete="email" />
            </div>

            <div className="auth-field">
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Enter your password" required autoComplete="current-password" />
            </div>

            {errors.length > 0 && (
              <ul className="auth-error" role="alert">
                {errors.map((message) => <li key={message}>{message}</li>)}
              </ul>
            )}

            <button type="submit" disabled={loader} className="auth-submit">
              {loader ? 'Logging in...' : 'Log in'}
              <span aria-hidden="true">↗</span>
            </button>
          </form>

          <p className="auth-legal">By signing up, you agree to our <a href="#terms">Terms</a> and <a href="#privacy">Privacy Policy</a>.</p>
        </div>

        <p className="auth-switch">
          Don&apos;t have an account?{' '}
          <Link to="/signup">Create one</Link>
        </p>
      </div>
    </main>
  )
}

export default Login