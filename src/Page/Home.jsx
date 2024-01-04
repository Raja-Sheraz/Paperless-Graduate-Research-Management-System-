import {React,useContext} from "react";
import "./Home.css";
import Video1 from "../Assets/background.mp4";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "../context/User";

export default function Home() {
  const navigate = useNavigate();
  const {setUser}=useContext(UserContext)
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const LoginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;

    try {
      if (email === "umarali0311@gmail.com" && password === "Umar123") {
        // If the provided credentials match, render dashboard2
        navigate("/admin/admin/studentRegisterData");
        Swal.fire({
          icon: "success",
          title: "Login  Successfully",
          text: "Welcome! Muhammad Umar",
          showConfirmButton: false,
          timer: 3000, // Adjust the duration the success message stays visible (in milliseconds)
        });
      } else {
        // Otherwise, proceed with the existing logic
        const response = await axios.post("/login", {
          email,
          password,
        });

        if (response.data.error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: response.data.error, // Assuming response is the API response object
          });
        } else {
          setData({});
          setUser(response.data);
          navigate("/dashboard");
          Swal.fire({
            icon: "success",
            title: "Login  Successfully",
            text: "Welcome!",
            showConfirmButton: false,
            timer: 2000, // Adjust the duration the success message stays visible (in milliseconds)
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
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
              <h1 className="log">Login</h1>
              <div className="innerForm">
                <div className="inputEmail">
                  <label>Username/Email</label>
                  <br></br>
                  <input
                    type="email"
                    placeholder="Email"
                    value={data.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
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
                <div className="inputEmail">
                  <Link
                    to="/studentRegistration"
                    style={{
                      fontSize: "17px",
                      color: "white",
                      textDecoration: "underline",
                    }}
                  >
                    student registration click here to register
                  </Link>
                  <br></br>
                  <Link
                    to="/teacherRegistration"
                    style={{
                      fontSize: "17px",
                      color: "white",
                      textDecoration: "underline",
                    }}
                  >
                    Teacher Registration click here to register
                  </Link>
                  <br></br>
                  <br></br>
                  <div className="fmbtn">
                    <button className="log">
                      <Link
                        to="/register"
                        style={{ fontSize: "25px", color: "white" }}
                      >
                        Others Login
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
