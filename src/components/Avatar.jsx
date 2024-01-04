import React, { useState, useEffect, useContext } from 'react'
import { Avatar, Button, Typography } from '@mui/material'
import { UserContext } from '../context/User'

const AccountAvatar = () => {
    const [profileImage, setProfileImage] = useState(null)
    const { user } = useContext(UserContext)

    useEffect(() => {
        setProfileImage(user.profileImage)
    }, [profileImage])

    return (
        <div style={{ width: '100%', margin: '0 auto' }}>
            {/* Profile Image Section */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div>
                    <Avatar
                        src={profileImage}
                        alt="Profile"
                        className="profile-picture"
                        style={{
                            width: '175px', // Set the desired width
                            height: '175px', // Set the desired height
                            objectFit: 'cover',
                            borderRadius: '50%',
                            margin: '0 auto 10px' // Center the Avatar horizontally
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default AccountAvatar
