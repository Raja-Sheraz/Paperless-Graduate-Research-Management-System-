import React, { useState, useContext } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { Typography } from '@mui/material'
import { UserContext } from '../context/User'

export default function ApplicationFormSubmission({ onSelectSubmissionType }) {
    const [submissionType, setSubmissionType] = useState('Proposal')
    const { user, setUser } = useContext(UserContext)
    const [selectApplicationForm, setSelectApplicationForm] = useState('')

    const handleApplicationFormChange = (event) => {
        setSelectApplicationForm(event.target.value)
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {
                <Typography
                    variant="h5"
                    sx={{
                        width: '40%',
                        margin: '40px 0 20px',
                        fontWeight: 'bold',
                        textAlign: 'center' // Center the text
                    }}
                >
                    Select Application Form
                </Typography>
            }
            <FormControl
                style={{
                    width: '40%',
                    margin: '0' // Adjusted margin
                }}
            >
                <InputLabel id="application-label">Select Application Form</InputLabel>
                <Select
                    labelId="application-label"
                    id="application-select"
                    label="Select Application Form"
                    value={selectApplicationForm}
                    onChange={handleApplicationFormChange}
                    // disabled={user.pdf ? true : false}
                >
                    <MenuItem value="app1">Application for extension in duration of studies</MenuItem>
                    <MenuItem value="app2">Application for leave of absence</MenuItem>
                    <MenuItem value="app3">Application for rejoining after leave</MenuItem>
                    <MenuItem value="app4">Application for readmisison</MenuItem>
                    <MenuItem value="app5">Appointment of Supervisor and Supervisory Committee</MenuItem>
                    <MenuItem value="app6">Application for Comprehensive Examination</MenuItem>
                    <MenuItem value="app7">Application for extension in duration of studies</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}
