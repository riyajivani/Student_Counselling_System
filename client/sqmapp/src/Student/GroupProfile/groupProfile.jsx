import "./groupProfile.css";
import Sidebar from "../../components/Sidebar/sidebar";
// import Footer from "../../components/Footer/footer";
import Avatar from '@mui/material/Avatar';
// import { useState } from "react";

const GroupProfile = () => {
  const student = [
    { id: "21ITUOS001", name: "ariya", email: "riyajivani@gmail.com" },
    { id: "21ITUOS002", name: "briya", email: "riyajivani@gmail.com" },
    { id: "21ITUOS003", name: "criya", email: "riyajivani@gmail.com" },
    { id: "21ITUOS004", name: "driya", email: "riyajivani@gmail.com" },
    { id: "21ITUOS005", name: "eriya", email: "riyajivani@gmail.com" },
    { id: "21ITUOS006", name: "friya", email: "riyajivani@gmail.com" },
    { id: "21ITUOS007", name: "griya", email: "riyajivani@gmail.com" },
    { id: "21ITUOS008", name: "hriya", email: "riyajivani@gmail.com" },
    { id: "21ITUOS009", name: "jriya", email: "riyajivani@gmail.com" },
    { id: "21ITUOS010", name: "rriya", email: "riyajivani@gmail.com" },
  ];

  // const fetchData = () => {
  //      //code for check the appropriate faculty and fetch the batch parter
  //      window.alert('hello');
  // }

  // useEffect(() => {
  //      fetchData();
  // },[])

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
              <p>Faculty Name: riya jivani</p>
              <p>Email: riya@gmail.com</p>
              <p>Batch: h3</p>
            </div>
          </div>

          {/* <div className="student-detail">
            <table className="student-table">
              <thead>
                <tr>
                  <th>id</th>
                  <th>name</th>
                  <th>email</th>
                </tr>
              </thead>

              <tbody>
                {student.map((studentInfo, index) => (
                  <tr key={index}>
                    <td>{studentInfo.id}</td>
                    <td>{studentInfo.name}</td>
                    <td>{studentInfo.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}
          {student.map((studentInfo, index) => (
            <div key={index} className="student-card">
                
              <div className='sub-card-text'>
                  <Avatar sx={{ bgcolor: 'orange' }} alt={studentInfo.name} src={studentInfo.name[0]}/>
                   <h4>{studentInfo.email}</h4>
              </div>

                <div style={{display:'flex',flexDirection:'column'}}>
                    <p style={{margin:'0'}}>id: {studentInfo.id}</p>
                    <p style={{margin:'0'}}>name: {studentInfo.name}</p>
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
