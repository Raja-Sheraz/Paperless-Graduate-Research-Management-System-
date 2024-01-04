import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/User'
import MUIDataTable from 'mui-datatables'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import { useNavigate } from 'react-router'

import { TableHeading } from '../components/tableHeading'

const StudentsPage = () => {
    const [userData, setUserData] = useState([])
    const [studentsData, setStudentsData] = useState([])
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState([])
    const { user } = useContext(UserContext)
    const Navigate = useNavigate()

    useEffect(() => {
        let isMounted = true

        const fetchStudentDataById = async (id) => {
            try {
                const response = await axios.get(`http://localhost:5000/getUser/${id}`)
                return response.data
            } catch (error) {
                console.error(`Error fetching student data for ID ${id}:`, error)
                return null // or handle the error in an appropriate way
            }
        }

        const fetchAllStudentData = async () => {
            const studentsData = await Promise.all(user?.students?.map((studentId) => fetchStudentDataById(studentId)))

            if (isMounted) {
                setStudentsData((prevData) => [...prevData, ...studentsData])
            }
        }

        fetchAllStudentData()

        return () => {
            isMounted = false
        }
    }, [user?.students])

    // const getPdfById = async (pdf) => {
    //     try {
    //         const response = await axios.get(`http://localhost:5000/api/pdf/${pdf}`)
    //         const status = response.data.status
    //         setStatus([status])
    //         console.log('Status', status)
    //     } catch (error) {
    //         console.error('Error fetching PDF:', error)
    //     }
    // }

    useEffect(() => {
        const removeDuplicates = (objectsArray) => {
            const seen = new Set()
            return objectsArray?.filter((obj) => {
                const objString = JSON.stringify(obj)
                if (!seen.has(objString)) {
                    seen.add(objString)
                    return true
                }
                return false
            })
        }

        if (studentsData) {
            const result = removeDuplicates(studentsData)
            console.log('Results:', result)
            setStudents(result)
            console.log(students)
        }
    }, [studentsData])

    const columns = [
        {
            name: 'name',
            label: 'Name',
            options: {
                sort: false,
                filter: false
            }
        },

        {
            name: 'phone',
            label: 'Phone No',
            options: {
                sort: false
            }
        },
        {
            name: 'email',
            label: 'Email',
            options: {
                sort: false
            }
        },

        {
            name: 'department',
            label: 'Department',
            options: {
                sort: false
            }
        },

        {
            name: 'pdf',
            label: ' PDF Uploaded',
            options: {
                sort: false,
                customBodyRender: (value) => {
                    let isAvailable
                    if (value) {
                        isAvailable = 'YES'
                    } else {
                        isAvailable = 'NO'
                    }

                    const statusStyle = {
                        padding: '6px 4px', // Adding padding

                        width: '100px',

                        background: isAvailable ? '#00BA611A' : '#D9B91A1A',
                        color: isAvailable ? '#00BA61' : '#D9B91A',
                        borderRadius: '4px', // Adding border-radius for a box-like appearance
                        textAlign: 'center' // Centering the text

                        // Add other common styles here
                    }

                    return <div style={statusStyle}>{isAvailable}</div>
                }
            }
        },
        // {
        //     name: 'pdf',
        //     label: 'Status', // Not allowing Async calls
        //     options: {
        //         sort: false,
        //         customBodyRender: (value) => {
        //             const getStatus = () => {
        //                 try {
        //                     const pdfData = getPdfById(value)
        //                     const isPdfAvailable = 'YES'
        //                     const statusStyle = {
        //                         padding: '6px 4px',
        //                         width: '100px',
        //                         background: isPdfAvailable ? '#00BA611A' : '#D9B91A1A',
        //                         color: isPdfAvailable ? '#00BA61' : '#D9B91A',
        //                         borderRadius: '4px',
        //                         textAlign: 'center'
        //                     }

        //                     return <div style={statusStyle}>{status}</div>
        //                 } catch (error) {
        //                     console.error('Error fetching PDF status:', error)
        //                     return <div>Error</div> // Handle the error in an appropriate way
        //                 }
        //             }

        //             return getStatus(value)
        //         }
        //     }
        // },
        {
            name: 'pdf',

            label: ' ',

            options: {
                sort: false,
                filter: false,
                customBodyRender: (value) => {
                    const statusStyle = {
                        padding: '6px 4px',
                        width: '100px',
                        background: '#eeeeee',
                        color: '#333333',
                        borderRadius: '4px',
                        textAlign: 'center'
                    }
                    let isAvailable
                    if (value) {
                        isAvailable = 'YES'
                    } else {
                        isAvailable = 'NO'
                    }
                    if (isAvailable) {
                        return (
                            <Typography
                                className="details-text"
                                onClick={() => Navigate('/proposal', { state: { pdfId: value } })}
                                sx={{ cursor: 'pointer', fontFamily: 'Outfit', fontSize: '14px', ...statusStyle }}
                            >
                                VIEW
                            </Typography>
                            //    </div>
                        )
                    }
                }
            }
        }
    ]
    const HeaderElements = () => {
        // return (
        //   // <Button type="button" onClick={() => console.log('Clicked')}>
        //   //   + Add Booking
        //   // </Button>
        // );
    }

    const options = {
        // textLabels: {
        //   body: {
        //     noMatch: ''
        //   }
        // },
        customHeadRender: () => ({
            style: {
                fontFamily: 'Outfit',
                fontSize: '48px',
                fontWeight: 500,
                lineHeight: '24px',
                letterSpacing: '0',
                textAlign: 'center'
            }
        }),
        responsive: 'standard',
        print: false,
        download: false,
        viewColumns: false,
        tableLayout: 'fixed',
        customTableBodyWidth: '700px',
        tableBodyHeight: '500px',
        selectableRowsHideCheckboxes: true,
        customToolbar: HeaderElements
    }

    return (
        <>
            <TableHeading name={'Students'} />
            {loading ? (
                <div> ADDLoader</div>
            ) : (
                <>
                    {userData ? (
                        <MUIDataTable data={students} columns={columns} options={options} />
                    ) : (
                        <MUIDataTable data={[]} columns={columns} options={options} />
                    )}
                </>
            )}
        </>
    )
}

export default StudentsPage
