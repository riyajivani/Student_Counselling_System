import './login.css';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import loginImg from '../../assets/login.png';


const Login = () =>
{
     const [role, setRole] = useState("");
     const [error, setError] = useState("");
     
     const [data, setData] = useState({
          sid:"",
          password:"",
     })

     const handleChange = (e) =>{
          setData({...data,[e.target.name]:e.target.value})
     }

     const handleSubmit = async (e)=>{
          e.preventDefault()
          try{
               // const url = "";
               // const {data:res} = await axios.post(url,data)
               // localStorage.setItem("token",res.data)
               window.location="/"
               // console.log(res.message)

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
                                        <option value="faculty">Admin</option>
                                   </select>
                                   
                                   <input
                                        type="text" 
                                        placeholder='Enter Id'
                                        name="id"
                                        value={data.sid}
                                        onChange={handleChange}
                                        required
                                        className='login-input'>
                                   </input>
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