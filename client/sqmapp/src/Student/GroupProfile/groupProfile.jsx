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
          <h1>Batch Information</h1>

          <div className="grp-card">
            {/* <img className="faculty-img" src={facultyImg}></img> */}
            <div className="faculty-img">
              {facultyDetail.image !== null
                ?
                <img src={facultyDetail.image} alt="mentor image" className="mentor-image" />
                :
                <p style={{ color: 'white', fontSize: '60px' }}>{facultyDetail?.name[0]}</p>
              }

            </div>

            <div className="faculty-detail">
              <p>Faculty Name: {facultyDetail?.name}</p>
              <p>Email: {facultyDetail?.email}</p>
              <p>Batch: {batch}</p>
            </div>
          </div>

          {students && students.map((studentInfo, index) => {
            if (studentInfo.name !== "") {
              return (
                <div key={index} className="student-card">
                  <div className='sub-card-text'>
                    <Avatar sx={{ bgcolor: '#14355b' }} alt={studentInfo.name} src={studentInfo.name[0]} />
                    <h2 style={{ color: '#14355b', fontWeight: '400' }}>{studentInfo.id}</h2>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', color: '#636363' }}>
                    <p style={{ margin: '0' }}>email: {studentInfo.email}</p>
                    <p style={{ margin: '0' }}>name: {studentInfo.name}</p>
                  </div>
                </div>
              )
            }
          })}

        </div>

        {/* <Footer /> */}
      </div>
    </>
  );
};

export default GroupProfile;
