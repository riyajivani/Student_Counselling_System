import './login.css';
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import loginImg from '../../assets/login.png';


const Login = () =>
{
     const [role, setRole] = useState("");
     const [error, setError] = useState("");
     let navigate = useNavigate();
     
     const [data, setData] = useState({
          id: "",
          email:"",
          password:""
     })

     const handleChange = (e) => {
          console.log(data)
          setData({...data,[e.target.name]:e.target.value})
     }

     const handleSubmit = async (e)=>{
          e.preventDefault()
          try {
               let url;
               let res;

               //console.log(data.id , data.password)
               if (role === "student")
               {
                    url = "http://localhost:3000/student/login"
                    
                    res = await fetch(url, {
                         method: "POST",
                         headers: {
                           "Content-Type": "application/json"   
                         },
                         body : JSON.stringify({id : data.id, password : data.password})
                    })
                    res = await res.json()
                    
                    if (res.success === true) {
                         localStorage.setItem("student",res)
                         navigate("../askmentor")
                    }
                    else {
                         alert(res.message)
                    }
                    
               }       
               else if (role === "faculty")
               {
                    url = "http://localhost:3000/faculty/login"
                    res = await axios.post(url, {
                         id: data.id,
                         password:data.password
                    })
               }           
               else if (role === "admin") {
                    url = "http://localhost:3000/admin/login"
                    res = await axios.post(url,
                         {
                              email: data.email,
                              password: data.password
                    })
               }

               console.log(res)
              
               
          }catch(error){
               if(error.response && error.response.status >=400 && error.response.status <=500){
                    setError(error.response.data.message)
               }
          }
     }

     return(
          <div className="login-body">
               <div className='login-container'>
                    <div className='login-form-container'>
                         <div className='login-left'>
                         <h1>Login to your Account</h1>
                         <form className='l-form-container' onSubmit={handleSubmit}>
                                   <select value={role} onChange={(e) => setRole(e.target.value)} className='login-select' required>
                                        <option disabled={true} value="">Select Role</option>
                                        <option value="student">Student</option>
                                        <option value="faculty">Faculty</option>
                                        <option value="admin">Admin</option>
                                   </select>
                                   
                                   {role === "admin"
                                   ?<input
                                        type="email" 
                                        placeholder='Enter Email'
                                        name="email"
                                        value={data.email}
                                        onChange={handleChange}
                                        required
                                        className='login-input'>
                                   </input>
                                   
                                   : <input
                                        type="text" 
                                        placeholder='Enter Id'
                                        name="id"
                                        value={data.id}
                                        onChange={handleChange}
                                        required
                                        className='login-input'>
                                   </input>}

                                   <input
                                        type="password" 
                                        placeholder='Enter Password'
                                        name="password"
                                        value={data.password}
                                        onChange={handleChange}
                                        required
                                        className='login-input'>
                                   </input>
               
                                   {error && <div className='error_msg'>{error}</div>} 

                                   <button type='submit' className='login-green-btn'>
                                        Sign In 
                                   </button>
                              </form>
                         </div>
                         <div className='login-right'>
                              <img src={loginImg} style={{width:'200px'}}></img>
                              <h1>New Here!?</h1>
                                   <Link to="/signup">
                                        <button type='button' className='login-white-btn'> Sign Up</button>
                                   </Link>
                              
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default Login