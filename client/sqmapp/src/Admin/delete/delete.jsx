import'./delete.css'
import Navbar from '../../components/Navigation/navbar'
import { useState } from 'react';
import axios from "axios";
import {toast} from 'react-toastify'
const dburl = import.meta.env.PUBLIC_URL

const DeleteOne = () => {

  const token = JSON.parse(localStorage.getItem("isAdmin"))?.token;
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
          url = `${dburl}/admin/deletestudent`;

          res = await axios.delete(url, {
            data: { id: data.id },
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
          });

          console.log(res.data);
          toast("successfully delete student");
        }   
        else if (role === "faculty") 
        {
          url = `${dburl}/admin/deletefaculty`;

          res = await axios.delete(url, {
            data: { id: data.id },
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
          });

          console.log(res.data);
          toast("successfully delete faculty");
        }

    } catch (error) {
        console.log(error);
        toast(error.response.data.message)
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

        <button onClick={handleDelete} className="signup-white-btn">
          DELETE
        </button>
        </div>
     </div>
  )
}

export default DeleteOne