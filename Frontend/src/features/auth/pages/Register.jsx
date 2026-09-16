import React, { useState } from 'react'
import "../auth.form.scss"
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { loading, handleRegister } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleRegister({ username, email, password })
        navigate("/")
    }

    if (loading) {
        return (
            <main className="auth-page">
                <div className="form-container loading-container">
                    <div className="loading-spinner"></div>
                    <h1>Creating account...</h1>
                </div>
            </main>
        )
    }

    return (
        <main className="auth-page">
            <div className="form-container">
                <header className="auth-header">
                    <h1 className="auth-title">Create Account</h1>
                    <p className="auth-subtitle">Get started with personalized, AI-driven interview preparation.</p>
                </header>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input 
                            onChange={(e) => setUsername(e.target.value)}
                            type="text" 
                            id="username" 
                            name="username" 
                            placeholder='Enter your username' 
                            required
                        />
                    </div>

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

                    <button className='auth-button' type="submit">Register</button>
                </form>

                <p className="auth-footer-text">
                    Already have an account? <Link to={"/login"}>Login</Link>
                </p>
            </div>
        </main>
    )
}

export default Register
