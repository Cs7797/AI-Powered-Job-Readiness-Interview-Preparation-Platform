import React, { useState } from 'react'
import "../auth.form.scss"
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const login = () => {
    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleLogin({ email, password })
        navigate("/")
    }

    if (loading) {
        return (
            <main className="auth-page">
                <div className="form-container loading-container">
                    <div className="loading-spinner"></div>
                    <h1>Signing in...</h1>
                </div>
            </main>
        )
    }

    return (
        <main className="auth-page">
            <div className="form-container">
                <header className="auth-header">
                    <h1 className="auth-title">Welcome Back</h1>
                    <p className="auth-subtitle">Sign in to continue to your interview prep dashboard.</p>
                </header>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder='Enter your email' 
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder='Enter your password' 
                            required
                        />
                    </div>

                    <button className='auth-button' type="submit">Login</button>
                </form>

                <p className="auth-footer-text">
                    Don't have an account? <Link to={"/register"}>Register</Link>
                </p>
            </div>
        </main>
    )
}

export default login
