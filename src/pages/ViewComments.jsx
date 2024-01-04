import React, { useState, useContext, useEffect } from 'react'
import { Box, Card, CardContent, Divider, Grid, List, ListItem, Avatar, Typography } from '@mui/material'
import { UserContext } from '../context/User'
import { useLocation } from 'react-router-dom'
import { BoxWrapper } from '../Utils/BoxWrapper'
import axios from 'axios'

const ViewComments = () => {
    const { user } = useContext(UserContext)
    const [comments, setComments] = useState([])
    const location = useLocation()
    const id = location?.state?.Id

    useEffect(() => {
        const getPdfById = async (id) => {
            try {
                const response = await axios.get(`http://localhost:5000/api/pdf/${id}`)
                setComments(response.data.comments || [])
            } catch (error) {
                console.error(`Error fetching PDF data for ID ${id}:`, error)
                throw error
            }
        }

        if (user?.pdf) {
            getPdfById(user?.pdf)
        }
        if (id) {
            getPdfById(id)
        }
    }, [user])

    return (
        <BoxWrapper>
            {comments?.length > 0 && (
                <Box borderRadius={4} margin={2}>
                    <Typography variant="h5" sx={{ marginBottom: '20px', textAlign: 'center', color: '#333' }}>
                        Comments
                    </Typography>
                    {/* <Divider /> */}
                    <List sx={{ width: '100%' }}>
                        <Grid container spacing={1}>
                            {comments?.map((comment, index) => (
                                <Grid
                                    item
                                    key={index}
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    sx={{ display: 'flex', justifyContent: 'center' }}
                                >
                                    <Card
                                        variant="outlined"
                                        sx={{
                                            width: '100%',
                                            maxWidth: '450px',
                                            backgroundColor: '#fff',
                                            marginBottom: 2,
                                            borderRadius: '8px'
                                        }}
                                    >
                                        <CardContent>
                                            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                                                <Avatar alt="User" src={comment.userAvatar} />
                                                <Typography
                                                    variant="body1"
                                                    sx={{ fontWeight: 'bold', marginLeft: '10px' }}
                                                >
                                                    {comment?.userName}
                                                </Typography>
                                            </Box>
                                            <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                                                {comment?.text}
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: '#666' }}>
                                                {comment?.timestamp && comment.timestamp.slice(0, 10)}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </List>
                </Box>
            )}
        </BoxWrapper>
    )
}

export default ViewComments
