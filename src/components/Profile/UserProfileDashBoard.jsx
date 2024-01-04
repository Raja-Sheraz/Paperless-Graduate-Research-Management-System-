import React, { useEffect, useState } from 'react'
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, Typography } from '@mui/material'

import { useContext } from 'react'
import { UserContext } from '../../context/User'
const UserProfileDashboard = () => {
    const { user } = useContext(UserContext)
    const imageUrl = user?.profileImage
    const [username, setUsername] = useState('')
    const [classValue, setClassValue] = useState('')
    const [sectionValue, setSectionValue] = useState('')
    const [cnic, setCnic] = useState()
    const [phone, setPhone] = useState()
    const [email, setEmail] = useState()
    const [department, setDepartment] = useState()
    const [address, setAddress] = useState()

    useEffect(() => {
        if (user) {
            setUsername(user.name)
            setCnic(user.cnic)
            setPhone(user.phone)
            setEmail(user.email)
            setDepartment(user.department)
            setAddress(user.address)
        }
    }, [user])

    const data = [
        { heading1: 'Name', value1: username, heading2: 'CNIC', value2: cnic },
        { heading1: 'Phone', value1: phone, heading2: 'Email', value2: email },
        { heading1: 'Department', value1: department, heading2: 'Address', value2: address }
    ]

    return (
        <Paper
            className="flex-1"
            style={{ padding: '20px', margin: '20px 0', background: 'white', border: '1px solid #ddd' }}
        >
            <div>
                <Typography sx={{ fontWeight: 'bold', marginBottom: '10px' }}>User Information</Typography>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ borderRight: '1px solid #ddd' }}>
                        <img src={imageUrl} alt="Table Image" style={{ width: '175px', height: '150px' }} />
                    </div>
                    <div style={{ width: '100%', padding: '0 30px' }}>
                        <Table style={{ borderCollapse: 'collapse', width: '100%' }}>
                            <TableBody>
                                {data.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={index % 2 === 1 ? { background: '#f2f2f2' } : { background: 'white' }}
                                    >
                                        <TableCell
                                            sx={{ fontWeight: 'bold', border: '1px solid #ddd', padding: '10px' }}
                                        >
                                            {row.heading1}
                                        </TableCell>
                                        <TableCell style={{ border: '1px solid #ddd', padding: '10px' }}>
                                            {row.value1}
                                        </TableCell>
                                        <TableCell
                                            sx={{ fontWeight: 'bold', border: '1px solid #ddd', padding: '10px' }}
                                        >
                                            {row.heading2}
                                        </TableCell>
                                        <TableCell style={{ border: '1px solid #ddd', padding: '10px' }}>
                                            {row.value2}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </Paper>
    )
}

export default UserProfileDashboard
