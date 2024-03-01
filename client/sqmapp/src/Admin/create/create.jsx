import './create.css'
import Navbar from '../../components/Navigation/navbar'
import { useState } from 'react';
import axios from "axios";

const Create = () => {

  const [role, setRole] = useState("");
  const token = JSON.parse(localStorage.getItem("isAdmin"))?.token;
  const [data, setData] = useState({
    id: "",
    batch: "",
    semester: "",
  });

  const handleChange = (e) => {
    console.log(data);
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {

    e.preventDefault();

    try {
        let url;
        let res;
        if (role === "student") 
        {
          url = "http://localhost:3000/admin/createstudent";

          res = await axios.post(
            url,
            {
              id: data.id,
              batch: data.batch,
              semester:data.semester
            },
            {
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              },
            }
          );
          console.log(res.data);
          window.alert("success student");
        }   
        else if (role === "faculty") 
        {
          url = "http://localhost:3000/admin/createfaculty";

          res = await axios.post(
            url,
            {
              id: data.id,
            },
            {
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              },
            }
          );
          console.log(res.data);
          window.alert("success faculty");
        }

    } catch (error) {
        console.log(error);
    }

  }


  return (
     <div className='create-container'>
      <Navbar/>
      <div className='create-body'>
        <h1>add members</h1>

        <select value={role} onChange={(e) => setRole(e.target.value)} className="signup-select" required>
          <option disabled={true} value="">Select Role</option>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
        </select>

        <input type="text" placeholder="Enter id" name="id" value={data.id} onChange={handleChange} required className="signup-input"/>
        
        {role==="student"  &&
          <>
          <input type="text" placeholder="Enter batch" name="batch" value={data.batch} onChange={handleChange} required className="signup-input"/>
          <input type="text" placeholder="Enter semester" name="semester" value={data.semester} onChange={handleChange} required className="signup-input"/>
          </>
        }

        <button onClick={handleAdd} className="signup-green-btn" style={{border:"2px solid black", fontSize:"20px"}}>
          add
        </button>
        
      </div>
    </div>
  )
}

export default Create