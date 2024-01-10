import './signup.css';
import { useState } from 'react';
import axios from 'axios';
import {Link,useNavigate} from 'react-router-dom';

const SignUp = () =>
{
     const [role, setRole] = useState("");
     const [error, setError] = useState("");
     const navigate = useNavigate();
     
     const [data, setData] = useState({
          name:"",
          email:"",
          password:"",
          semester:"",

     })

     const handleChange = (e) =>{
          setData({...data,[e.target.name]:e.target.value})
     }

     const handleSubmit = async (e)=>{
          e.preventDefault()
          try{
               // const url = "";
               // const {data:res} = await axios.post(url,data)
               navigate("../login")
               // console.log(res.message)

          }catch(error){
               if(error.response && error.response.status >=400 && error.response.status <=500){
                    setError(error.response.data.message)
               }
          }
     }

     return (
          <div className='signup-body'>
               <div className='signup-container'>
                    <div className='signup-form-container'>
                         <div className='signup-left'>
                              <h1>Welcome Back!</h1>
                              <Link to="/login">
                                   <button type='button' className='signup-white-btn'> Sign In</button>
                              </Link>
                         </div>
                         <div className='signup-right'>
                              <form className='r-form-container' onSubmit={handleSubmit}>
                                   <h1>Create Account</h1>
                                   <select value={role} onChange={(e) => setRole(e.target.value)} className='signup-select' required>
                                        <option disabled={true} value="">Select Role</option>
                                        <option value="student">Student</option>
                                        <option value="faculty">Faculty</option>
                                   </select>
                                   <input
                                        type="text" 
                                        placeholder='Enter Name'
                                        name="firstName"
                                        value={data.firstName}
                                        onChange={handleChange}
                                        required
                                        className='signup-input'>
                                   </input>
                                   <input
                                        type="email" 
                                        placeholder='Enter Email'
                                        name="email"
                                        value={data.email}
                                        onChange={handleChange}
                                        required
                                        className='signup-input'>
                                   </input>
                                   <input
                                        type="password" 
                                        placeholder='Enter Password'
                                        name="password"
                                        value={data.password}
                                        onChange={handleChange}
                                        required
                                        className='signup-input'>
                                   </input>

                                   {role=='student'?<input
                                        type="number" 
                                        placeholder='Enter Semester'
                                        name="semester"
                                        value={data.semester}
                                        onChange={handleChange}
                                        required
                                        className='signup-input'>
                                   </input>:<></>}

                                   {error && <div className='error_msg'>{error}</div>} 
                                   <button type='submit' className='signup-green-btn'>
                                        Sign Up 
                                   </button>
                              </form>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default SignUp