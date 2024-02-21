import './askedQue.css'
import Sidebar from '../../components/Sidebar/sidebar'
import Footer from '../../components/Footer/footer'
import { useEffect } from 'react'
import axios from 'axios'

const AskedQue = () => {

  const fid = JSON.parse(localStorage.getItem("isFaculty")).id;

  const sendData = async () => {
      let res = await axios.post(
        "http://localhost:3000/faculty/getquery", 
        {fid : fid},
        {
          headers:{
            "Content-Type": "application/json",
          },
        }
      );
    console.log(res.data);
};
  
useEffect(() => {
   sendData();
},[])
 
  return (
     <div className='askedque-container'>
      <Sidebar />

      <div className='askedque-body'>          
        <h1>asked question</h1>
        
      </div>

     <Footer />
     </div>
  );
}

export default AskedQue