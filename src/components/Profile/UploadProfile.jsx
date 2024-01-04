import React, { useState, useContext } from 'react'

import { Button, Typography } from '@mui/material'
import { UserContext } from '../../context/User'

const UploadProfile = () => {
    const { user, setUser } = useContext(UserContext)
    const [profileImg, setProfileImg] = useState('')

    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0]

        if (selectedFile && selectedFile.size < 3145728) {
            const imageUrl = URL.createObjectURL(selectedFile)
            setProfileImg(imageUrl)

            // Update the user context with the new profile image
            setUser((prevUser) => ({
                ...prevUser,
                profileImage: imageUrl
            }))
        } else {
            console.error('Selected file is too large or no file selected.')
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
            <div>
                <Typography variant="caption" sx={{ textAlign: 'center', margin: '0' }}>
                    Update Your Profile Image
                </Typography>

                <input
                    accept="image/*"
                    id="contained-button-file"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                />
                <label htmlFor="contained-button-file">
                    <Button
                        className="primary-button"
                        component="span"
                        style={{
                            fontSize: '14px',
                            padding: '8px 12px',
                            borderRadius: '8px',
                            '&:hover': {
                                backgroundColor: '#eeeeee'
                            },
                            margin: '0',
                            display: 'flex',
                            justifyContent: 'center',
                            backgroundColor: '#3f51b5'
                        }}
                    >
                        <Typography
                            variant="h2"
                            sx={{
                                fontFamily: 'Outfit',
                                fontSize: '14px',
                                fontWeight: 400,
                                lineHeight: '24px',
                                letterSpacing: '0em',
                                textAlign: 'center',
                                color: 'white',
                                margin: '0'
                            }}
                        >
                            Choose Picture
                        </Typography>
                    </Button>
                </label>
            </div>
        </div>
    )
}

export default UploadProfile
