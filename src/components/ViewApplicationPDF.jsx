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
import ApplicationForm from '../pages/ApplicationForm'
import ApplicationFormSubmission from './ApplicationFormSubmission'
import { uploadPDF } from '../apis/UploadPdf'

const ViewApplicationPDF = () => {
    const [uploadPDFName, setUplaodPDFName] = useState(null)
    const [pdfFile, setPDFFile] = useState(null)
    const [viewPdf, setViewPdf] = useState(null)
    const [uploadSuccess, setUploadSuccess] = useState(false)
    const fileType = ['application/pdf']
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate()

    // useEffect(() => {
    //     if (user.pdf) {
    //         setPDFFile(user.pdf)
    //         setViewPdf(user.pdf)
    //     }
    // }, [])

    const handleSubmissionTypeSelect = (selectedType) => {
        console.log('Selected Submission Type:', selectedType)
    }
    const handleSuperVisorType = (selectedType) => {
        console.log('Selected Supervior', selectedType)
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setUplaodPDFName(selectedFile)
        }

        if (selectedFile && fileType.includes(selectedFile.type)) {
            const reader = new FileReader()

            reader.onload = (event) => setPDFFile(event.target.result)
            reader.readAsDataURL(selectedFile)
            setUploadSuccess(true)
        } else {
            setPDFFile(null)
            setUploadSuccess(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (pdfFile !== null) {
            setViewPdf(pdfFile)
            setUploadSuccess(false)
        } else {
            setViewPdf(null)
        }
    }

    const handleSubmission = async () => {
        if (pdfFile) {
            const result = await uploadPDF(uploadPDFName)

            if (result.success) {
                console.log('PDF uploaded successfully:', result.data)
            } else {
                console.error('Failed to upload PDF:', result.error)
            }
            setUser((prevUser) => ({
                ...prevUser,
                pdf: pdfFile
            }))
            toast.success('File Submitted')
        } else {
            toast.error('File Not Selected')
        }
    }

    const handleClick = (action) => {
        console.log(action)
    }

    const newPlugin = defaultLayoutPlugin()

    return (
        <>
            {user.role !== 'Supervisor' ? (
                <ApplicationFormSubmission
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
                {user.role !== 'Supervisor' ? (
                    <>
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
                                    name="pdfFile"
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
                    user.pdf ? (
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
                    ) : (
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
                    )
                ) : (
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
                            onClick={() => handleClick('approve')}
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
                            onClick={() => handleClick('reject')}
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
                            onClick={() => handleClick('modify')}
                        >
                            Modify
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}

export default ViewApplicationPDF
