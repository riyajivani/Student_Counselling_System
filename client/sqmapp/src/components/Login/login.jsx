import "./login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../../assets/picture1.png";
import axios from "axios";

const Login = () => {
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const [data, setData] = useState({
    id: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let url;
      let res;

      if (role === "student") {
        url = "http://localhost:3000/student/login";

        res = await axios.post(
          url,
          {
            id: data.id,
            password: data.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(res.data);
        if (res.data.success === true) {
          navigate("../askmentor");

          const studentobj = {
            role,
            // isStudent: true,
            id: data.id,
            student: res.data.student,
            faculty: res.data.faculty,
            token: res.data.token,
          };

          localStorage.clear();
          localStorage.setItem("isStudent", JSON.stringify(studentobj));
        } else {
          setError(res.data.message);
        }
      } 
      else if (role === "faculty") {
        url = "http://localhost:3000/faculty/login";

        res = await axios.post(
          url,
          {
            id: data.id,
            password: data.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (res.data.success === true) {
          navigate("../askfaculty");

          const facultyobj = {
            role,
            // isFaculty: true,
            id: data.id,
            token: res.data.token,
            faculty: res.data.faculty
          };
          
          console.log(res.data);
          localStorage.clear();
          localStorage.setItem("isFaculty", JSON.stringify(facultyobj)); 
        } else {
          setError(res.data.message);
        }
      } 
      else if (role === "admin") {
        url = "http://localhost:3000/admin/login";

        res = await axios.post(
          url,
          {
            email: data.email,
            password: data.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (res.data.success === true) {
          navigate("../create");
          const adminobj = {
            role,
            // isAdmin: true,
            email: data.email,
            token: res.data.token,
          };

          console.log(res.data);
          localStorage.clear();
          localStorage.setItem("isAdmin", JSON.stringify(adminobj));
          
        } else {
          setError(res.data.message);
        }
      }
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
    <div className="login-body">
      <div className="login-container">
        <div className="login-form-container">
          <div className="login-left">
            <h1>Login to your Account</h1>
            <form className="l-form-container" onSubmit={handleSubmit}>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="login-select"
                required
              >
                <option disabled={true} value="">
                  Select Role
                </option>
                <option value="student">student</option>
                <option value="faculty">faculty</option>
                <option value="admin">admin</option>
              </select>

              {role === "admin" ? (
                <input
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  required
                  className="login-input"
                ></input>
              ) : (
                <input
                  type="text"
                  placeholder="Enter Id"
                  name="id"
                  value={data.id}
                  onChange={handleChange}
                  required
                  className="login-input"
                ></input>
              )}

              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                value={data.password}
                onChange={handleChange}
                required
                className="login-input"
              ></input>

              {error && <div className="error_msg">{error}</div>}

              <button type="submit" className="login-green-btn">
                Sign In
              </button>
            </form>
          </div>
          <div className="login-right">
            <img src={loginImg} style={{ width: "200px"}}></img>
            <h1>New Here!?</h1>
            <Link to="/signup">
              <button type="button" className="login-white-btn">
                {" "}
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
