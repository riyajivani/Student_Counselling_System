import'./delete.css'
import Navbar from '../../components/Navigation/navbar'
import { useState } from 'react';
import axios from "axios";

const DeleteOne = () => {

  const [role, setRole] = useState("");
  const [data, setData] = useState({
    id: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleDelete = async (e) => {

    e.preventDefault();

    try {
        let url;
        let res;
        if (role === "student") 
        {
          url = "http://localhost:3000/admin/deletestudent";

          res = await axios.delete(url, {
            data: { id: data.id },
            headers: {
              "Content-Type": "application/json",
            },
          });

          console.log(res.data);
          window.alert("successfully delete student");
        }   
        else if (role === "faculty") 
        {
          url = "http://localhost:3000/admin/deletefaculty";

          res = await axios.delete(url, {
            data: { id: data.id },
            headers: {
              "Content-Type": "application/json",
            },
          });

          console.log(res.data);
          window.alert("successfully delete faculty");
        }

    } catch (error) {
        console.log(error);
    }

  }

  return (
     <div className='delete-container'>
      <Navbar/>

        <div className='delete-body'>        
          <h1>delete members</h1>

          <select value={role} onChange={(e) => setRole(e.target.value)} className="signup-select" required>
          <option disabled={true} value="">Select Role</option>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
        </select>

        <input type="text" placeholder="Enter id" name="id" value={data.id} onChange={handleChange} required className="signup-input"/>

        <button onClick={handleDelete} className="signup-green-btn" style={{border:"2px solid black", fontSize:"20px"}}>
          delete
        </button>
        </div>
     </div>
  )
}

export default DeleteOne