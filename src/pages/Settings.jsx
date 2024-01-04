import React, { useState } from 'react'
import { Container, Typography, TextField, Button, Modal, Paper, Grid, CssBaseline } from '@mui/material'
import { toast } from 'react-toastify'

const Settings = () => {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [error, setError] = useState('')

    const handlePasswordChange = () => {
        // Add error handling logic
        if (currentPassword.length === 0 || newPassword.length === 0 || confirmPassword.length === 0) {
            setError('Please fill in all fields.')
            toast.error('Please fill in all fields')
        } else if (newPassword !== confirmPassword) {
            setError('New password and confirm password do not match.')
            toast.error('New password and confirm password do not match.')
        } else {
            // Reset error state
            setError('')

            // Add logic to handle password change
            // You can make an API call to the server to change the password
            // and then open the modal for confirmation
            setIsModalOpen(true)
        }
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    return (
        <Container maxWidth="xl">
            <CssBaseline />
            <Paper
                elevation={6}
                style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
                <Typography variant="h5" align="center" gutterBottom>
                    Change Password
                </Typography>
                <form style={{ width: '100%', marginTop: '1rem' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Current Password"
                                type="password"
                                fullWidth
                                variant="outlined"
                                required
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="New Password"
                                type="password"
                                fullWidth
                                variant="outlined"
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Confirm Password"
                                type="password"
                                fullWidth
                                variant="outlined"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Grid>
                    </Grid>

                    {error && (
                        <Typography variant="body2" color="error" style={{ marginTop: '10px', textAlign: 'center' }}>
                            {error}
                        </Typography>
                    )}

                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ marginTop: '20px', width: '20%', marginLeft: '40%' }}
                        onClick={handlePasswordChange}
                    >
                        Change Password
                    </Button>
                </form>
                <Modal open={isModalOpen} onClose={handleCloseModal}>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                        <Paper elevation={6} style={{ padding: '20px', textAlign: 'center', maxWidth: '400px' }}>
                            <Typography variant="h6" gutterBottom>
                                Password Changed Successfully!
                            </Typography>
                            <Typography variant="body1">
                                Your password has been successfully changed. You can now use your new password to log
                                in.
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ marginTop: '20px' }}
                                onClick={handleCloseModal}
                            >
                                Close
                            </Button>
                        </Paper>
                    </div>
                </Modal>
            </Paper>
        </Container>
    )
}

export default Settings
