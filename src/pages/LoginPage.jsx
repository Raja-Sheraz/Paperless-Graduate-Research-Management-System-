import React, { useState, useContext } from 'react'
import { UserContext } from '../context/User'

import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import Register from './Register'
function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const { setUser } = useContext(UserContext)
    const navigate = useNavigate()

    const handleEmailChange = (e) => setEmail(e.target.value)
    const handlePasswordChange = (e) => setPassword(e.target.value)
    const handleRoleChange = (e) => setRole(e.target.value)
    const handleRememberMeChange = () => setRememberMe(!rememberMe)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email || !password) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please provide both email and password.'
            })
            return
        }

        const baseAxios = axios.create({
            baseURL: 'http://localhost:5000'
        })

        try {
            let loginData = { email, password }

            if (email === 'umarali031158@gmail.com' && password === '@Umarali104') {
                navigate('/admin/admin/studentRegisterData')
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successfully',
                    text: 'Welcome! Muhammad Umar',
                    showConfirmButton: false,
                    timer: 3000
                })
            } else {
                if (role) {
                    loginData = { ...loginData, role }
                }

                const response = await baseAxios.post(role ? '/login1' : '/login', loginData)

                if (response?.data?.error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: response.data.error
                    })
                } else {
                    setUser(response.data)
                    // toast.success('Login successful');
                    Swal.fire({
                        icon: 'success',
                        title: 'Sucessfully',
                        text: 'Login Successfully'
                    })
                    navigate('/')
                    console.log('Login successful:', response.data)
                }
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Some Thing Went Wrong'
            })
        }
    }

    return (
        <div className="bg-gradient">
            <p
                className="mx-4 text-4xl mb-4 text-center font-extrabold text-white"
                style={{
                    fontSize: '50px',
                    fontFamily: 'Montserrat, sans-serif', // Change to a professional font
                    textTransform: 'uppercase', // Uppercase for a more bold look
                    letterSpacing: '5px',
                    borderRadius: '10px',
                    padding: '10px',
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    background: 'linear-gradient(to right, #3498db, #2c3e50)', // Gradient background
                    WebkitBackgroundClip: 'text', // Clip text to background
                    color: 'transparent' // Make text transparent
                }}
            >
                PGMS
            </p>

            <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
                <div className="md:w-1/3 max-w-sm">{/* Removed the image */}</div>
                <div className="md:w-1/3 max-w-sm">
                    <div className="mb-4">
                        <p className="mx-4 text-2xl mb-4 text-center font-semibold text-blue-500">LOGIN</p>
                    </div>

                    <TextField
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={handleEmailChange}
                        fullWidth
                        autoComplete="off"
                        inputProps={{ style: { fontSize: 16, color: 'black' } }}
                        InputLabelProps={{ style: { fontSize: 16, color: '#2c3e50' } }}
                    />
                    <TextField
                        style={{ marginTop: '20px' }}
                        label="Password"
                        variant="outlined"
                        value={password}
                        type="password"
                        onChange={handlePasswordChange}
                        fullWidth
                        autoComplete="off"
                        inputProps={{ style: { fontSize: 16, color: 'black' } }}
                        InputLabelProps={{ style: { fontSize: 16, color: '#2c3e50' } }}
                    />

                    <FormControl fullWidth style={{ marginTop: '20px' }}>
                        <InputLabel id="role-label" style={{ fontSize: 16, color: '#2c3e50' }}>
                            Role
                        </InputLabel>
                        <Select
                            style={{ color: 'black' }}
                            labelId="role-label"
                            id="role"
                            value={role}
                            label="Role"
                            onChange={handleRoleChange}
                        >
                            <MenuItem value="Supervisor">Supervisor</MenuItem>
                            <MenuItem value="Committee">Committee</MenuItem>
                            <MenuItem value="DAC">DAC</MenuItem>
                            <MenuItem value="Deen">Deen</MenuItem>
                            <MenuItem value="External Examiner">External Examiner</MenuItem>
                        </Select>
                        <p
                            style={{
                                fontSize: '15px',
                                color: 'black',
                                marginTop: '4px'
                            }}
                        >
                            <span style={{ color: 'red', fontSize: '20px', marginRight: '2px', fontWeight: 'bold' }}>
                                *
                            </span>
                            Role Optional for students
                        </p>
                    </FormControl>

                    <div className="text-center md:text-left">
                        <button
                            className="mt-4 px-6 py-3 text-white uppercase rounded text-lg font-semibold transition duration-300 ease-in-out"
                            type="submit"
                            onClick={handleSubmit}
                            style={{
                                width: '100%',
                                background: 'linear-gradient(to right, #3498db, #2c3e50)' // Adjust the colors as needed
                            }}
                        >
                            Login
                        </button>
                    </div>

                    <div className="mt-4 font-semibold text-sm text-gray-600 text-center md:text-left">
                        <p style={{ color: 'black' }}>Don't have an account?</p>
                        <Link
                            className="text-red-600 hover:underline hover:underline-offset-4"
                            to="/studentRegistration"
                            style={{ letterSpacing: '1px' }}
                        >
                            Student Register
                        </Link>
                        <br />
                        <Link
                            className="text-red-600 hover:underline hover:underline-offset-4"
                            to="/teacherRegistration"
                            style={{ letterSpacing: '1px' }}
                        >
                            Teacher Register
                        </Link>
                        <br />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default LoginPage
