import { BsSearch } from 'react-icons/bs'
import { FaUserGraduate, FaUserTie, FaUsers, FaChalkboardTeacher } from 'react-icons/fa'

const AdminDashboard = () => {
    const studentClick = () => {
        alert('Student Div Click')
    }
    return (
        <>
            <div className="searchbar">
                <input type="text" placeholder="Search.." />
                <BsSearch className="search-icon" />
            </div>
            <div className="adminMain">
                <div onClick={studentClick} className="adminInner">
                    <FaUserGraduate
                        size="2em"
                        style={{
                            width: '150px',
                            height: '150px'
                        }}
                    />
                    <h1
                        style={{
                            fontSize: '30px',
                            fontWeight: 'bold',
                            color: 'white',
                            letterSpacing: '2px'
                        }}
                    >
                        Student
                    </h1>
                </div>
                <div className="adminInner">
                    <FaUserTie size="2em"
                     style={{
                      width: '150px',
                      height: '150px'
                  }}
                   />
                    <h1
                      style={{
                        fontSize: '30px',
                        fontWeight: 'bold',
                        color: 'white',
                        letterSpacing: '2px'
                    }}
                    >Supervisor</h1>
                </div>
                <div className="adminInner">
                    <FaUsers size="2em"
                    
                    style={{
                      width: '150px',
                      height: '150px'
                  }}
                  />
                    <h1
                      style={{
                        fontSize: '30px',
                        fontWeight: 'bold',
                        color: 'white',
                        letterSpacing: '2px'
                    }}
                    >Committee</h1>
                </div>
                <div className="adminInner">
                    <FaChalkboardTeacher size="2em" 
                    
                    style={{
                      width: '150px',
                      height: '150px'
                  }}
                  />
                    <h1
                      style={{
                        fontSize: '30px',
                        fontWeight: 'bold',
                        color: 'white',
                        letterSpacing: '2px'
                    }}
                    >DAC</h1>
                </div>
            </div>
        </>
    )
}

export default AdminDashboard
