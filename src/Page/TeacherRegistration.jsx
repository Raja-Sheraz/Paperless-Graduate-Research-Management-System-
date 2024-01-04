import { useState } from "react";
import axios from "axios";
// import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
const TeacherRegistration = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    cnic: "",
    phone: "",
    address: "",
    email: "",
    qualification: "",
    department: "",
    gender: "",
    password:"",
    role:""
  });
  const TeacherRegister = async (e) => {
    e.preventDefault();
    const{
      name,
      cnic,
      phone,
      address,
      email,
      qualification,
      department,
      gender,
      password,
      role,
    }
    =data;
    try {
      const { data } = await axios.post("/teacherRegister", {
       name,
       cnic,
       phone,
       address,
       email,
       qualification,
       department,
       gender,
       password,
       role,
      })
      if (data.error) {
        // toast.error(data.error);
        Swal.fire({
          icon:'error',
          title:'Error Register'
        })
      } else {
        setData(data);
        Swal.fire({
          icon: 'success',
          title: 'Register  Successfully',
          text: 'After Further Investigation You will receive email',
          showConfirmButton: false,
          timer: 2000, // Adjust the duration the success message stays visible (in milliseconds)
        });
        navigate('/login');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="contain">
      <div className="title1">Submit Your Personal Details</div>
      <div>
        <form onSubmit={TeacherRegister}>
          <div className="studentForm1">
            <div className="inputFields1">
              <label>Name:</label>
              <br />
              <input
                type="text"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                placeholder="Enter First Name"
                pattern="[A-Z a-z]+"
                title="Only characters are allowed"
                required
              />
              <br />
              <br />
            </div>
            <div className="inputFields1">
              <label>CNIC:</label>
              <br />
              <input
                type="text"
                value={data.cnic}
                onChange={(e) => setData({ ...data, cnic: e.target.value })}
                placeholder="e.g 1310110873533"
                pattern="\d{13}"
                title="CNIC must be 13 digits"
                required
              />
              <br />
              <br />
            </div>
            <div className="inputFields1">
              <label>Qualification:</label>
              <br></br>
              <select
                name="dept"
                id="dept"
                value={data.qualification}
                onChange={(e) =>
                  setData({ ...data, qualification: e.target.value })
                }
                required
              >
                <option value=""></option>
                <option value="Master">Master</option>
                <option value="PHD">PHD</option>
                <option value="Postdoctral">PostDoctral</option>
              </select>
            </div>
            <div className="inputFields1">
              <label>Departments:</label>
              <br />
              <select
                name="dept"
                id="dept"
                value={data.department}
                onChange={(e) =>
                  setData({ ...data, department: e.target.value })
                }
                required
              >
                <option value=""></option>
                <option value="CS">Computer Science</option>
                <option value="SE">Software Engineering</option>
                <option value="PHM">Pharmacy</option>
                <option value="CVE">Civil Engineering</option>
              </select>
            </div>

            <div className="inputFields1">
              <label>Phone No:</label>
              <br />
              <input
                type="text"
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                placeholder="+92311-------"
                pattern="03\d{9}"
                title="Phone number must be 11 digits starting with 03"
                required
              />
              <br />
              <br />
            </div>
            <div className="inputFields1">
              <label>Email:</label>
              <br />
              <input
                type="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                placeholder="Enter an Email"
                required
              />
              <br />
              <br />
            </div>
            <div className="inputFields1">
              <label>Address:</label>
              <br />
              <input
                type="text"
                value={data.address}
                onChange={(e) => setData({ ...data, address: e.target.value })}
                placeholder="e.g Orish Colony Nawasher"
                required
              />
              <br />
              <br />
            </div>
            <div className="radioStyle1">
              <label>Gender:</label>
              <br />
              <div>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={data.gender === "male"}
                  onChange={(e) => {
                    setData({ ...data, gender: e.target.value });
                  }}
                />
                <label htmlFor="male">Male</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={data.gender === "female"}
                  onChange={(e) => {
                    setData({ ...data, gender: e.target.value });
                  }}
                />
                <label htmlFor="female">Female</label>
              </div>
            </div>
          </div>
          <button className="formBtn1" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeacherRegistration;
