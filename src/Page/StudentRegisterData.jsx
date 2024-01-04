import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { MdMarkEmailRead } from 'react-icons/md'
import { GrUpdate } from 'react-icons/gr'
import { MdDeleteForever } from 'react-icons/md'
import Swal from 'sweetalert2'
const StudentRegisterData = () => {
    const navigate = useNavigate()
    const [students, setStudents] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const studentsPerPage = 5

    useEffect(() => {
        // Fetch initial data
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const result = await axios.get('/haha')
            setStudents(result.data)
        } catch (err) {
            console.log(err)
        }
    }

    const DeleteData = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // User clicked "Yes," proceed with deletion
                axios
                    .delete(`/deleteStudent/${id}`)
                    .then((response) => {
                        console.log(response)
                        window.location.reload()
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            }
        })
    }

    const indexOfLastStudent = currentPage * studentsPerPage
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage
    const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent)

    const nextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1)
    }

    const prevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1)
    }

    return (
        <div>
            <div className="title2">Students Data</div>
            <table className="tableData">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Phone No</th>
                        <th>Cnic No</th>
                        <th>Send Password</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {currentStudents.map((student, index) => (
                        <tr key={index}>
                            <td>{student.name}</td>
                            <td>{student.department}</td>
                            <td>{student.email}</td>
                            <td>{student.gender}</td>
                            <td>{student.phone}</td>
                            <td>{student.cnic}</td>
                            <td>
                                <button>
                                    <Link to={`/admin/admin/sendEmail/${student._id}`} style={{ color: '#00073D' }}>
                                        <MdMarkEmailRead style={{ width: '50px', height: '40px' }} />
                                    </Link>
                                </button>
                            </td>
                            <td>
                                <Link to={`/admin/admin/update_Student/${student._id}`}>
                                    <button style={{ color: '#00073D' }}>
                                        <GrUpdate style={{ width: '50px', height: '40px' }} />
                                    </button>
                                </Link>
                            </td>
                            <td>
                                <button onClick={(e) => DeleteData(student._id)}>
                                    <Link style={{ color: 'red', textDecoration: 'none' }}>
                                        <MdDeleteForever style={{ width: '50px', height: '40px' }} />
                                    </Link>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination" style={buttonContainerStyle}>
                <button onClick={prevPage} disabled={currentPage === 1} style={buttonStyle}>
                    Prev
                </button>
                <span style={spanStyle}>{currentPage}</span>
                <button onClick={nextPage} disabled={indexOfLastStudent >= students.length} style={buttonStyle}>
                    Next
                </button>
            </div>
        </div>
    )
}
const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'flex-end' // Adjusted to align items to the end (right side)
}

const buttonStyle = {
    width: '40px',
    height: '30px',
    backgroundColor: '#00073D',
    color: 'white',
    margin: '5px'
}

const spanStyle = {
    margin: '0 10px'
}

export default StudentRegisterData
