import React, { useState, useContext } from 'react'
import { Box, TextField, Button, Divider, List, ListItem, Avatar, Typography } from '@mui/material'

import { UserContext } from '../context/User'
import { useNavigate } from 'react-router'

const CommentsSection = ({ comments: initialComments, onComment, pdfId }) => {
    const { user } = useContext(UserContext)
    const [comments, setComments] = useState(initialComments)
    const [newComment, setNewComment] = useState('')
    const Navigate = useNavigate()

    const handleCommentChange = (e) => {
        setNewComment(e.target.value)
    }

    const handleSubmit = () => {
        if (newComment.trim() !== '') {
            onComment(newComment)
            setComments([...comments, newComment])
            setNewComment('')
        }
    }

    return (
        <Box borderRadius={4} margin={2} sx={{ height: '1000px' }}>
            <Typography sx={{ marginBottom: '10px' }}>Comments</Typography>
            <TextField
                multiline
                rows={25}
                placeholder="Add a comment..."
                variant="outlined"
                fullWidth
                value={newComment}
                onChange={handleCommentChange}
            />

            <Divider />

            {user.role === 'Supervisor' ? (
                <>
                    <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '10px' }}>
                        Post
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => Navigate('/view-comments', { state: { Id: pdfId } })}
                        style={{ marginTop: '10px', marginLeft: '10px' }}
                    >
                        View Comments
                    </Button>
                </>
            ) : null}
        </Box>
    )
}

export default CommentsSection
