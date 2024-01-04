import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
export default function SendEmail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('123')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        axios
            .get('/getUser/' + id)
            .then((result) => {
                console.log(result)
                setEmail(result.data.email)
            })
            .catch((err) => console.log(err))
    }, [id])

    const generateRandomPassword = () => {
        // Logic to generate a random password (customize this as needed)
        const randomPassword = Math.random().toString(36).slice(-8)
        return randomPassword
    }

    const handleGeneratePassword = () => {
        const newPassword = generateRandomPassword()
        setPassword(newPassword)
        setShowPassword(true)
    }

    // const SubmitData = async (e) => {
    //   e.preventDefault();
    //   try {
    //     const result = await axios.put("/updateUser/" + id, { email, password });
    //     console.log(result);
    //     alert("Update Data Successfully");
    //     navigate(`/admin/admin/sendEmail/${id}`);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // }

    const SubmitData = async (e) => {
        e.preventDefault()
        try {
            const result = await axios.put(`/updateUser/${id}`, { email, password })
            console.log(result)
            alert('Update Data Successfully')
            navigate(`/admin/admin/sendEmail/${id}`)
        } catch (err) {
            console.error(err)
        }
    }

    const SendEmail = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)

            const res = await fetch('http://localhost:5000/emailsend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })

            const data = await res.json()

            if (data.status === 401 || !data) {
                Swal.fire({
                    icon: 'error',
                    title: 'Email Error',
                    text: 'Please check your email.'
                })
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully Send',
                    text: 'Email Send Successfully.'
                })
                navigate('/admin/admin/studentRegisterData')
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <div className="title"> Send Password </div>
            <div>
                <form onSubmit={SubmitData}>
                    <div className="inputFields">
                        <label>Email:</label>
                        <br />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter an Email"
                            required
                        />
                        <br />
                        <br />
                    </div>
                    <div className="inputFields">
                        <label>Password:</label>
                        <br />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter a password"
                            required
                        />
                        <br />
                        <label>
                            <input
                                type="checkbox"
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)}
                                style={{ height: '50px', width: '20px', textAlign: 'center' }}
                            />
                            Show Password
                        </label>
                        <br />
                    </div>
                    {/* <button type="submit" onClick={SendEmail} className="formBtn" disabled={loading}>
                        {loading ? 'Sending...' : 'Provide Access'}
                    </button> */}
                    <button
                        type="button" // Change to "button" to prevent form submission
                        onClick={handleGeneratePassword}
                        className="formBtn"
                    >
                        Generate Random Password
                    </button>
                    <button
                        type="submit"
                        onClick={(e) => {
                            SubmitData(e)
                            SendEmail(e)
                        }}
                        className="formBtn"
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Provide Access'}
                    </button>
                </form>
            </div>
        </div>
    )
}
