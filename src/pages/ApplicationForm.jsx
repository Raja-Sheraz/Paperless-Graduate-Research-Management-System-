// material-ui
import { Typography } from '@mui/material'

// project imports
import Grid from '@mui/material/Grid'
import { UserContext } from '../context/User'
import ViewPDF from '../components/ViewPDF'
import CommentsSection from '../components/CommentSection'
import { BoxWrapper } from '../Utils/BoxWrapper'
import { useContext } from 'react'
import ViewApplicationPDF from '../components/ViewApplicationPDF'

const ApplicationForm = () => {
    const initialComments = []
    const { user } = useContext(UserContext)

    return (
        <Grid container spacing={2}>
            <Grid item xs={user.role !== 'Supervisor' ? 12 : 9}>
                <BoxWrapper>
                    <ViewApplicationPDF />
                </BoxWrapper>
            </Grid>

            {user.role === 'Supervisor' && (
                <Grid item xs={3}>
                    <BoxWrapper>
                        <CommentsSection
                            comments={initialComments}
                            onComment={(newComment) => console.log(newComment)}
                        />
                    </BoxWrapper>
                </Grid>
            )}
        </Grid>
    )
}

export default ApplicationForm
