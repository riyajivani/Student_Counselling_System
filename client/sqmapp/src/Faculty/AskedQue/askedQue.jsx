import './askedQue.css'
import Sidebar from '../../components/Sidebar/sidebar'
// import Footer from '../../components/Footer/footer'
import { useEffect, useState } from 'react'
import axios from 'axios'

const AskedQue = () => {
  const [status,setStatus] = useState('');
  const [question,setQuestion] = useState([]);
  const fid = JSON.parse(localStorage.getItem("isFaculty")).id;
  const token = JSON.parse(localStorage.getItem("isFaculty")).token;

  const sendData = async () => {
      let res = await axios.post(
        "http://localhost:3000/faculty/getquery", 
        {fid : fid},
        {
          headers:{
            "Content-Type": "application/json",
            "Authorization":`Bearer ${token}`,
          },
        }
      );
    setQuestion(res.data.query);
};
  
useEffect(() => {
   sendData();
},[])

  const handleStatus = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    let res = await axios.post(
      "http://localhost:3000/faculty/querybystatus", 
      {fid : fid, status: newStatus},
      {
        headers:{
          "Content-Type": "application/json",
        },
      }
    );

    console.log(res.data.query);
    setQuestion(res.data.query);
}

useEffect(()=>{console.log(status)},[status])

  return (
    <div className='askedque-container'>
      <Sidebar />

      <div className='askedque-body'>          
        <h1>asked question</h1>

        <select onChange={handleStatus} value={status} className='askedque-select'>
          <option value="" disabled>select status</option>
          <option value="Solved">solved</option>
          <option value="Not solved">unsolved</option>
          {/* <option value="">Solved by you</option> */}
        </select>

        <div className="askedque-grid">
            {question.map((que) => {
              let {_id,query,mode,status,student} = que;
              return (
                <div className="askedque-card" key={_id}>
                  <h2>{query}</h2>
                    <h3>{status}{status==="Solved" && " ✅ "}</h3>
                    <h4>{mode}</h4>
                  <ul>
                    <li>Student ID: <b>{student.id}</b></li>
                    <li>Student Name: <b>{student.name}</b></li>
                    <li>Student Batch:<b>{student.batch}</b></li>
                  </ul>
                </div>
              );
            })}
        </div>
      </div>

    {/* <Footer/> */}
    </div>
  );
}

export default AskedQue