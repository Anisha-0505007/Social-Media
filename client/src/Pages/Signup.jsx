import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { axiosInstance } from '../axioscalls/axios.js'
import { getApiErrorMessages } from '../axioscalls/getApiErrorMessages.js'

function Signup() {
    const [form, setForm] = useState({ name: '', username: '', email: '', password: '' })
    const [loader, setLoader] = useState(false)
    const [errors, setErrors] = useState([])
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
            await axiosInstance.post('/users/register', form)
            navigate('/login', { replace: true })
        } catch (error) {
            setErrors(getApiErrorMessages(error, 'Unable to create your account. Please try again.'))
        } finally {
            setLoader(false)
        }
    }

    return (
        <main className="auth-page auth-page--signup">
            <div className="auth-intro">
                <Link to="/" className="auth-wordmark" aria-label="SST Social home">S<span>.</span></Link>
                <p className="auth-kicker">Good things start here</p>
                <h1>Make room for your people.</h1>
                <p className="auth-description">Create an account and share the little moments.</p>
            </div>

            <div className="auth-content">
                <div className="auth-card">
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="auth-field">
                            <label htmlFor="name">Name</label>
                            <input id="name" name="name" type="text" value={form.name} placeholder="Alex Morgan" required onChange={handleChange} autoComplete="name" />
                        </div>

                        <div className="auth-field">
                            <label htmlFor="username">Username</label>
                            <input id="username" name="username" type="text" value={form.username} placeholder="alexmorgan" required onChange={handleChange} autoComplete="username" />
                        </div>

                        <div className="auth-field">
                            <label htmlFor="email">Email address</label>
                            <input id="email" name="email" type="email" value={form.email} placeholder="alex@example.com" required onChange={handleChange} autoComplete="email" />
                        </div>

                        <div className="auth-field">
                            <label htmlFor="password">Password</label>
                            <input id="password" name="password" type="password" value={form.password} placeholder="Create a password" required onChange={handleChange} autoComplete="new-password" />
                        </div>

                        {errors.length > 0 && (
                            <ul className="auth-error" role="alert">
                                {errors.map((message) => <li key={message}>{message}</li>)}
                            </ul>
                        )}

                        <button type="submit" disabled={loader} className="auth-submit">
                            {loader ? 'Creating account...' : 'Create account'}
                            <span aria-hidden="true">↗</span>
                        </button>
                    </form>
                </div>

                <p className="auth-switch">
                    Already have an account?{' '}
                    <Link to="/login">Log in</Link>
                </p>
            </div>
        </main>
    )
}

export default Signup