import React, { useState, useEffect, useContext } from 'react' // ,{ useState }

import MUIDataTable from 'mui-datatables'
import Typography from '@mui/material/Typography'

import { useNavigate } from 'react-router'

import { UserContext } from '../context/User'

import { TableHeading } from '../components/tableHeading'
import { toast } from 'react-toastify'
import axios from 'axios'

const CommentsPage = () => {
    const { user, setUser } = useContext(UserContext)
    const [comments, setComments] = useState([])

    // const filteredList = mockData.filter((item) => item.department === user.department)

    const [userData, setUserData] = useState([])
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchPdfContent = async () => {
            try {
                setLoading(true) // Set loading to true before the API call

                const response = await axios.get(`http://localhost:5000/api/pdf/${user.pdf}`)
                console.log('res', response)

                // Update comments only if the API call is successful
                setComments(response.data.comments)
            } catch (error) {
                console.error('Error fetching PDF:', error)
                toast.error('Failed to fetch PDF content')
            } finally {
                setLoading(false) // Set loading to false regardless of the API call result
            }
        }

        if (user?.pdf) {
            fetchPdfContent()
        }
    }, [user])

    console.log('Comments', comments)

    const columns = [
        // {
        //     name: 'projectName',
        //     label: 'Project Name',
        //     options: {
        //         sort: false,
        //         filter: false
        //     }
        // },

        {
            name: 'timestamp',
            label: 'Comment Date',
            options: {
                sort: false,
                customBodyRender: (value) => {
                    const truncatedValue = value.substring(0, 10)

                    return truncatedValue
                }
            }
        },

        {
            name: 'text',
            label: 'Comment',
            options: {
                sort: false,
                customBodyRender: (value) => {
                    const truncatedValue = value.substring(0, 50)
                    return truncatedValue.length < value.length ? truncatedValue + '...' : truncatedValue
                }
            }
        },

        {
            name: 'text',
            // name: 'ViewProfile',
            label: 'View All Comments',

            options: {
                sort: false,
                filter: false,
                customBodyRenderLite: (dataIndex, value) => {
                    const statusStyle = {
                        padding: '6px 4px',
                        width: '100px',
                        background: '#eeeeee',
                        color: '#333333',
                        borderRadius: '4px',
                        textAlign: 'center'
                    }
                    const isAvailable = true
                    if (isAvailable) {
                        return (
                            <Typography
                                className="details-text"
                                onClick={() => navigate('/view-comments')}
                                sx={{ cursor: 'pointer', fontFamily: 'Outfit', ...statusStyle }}
                            >
                                Select
                            </Typography>
                        )
                    }
                }
            }
        },
        {
            name: 'text',
            // name: 'ViewProfile',
            label: 'Update File',

            options: {
                sort: false,
                filter: false,
                customBodyRenderLite: (dataIndex, value) => {
                    const statusStyle = {
                        padding: '6px 4px',
                        width: '100px',
                        background: '#eeeeee',
                        color: '#333333',
                        borderRadius: '4px',
                        textAlign: 'center'
                    }
                    const isAvailable = true
                    if (isAvailable) {
                        return (
                            <Typography
                                className="details-text"
                                onClick={() => navigate('/proposal', { state: { update: 'Update' } })}
                                sx={{ cursor: 'pointer', fontFamily: 'Outfit', ...statusStyle }}
                            >
                                Select
                            </Typography>
                        )
                    }
                }
            }
        }
    ]

    const HeaderElements = () => {}

    const options = {
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
        customTableBodyWidth: '800px',
        tableBodyHeight: '500px',
        selectableRowsHideCheckboxes: true,
        customToolbar: HeaderElements
    }

    return (
        <>
            <TableHeading name={'Comments'} />
            {loading ? (
                // <div>i am loading</div>
                <div>Add Loader</div>
            ) : (
                <>
                    {comments.length > 0 ? (
                        <MUIDataTable
                            // title={'Users list'}
                            data={comments}
                            columns={columns}
                            options={options}
                        />
                    ) : (
                        <MUIDataTable
                            // title={'Users list'}
                            data={[]}
                            columns={columns}
                            options={options}
                        />
                    )}
                </>
            )}
        </>
    )
}

export default CommentsPage
