import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
export default function Second_Email() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        axios
            .get('/getUser1/' + id)
            .then((result) => {
                console.log(result)
                setRole(result.data.role)
                setEmail(result.data.email)
                setPassword(result.data.password);
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

    const SubmitData = async (e) => {
        e.preventDefault()
        try {
            const result = await axios.put(`/updateUser1/${id}`, { role, password })
            console.log(result)
            alert('Update Data Successfully')
            navigate(`/admin/admin/teacherRegisterData/${id}`)
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

                // Wait for a short moment before updating to ensure the email is sent
                setTimeout(() => {
                    // Now, trigger the update operation
                    axios
                        .put('/updateUser1/' + id, { email, password, role })
                        .then((result) => {
                            console.log(result)
                            Swal.fire({
                                icon: 'success',
                                title: 'Add Role Successfully',
                                text: 'Role Add  Successfully.'
                            })
                            navigate('/admin/admin/teacherRegisterData')
                        })
                        .catch((err) => console.log(err))
                }, 1000) // You can adjust the delay based on your needs
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <div className="title"> Add Role & Send Password</div>
            <div>
                <form onSubmit={SubmitData}>
                    <div className="inputFields">
                        <label>Provide Role:</label>
                        <br />
                        <select name="role" id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
                            <option value=""></option>
                            <option value="Supervisor">Supervisor</option>
                            <option value="CoordinateCommitte">Coordinate Committe</option>
                            <option value="DAC">DAC</option>
                            <option value="ExternalExaminer">External Examiner</option>
                        </select>
                    </div>
                    <div className="inputFields">
                        <label>Email:</label>
                        <br></br>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter a Email"
                            required
                        />
                        <br></br>
                        <br></br>
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
