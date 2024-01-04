import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import { Button, Typography, Box } from '@mui/material'
import { toast } from 'react-toastify'

function Password() {
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSave = () => {
        // Password validation logic
        if (newPassword !== confirmPassword) {
            // Show a toast message for password mismatch
            toast.error('Passwords do not match')
            return
        }

        // Your logic to handle saving the password
        console.log('New Password:', newPassword)
        console.log('Confirm Password:', confirmPassword)

        // Show a success toast message
        toast.success('Password saved successfully')
    }

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography sx={{ fontWeight: 'bold', marginBottom: '10px' }}>User Information</Typography>

            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <InputLabel htmlFor="confirm-password" sx={{ fontSize: '16px', marginBottom: '10px' }}>
                        Enter New Password
                    </InputLabel>
                    <TextField
                        id="new-password"
                        variant="outlined"
                        fullWidth
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel htmlFor="confirm-password" sx={{ fontSize: '16px', marginBottom: '10px' }}>
                        Confirm New Password
                    </InputLabel>
                    <TextField
                        id="confirm-password"
                        variant="outlined"
                        fullWidth
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleSave}>
                        Save
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Password
