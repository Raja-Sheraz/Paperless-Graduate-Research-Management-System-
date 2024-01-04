import React from "react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Video1 from "../Assets/background.mp4";
export default function OthersLogin() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    role: "",
    email: "",
    password: "",
  });
  const LoginUser = async (e) => {
    e.preventDefault();
    const { role, email, password } = data;
    try {
      const { data } = await axios.post("/login1", {
        role,
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        if (role === "Supervisor") {
          navigate("/supervisor_dashboard");
          toast.success("Login Successfully.Welcome!");
        } else if (role === "ExternalExaminer") {
          navigate("/external_dashboard");
          toast.success("Login Successfully.Welcome!");
        } else if (role === "DAC") {
          navigate("/dac_dashboard");
        }else if(role==="CoordinateCommitte"){
          navigate("/coordinate_dashboard");
          toast.success("Login Successfully.Welcome!");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="headerPic">
      <div className="overlay">
        <h1 className="lg"> PGMS</h1>
      </div>
      <video autoPlay muted loop className="video-background">
        <source src={Video1} type="video/mp4" />
      </video>
      <div className="container">
        <form onSubmit={LoginUser}>
          <div>
          <h3 style={{textAlign:"center"}}>Supervisor/Coordinate Committe/<br></br> DAC/External Examiner</h3>
            <h1 className="log">Login</h1>
            <div className="innerForm">
              <div className="inputEmail">
                <label>Select Role:</label>
                <br />
                <select
                  name="role"
                  id="role"
                  value={data.role}
                  onChange={(e) => setData({ ...data, role: e.target.value })}
                  required
                >
                  <option value=""></option>
                  <option value="Supervisor">Supervisor</option>
                  <option value="CoordinateCommitte">
                    Coordinate Committe
                  </option>
                  <option value="DAC">DAC</option>
                  <option value="ExternalExaminer">External Examiner</option>
                </select>
              </div>
              <div className="inputEmail">
                <label>Username/Email</label>
                <br></br>
                <input
                  type="email"
                  placeholder="Email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  required
                />
                <br></br>
                <br></br>
              </div>
              <div className="inputEmail">
                <label>Password</label>
                <br></br>
                <input
                  type="password"
                  placeholder="password"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  required
                />
                <br></br>
                <br></br>
              </div>
              <div className="fmbtn">
                <button type="submit" className="log">Login</button>
                <br></br>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
