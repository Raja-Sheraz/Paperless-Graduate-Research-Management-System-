import React, { useState, useContext, useEffect } from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import { Typography } from '@mui/material'
import SubmissionTypePicker from './SubmissionType'
import { UserContext } from '../context/User'
import { toast } from 'react-toastify'

import { useNavigate } from 'react-router'
import { uploadStudentPDF } from '../apis/UploadStudentPdf'
import { selectTeacherForStudent } from '../apis/SelectSuperVisor'
import FeedbackModal from './Modal'
import Button from '@mui/material/Button'
import axios from 'axios'
import { updateStudentPDF } from '../apis/Updatepdf'

const ViewPDF = (pdfName, { update }) => {
    const [getId, setGetId] = useState()
    const [uploadPDFName, setUplaodPDFName] = useState(null)
    const [superVisor, setSuperVisor] = useState(null)
    const [pdfFile, setPDFFile] = useState(null)
    const [viewPdf, setViewPdf] = useState(null)
    const [uploadSuccess, setUploadSuccess] = useState(false)
    const fileType = ['application/pdf']
    const { user, setUser, updatePDf, setUpdatePDF } = useContext(UserContext)

    const baseURL = 'http://localhost:5000/files/' //store this in ENV
    const navigate = useNavigate()

    useEffect(() => {
        // setGetId(pdfId)
        console.log('refresh')
    }, [updatePDf])

    useEffect(() => {
        // Check if the user has a PDF file and set it

        const fetchPdfContent = async (pdf) => {
            try {
                const response = await axios.get(`http://localhost:5000/api/pdf/${pdf}`)
                const fullURL = baseURL + response.data.pdfName

                setViewPdf(fullURL)
                //   setPdfContent(response.data);

                // If the response is a URL or file, you might need to handle it differently
                // For example, if it's a URL, you could use it in an iframe to display the PDF:
                // setPdfContent(<iframe title="PDF Viewer" src={response.data} width="100%" height="500px" />);
            } catch (error) {
                console.error('Error fetching PDF:', error)
            }
        }

        if (user?.pdf || pdfName) {
            let pdf = ''
            if (user.pdf) {
                pdf = user.pdf
                fetchPdfContent(pdf)
            } else if (pdfName?.pdfName) {
                const fullURL = baseURL + pdfName?.pdfName

                setViewPdf(fullURL)
            }
        }
    }, [user, pdfName])

    const UpdateStatus = async (pdfId, status) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/pdf/${pdfId}/status`, {
                pdfId: pdfId,
                status: status
            })
            toast.success(response.data.message)

            // Handle success, update state or perform additional actions
        } catch (error) {
            toast.success('Something Went Wrong')
            console.error('Error making PUT request:', error)
            // Handle error, show a message to the user, etc.
        }
    }

    const Feedback = async (pdfId, text) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/pdf/${pdfId}/feedback`, {
                pdfId: pdfId,
                feedbackText: text
            })
            toast.success(response.data.message)

            // Handle success, update state or perform additional actions
        } catch (error) {
            toast.success('Something Went Wrong')
            console.error('Error making PUT request:', error)
            // Handle error, show a message to the user, etc.
        }
    }

    const handleSubmissionTypeSelect = (selectedType) => {
        // Do something with the selected submission type
        console.log('Selected Submission Type:', selectedType)
    }
    const handleSuperVisorType = (selectedType) => {
        setSuperVisor(selectedType)
    }
    const fetchUser = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/getUser/${user._id}`)
            setUser(response.data)
        } catch (error) {
            console.log('Error Getting User Data')
        }
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setUplaodPDFName(selectedFile)
        }
        if (selectedFile && fileType.includes(selectedFile.type)) {
            const reader = new FileReader()
            reader.onload = (event) => {
                setPDFFile(event.target.result)
            }
            reader.readAsDataURL(selectedFile)
            setUploadSuccess(true) // Set upload success message
        } else {
            setPDFFile(null)
            setUploadSuccess(false)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault() // Prevents the default form submission behavior
        if (pdfFile !== null) {
            setViewPdf(pdfFile)
            setUploadSuccess(false) // Remove upload success message
        } else {
            setViewPdf(null)
        }
    }
    const handleSubmission = async () => {
        if (updatePDf === 'Update') {
            setUpdatePDF(null)
            if (user._id && user.pdf) {
                // Upload PDF file for the student
                const result = await updateStudentPDF(uploadPDFName, user.pdf)

                if (result.success) {
                    toast.success('File Uploaded')
                    fetchUser()
                } else {
                    console.error('Failed to upload PDF:', result.error)
                    toast.error('File Upload Failed')
                }
            } else {
                // Handle the case where user ID or supervisor is missing
                toast.error('User ID or Supervisor information missing')
            }
        } else {
            // Check if user ID exists and superVisor is defined
            if (user._id && superVisor) {
                // Select a teacher for the student
                const result = await selectTeacherForStudent(user._id, superVisor)

                if (result.success) {
                    toast.success('Supervisor Selected')
                    fetchUser()
                } else {
                    console.error('Request Failed', result.error)
                }
            } else {
                // Handle the case where user ID or supervisor is missing
                toast.error('User ID or Supervisor information missing')
            }

            // Check if a PDF file is selected
            if (pdfFile) {
                // Upload the selected PDF file for the student
                const result = await uploadStudentPDF(uploadPDFName, user._id)

                if (result.success) {
                    toast.success('File Uploaded')
                    fetchUser()
                } else {
                    console.error('Failed to upload PDF:', result.error)
                    toast.error('File Upload Failed')
                }
            } else {
                // Handle the case where no PDF file is selected
                toast.error('File Not Selected')
            }
        }
    }

    const handleClick = (action) => {
        // Call the function to store state based on the action (approve, reject, modify)
        console.log(action)
        if (action === 'Reject') {
            //action here incase to show modal for other button
            openModal()
        }
        if (pdfName?.pdfId) {
            UpdateStatus(pdfName?.pdfId, action)
        }
    }

    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const handleFeedbackSubmit = (feedback) => {
        // Add your logic to handle the submitted feedback
        if (pdfName?.pdfId) {
            Feedback(pdfName?.pdfId, feedback)
        }
    }

    const newPlugin = defaultLayoutPlugin()

    return (
        <>
            {user.role !== 'Supervisor' ? (
                <SubmissionTypePicker
                    style={{ margin: '30px' }}
                    onSelectSubmissionType={handleSubmissionTypeSelect}
                    onSuperViosrSelect={handleSuperVisorType}
                />
            ) : (
                <div style={{ marginTop: '40px' }} />
            )}

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: user.pdf ? '30px' : '0'
                }}
            >
                {(user.role !== 'Supervisor' && !user.pdf) || updatePDf === 'Update' ? (
                    <>
                        {' '}
                        <Typography
                            variant="h6"
                            sx={{
                                textAlign: 'center',
                                marginTop: '40px',
                                marginBottom: '20px',
                                fontWeight: 'bold'
                            }}
                        >
                            Upload File
                        </Typography>
                        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                            <label htmlFor="pdfFileInput" className="custom-file-upload">
                                <input
                                    type="file"
                                    id="pdfFileInput"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    style={{
                                        marginRight: '10px',
                                        padding: '8px 16px',
                                        cursor: 'pointer',
                                        backgroundColor: '#2ecc71',
                                        border: '1px solid #27ae60',
                                        borderRadius: '5px',
                                        color: '#ffffff'
                                    }}
                                    onClick={() => document.getElementById('pdfFileInput').click()}
                                >
                                    Select PDF
                                </button>
                            </label>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                style={{
                                    padding: '8px 16px',
                                    cursor: 'pointer',
                                    backgroundColor: '#3498db',
                                    border: '1px solid #2980b9',
                                    borderRadius: '5px',
                                    color: '#ffffff'
                                }}
                            >
                                View PDF
                            </button>
                            {uploadSuccess && (
                                <p style={{ color: 'green', textAlign: 'center', marginTop: '10px' }}>
                                    Upload successful
                                </p>
                            )}
                        </form>
                    </>
                ) : null}

                <div style={{ width: '80%', maxWidth: '1000px', height: '1200px' }}>
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                        {viewPdf ? (
                            <Viewer fileUrl={viewPdf} plugins={[newPlugin]} />
                        ) : (
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%',
                                    border: '1px dashed #ccc',
                                    borderRadius: '5px',
                                    color: '#888'
                                }}
                            >
                                No PDF selected
                            </div>
                        )}
                    </Worker>
                </div>
                {user.role !== 'Supervisor' ? (
                    !user.pdf || updatePDf === 'Update' ? (
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={handleSubmission}
                            style={{
                                padding: '8px 16px',
                                cursor: 'pointer',
                                backgroundColor: '#3498db',
                                border: '1px solid #2980b9',
                                borderRadius: '5px',
                                color: '#ffffff',
                                margin: '30px 0 60px'
                            }}
                        >
                            Submit PDF
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={() => navigate('/comments')}
                            style={{
                                padding: '8px 16px',
                                cursor: 'pointer',
                                backgroundColor: '#3498db',
                                border: '1px solid #2980b9',
                                borderRadius: '5px',
                                color: '#ffffff',
                                margin: '30px 0 60px'
                            }}
                        >
                            View Comments
                        </button>
                    )
                ) : (
                    <>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginTop: '30px',
                                marginBottom: '60px'
                            }}
                        >
                            <button
                                type="button"
                                className="btn btn-success"
                                style={{
                                    padding: '8px 16px',
                                    cursor: 'pointer',
                                    borderRadius: '5px',
                                    border: '1px solid #2ecc71',
                                    backgroundColor: '#2ecc71',
                                    color: '#ffffff',
                                    marginRight: '20px'
                                }}
                                onClick={() => handleClick('Approved')}
                            >
                                Approve
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                style={{
                                    padding: '8px 16px',
                                    cursor: 'pointer',
                                    borderRadius: '5px',
                                    border: '1px solid #e74c3c',
                                    backgroundColor: '#e74c3c',
                                    color: '#ffffff',
                                    marginRight: '20px'
                                }}
                                onClick={() => handleClick('Reject')}
                            >
                                Reject
                            </button>
                            <button
                                type="button"
                                className="btn btn-warning"
                                style={{
                                    padding: '8px 16px',
                                    cursor: 'pointer',
                                    borderRadius: '5px',
                                    border: '1px solid #f39c12',
                                    backgroundColor: '#f39c12',
                                    color: '#ffffff'
                                }}
                                onClick={() => handleClick('Modify')}
                            >
                                Modify
                            </button>
                        </div>
                    </>
                )}
            </div>
            <div>
                <FeedbackModal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleFeedbackSubmit} />
            </div>
        </>
    )
}

export default ViewPDF
