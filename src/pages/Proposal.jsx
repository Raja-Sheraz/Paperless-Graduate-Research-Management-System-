// material-ui
import { Typography } from '@mui/material'

// project imports
import Grid from '@mui/material/Grid'
import { UserContext } from '../context/User'
import ViewPDF from '../components/ViewPDF'
import CommentsSection from '../components/CommentSection'
import { BoxWrapper } from '../Utils/BoxWrapper'
import { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import axios from 'axios'
import { toast } from 'react-toastify'

const Proposal = () => {
    const location = useLocation()
    const initialComments = []
    const { user, setUpdatePDF } = useContext(UserContext)

    if (location?.state?.update) {
        setUpdatePDF(location?.state?.update)
    }
    const [id, setId] = useState(location?.state?.pdfId)

    const [getComments, setGetComments] = useState([])
    const [getStatus, setGetStatus] = useState()
    const [getPdfName, setGetPdfName] = useState()

    const getPdfById = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/pdf/${id}`)
            return response.data
        } catch (error) {
            console.error(`Error fetching PDF data for ID ${id}:`, error)
            throw error // You can choose to handle the error in an appropriate way
        }
    }
    useEffect(() => {
        // Example studentId, replace this with your actual logic to get the studentId
        const pdfId = location?.state?.pdfId

        const fetchData = async () => {
            try {
                const pdfData = await getPdfById(pdfId)
                // Now, navigate to another page with the studentId
                setGetComments(pdfData?.comments)
                setGetPdfName(pdfData?.pdfName)
                setGetStatus(pdfData?.status)
                console.log(getComments)
                console.log(getPdfName)
                console.log(getStatus)
                setId(pdfId)
            } catch (error) {
                console.error('Error fetching PDF status:', error)
            }
        }

        fetchData()
    }, [location?.state?.pdfId])

    const GetComments = async (newComment) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/pdf/${id}/comments`, {
                pdfId: id,
                text: newComment
            })
            toast.success(response.data.message)

            // Handle success, update state or perform additional actions
        } catch (error) {
            toast.success('Something Went Wrong')
            console.error('Error making PUT request:', error)
            // Handle error, show a message to the user, etc.
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={user.role !== 'Supervisor' ? 12 : 9}>
                <BoxWrapper>
                    <ViewPDF pdfName={getPdfName} StudentStatus={getStatus} pdfId={id} />
                </BoxWrapper>
            </Grid>

            {user.role === 'Supervisor' && (
                <Grid item xs={3}>
                    <BoxWrapper>
                        <CommentsSection comments={getComments} onComment={GetComments} pdfId={id} />
                    </BoxWrapper>
                </Grid>
            )}
        </Grid>
    )
}

export default Proposal
