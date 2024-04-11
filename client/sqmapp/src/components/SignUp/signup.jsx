import "./signup.css";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../../assets/vector.png";

const SignUp = () => {
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [data, setData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    console.log(data);
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let url;
      {
        role === "student"
          ? (url = "http://localhost:3000/student/createstudent")
          : (url = "http://localhost:3000/faculty/createfaculty");
      }

      const res = await axios.put(url, data);
      console.log(res.data.message);
      navigate("../login");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="signup-body">
      <div className="signup-container">
        <div className="signup-form-container">
          <div className="signup-left">
          <img src={loginImg} style={{ width: "300px" }}></img>
            <h1>Welcome Back!</h1>
            <Link to="/login">
              <button type="button" className="signup-white-btn">
                {" "}
                Sign In
              </button>
            </Link>
          </div>
          <div className="signup-right">
            <form className="r-form-container" onSubmit={handleSubmit}>
              <h1>Create Account</h1>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="signup-select"
                required
              >
                <option disabled={true} value="">
                  Select Role
                </option>
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
              </select>

              <input
                type="text"
                placeholder="Enter id"
                name="id"
                value={data.id}
                onChange={handleChange}
                required
                className="signup-input"
              ></input>

              <input
                type="text"
                placeholder="Enter Name"
                name="name"
                value={data.name}
                onChange={handleChange}
                required
                className="signup-input"
              ></input>

              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                value={data.email}
                onChange={handleChange}
                required
                className="signup-input"
              ></input>
              
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                value={data.password}
                onChange={handleChange}
                required
                className="signup-input"
              ></input>

              {error && <div className="error_msg">{error}</div>}
              <button type="submit" className="signup-green-btn">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
