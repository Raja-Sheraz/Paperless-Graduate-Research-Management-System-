import React, { useState, useContext } from 'react'
import { UserContext } from '../context/User'
import { useNavigate } from 'react-router-dom'

function SignUpPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { setUser } = useContext(UserContext)
    const navigate = useNavigate()

    const handleNameChange = (e) => setName(e.target.value)
    const handleEmailChange = (e) => setEmail(e.target.value)
    const handlePasswordChange = (e) => setPassword(e.target.value)

    const handleSignUp = (e) => {
        e.preventDefault()
        // console.log(name, email, password)
        // setUser({

        // });
        // navigate('/');
    }

    return (
        <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
            {/* Your sign-up form layout here */}
            <div className="md:w-1/3 max-w-sm">
                <img
                    src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                    alt="Sample image"
                />
            </div>
            {/* Your sign-up form layout here */}
            <div className="md:w-1/3 max-w-sm">
                <div className="">
                    <p className="mx-4 text-2xl mb-4 text-center font-semibold text-blue-500">SIGN UP</p>
                </div>
                <input
                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={handleNameChange}
                />
                <input
                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                    type="text"
                    placeholder="Email Address"
                    value={email}
                    onChange={handleEmailChange}
                />
                <input
                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                {/* Add additional fields as needed for your sign-up form */}
                <div className="text-center md:text-left">
                    <button
                        className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                        type="submit"
                        onClick={handleSignUp}
                    >
                        Sign Up
                    </button>
                </div>
                <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
                    Already have an account?{' '}
                    <a className="text-blue-600 hover:underline hover:underline-offset-4" href="/login">
                        Login
                    </a>
                </div>
            </div>
        </section>
    )
}

export default SignUpPage
