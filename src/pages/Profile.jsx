// material-ui
import { Typography } from '@mui/material'

// project imports

import { useContext } from 'react'

import { BoxWrapper } from '../Utils/BoxWrapper'
import UploadProfile from '../components/Profile/UploadProfile'
import UserProfileDashboard from '../components/Profile/UserProfileDashBoard'
import { UserContext } from '../context/User'
import Password from '../components/Password'

// ==============================|| SAMPLE PAGE ||============================== //

const ProfilePage = () => {
    const { user } = useContext(UserContext)

    return (
        <>
            <UserProfileDashboard userProfileData={user} />
            <UploadProfile />
        </>
    )
}

export default ProfilePage
