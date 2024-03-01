import "./groupProfile.css";
import Sidebar from "../../components/Sidebar/sidebar";
// import Footer from "../../components/Footer/footer";
import Avatar from '@mui/material/Avatar';
import { useState, useEffect } from "react";
import axios from 'axios'

const GroupProfile = () => {
  const facultyDetail = JSON.parse(localStorage.getItem("isStudent")).faculty;
  const batch = JSON.parse(localStorage.getItem("isStudent")).student?.batch;
  const token = JSON.parse(localStorage.getItem("isStudent")).token;
  const [students, setStudents] = useState([]);

  // const student = [
  //   { id: "21ITUOS001", name: "ariya", email: "riyajivani@gmail.com" },
  //   { id: "21ITUOS002", name: "briya", email: "riyajivani@gmail.com" },
  //   { id: "21ITUOS003", name: "criya", email: "riyajivani@gmail.com" },
  //   { id: "21ITUOS004", name: "driya", email: "riyajivani@gmail.com" },
  //   { id: "21ITUOS005", name: "eriya", email: "riyajivani@gmail.com" },
  //   { id: "21ITUOS006", name: "friya", email: "riyajivani@gmail.com" },
  //   { id: "21ITUOS007", name: "griya", email: "riyajivani@gmail.com" },
  //   { id: "21ITUOS008", name: "hriya", email: "riyajivani@gmail.com" },
  //   { id: "21ITUOS009", name: "jriya", email: "riyajivani@gmail.com" },
  //   { id: "21ITUOS010", name: "rriya", email: "riyajivani@gmail.com" },
  // ];

  const fetchData = async () => {
    try {
      const res = await axios.post("http://localhost:3000/student/getstudentsbybatch",
        { batch: batch },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        }
      );
      if (res.data.success === true) {
        setStudents(res.data.students);
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      <div className="group-profile-container">
        <Sidebar />

        <div className="group-profile-body">
          <h1>your batch information</h1>

          <div className="grp-card">
            {/* <img className="faculty-img" src={facultyImg}></img> */}
            <div className="faculty-img">
              <p style={{color:'white',fontSize:'60px'}}>R</p>
            </div>

            <div className="faculty-detail">
              <p>Faculty Name: {facultyDetail?.name}</p>
              <p>Email: {facultyDetail?.email}</p>
              <p>Batch: {batch}</p>
            </div>
          </div>

          {students && students.map((studentInfo, index) => (
            <div key={index} className="student-card">
                
              <div className='sub-card-text'>
                <Avatar sx={{ bgcolor: 'orange' }} alt={studentInfo.email} src={studentInfo.email[0]} />
                <h2 style={{ color: 'rgba(0,0,0,0.4)' }}>{studentInfo.id}</h2>
              </div>

                <div style={{display:'flex',flexDirection:'column'}}>
                {studentInfo.email ? <p style={{ margin: '0' }}>email: {studentInfo.email}</p> : <p>student has not signed in yet.</p>}
                {studentInfo.name && <p style={{ margin: '0' }}>name: {studentInfo.name}</p>}
               </div>
              
            </div>
          ))}
        </div>

        {/* <Footer /> */}
      </div>
    </>
  );
};

export default GroupProfile;
