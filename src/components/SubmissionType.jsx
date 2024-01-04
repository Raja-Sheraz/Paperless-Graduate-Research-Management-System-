import React, { useState, useContext, useEffect } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { Typography } from '@mui/material'
import { UserContext } from '../context/User'
import axios from 'axios'

export default function SubmissionTypePicker({ onSelectSubmissionType, onSuperViosrSelect }) {
    const [submissionType, setSubmissionType] = useState('Proposal')
    const { user, setUser } = useContext(UserContext)
    const [selectedSupervisor, setSelectedSupervisor] = useState('')
    const [teachers, setTeachers] = useState([])

    useEffect(() => {
        // Fetch teacher data when the component mounts

        axios
            .get('http://localhost:5000/getTeacherData')
            .then((response) => {
                const filteredTeachers = response.data.filter((teacher) => teacher.department === user.department)
                setTeachers(filteredTeachers)
            })
            .catch((error) => {
                console.error('Error fetching teacher data:', error)
            })
        if (user?.supervisor) {
            setSelectedSupervisor(user.supervisor)
        }
    }, [user])

    const handleSuperVisorChange = (event) => {
        setSelectedSupervisor(event.target.value)
        onSuperViosrSelect(event.target.value)

        setUser((prevUser) => {
            return {
                ...prevUser,
                superVisor: event.target.value
            }
        })
    }

    const handleChange = (event) => {
        const selectedType = event.target.value
        setSubmissionType(selectedType)
        onSelectSubmissionType(selectedType) // Callback function to send back the selected type
    }

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {!user.pdf ? (
                    <Typography
                        variant="h5"
                        sx={{
                            width: '40%',
                            margin: 'auto',
                            margin: '40px 60px 20px',
                            fontWeight: 'bold'
                        }}
                    >
                        Select SuperVisor
                    </Typography>
                ) : null}
                {!user.pdf ? (
                    <Typography
                        variant="h5"
                        sx={{
                            width: '40%',
                            margin: 'auto',
                            margin: '40px 60px 20px',
                            fontWeight: 'bold'
                        }}
                    >
                        Select Submission Type
                    </Typography>
                ) : null}
            </div>

            <FormControl
                style={{
                    margin: 'auto',
                    width: '40%',
                    margin: '20px 60px 0px'
                }}
            >
                <InputLabel id="supervisor-label">Select Supervisor</InputLabel>
                <Select
                    labelId="supervisor-label"
                    id="supervisor-select"
                    label="Select Supervisor"
                    value={selectedSupervisor}
                    onChange={handleSuperVisorChange}
                    disabled={user.supervisor ? true : false}
                >
                    {teachers.map((teacher) => (
                        <MenuItem key={teacher._id} value={teacher._id}>
                            {teacher.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl
                sx={{
                    width: '40%',
                    margin: 'auto',
                    margin: '20px 60px 0px'
                }}
            >
                <InputLabel id="demo-simple-select-helper-label">Submission Type</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={submissionType}
                    label="Submission Type"
                    onChange={handleChange}
                    disabled={user.pdf ? true : false}
                >
                    <MenuItem value="Proposal">Proposal</MenuItem>
                    <MenuItem value="Synopsis">Synopsis</MenuItem>
                </Select>
            </FormControl>
        </>
    )
}
