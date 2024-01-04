// FeedbackModal.js
import React, { useState } from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import Button from '@mui/material/Button'

const FeedbackModal = ({ isOpen, onClose, onSubmit }) => {
    const [feedback, setFeedback] = useState('')

    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value)
    }

    const handleSubmit = () => {
        onSubmit(feedback)
        setFeedback('')
        onClose()
    }

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                    width: '80%', // Adjusted width to be responsive
                    maxWidth: '600px', // Added max width for larger screens
                    p: 4,
                    textAlign: 'center'
                }}
            >
                <div>
                    <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold', color: '#333' }}>
                        Feedback
                    </Typography>
                    <TextareaAutosize
                        placeholder="Enter your feedback here..."
                        value={feedback}
                        onChange={handleFeedbackChange}
                        rows={8} // Adjusted the number of rows for a more reasonable height
                        style={{
                            width: '100%',
                            marginBottom: 3,
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            padding: '12px',
                            fontSize: '16px',
                            height: '200px',
                            resize: 'vertical' // Allow vertical resizing
                        }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        sx={{ width: '80', borderRadius: '4px' }}
                    >
                        Submit Feedback
                    </Button>
                </div>
            </Box>
        </Modal>
    )
}

export default FeedbackModal
