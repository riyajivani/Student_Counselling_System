import './groupProfile.css';
import Sidebar from '../../components/Sidebar/sidebar'
import Footer from '../../components/Footer/footer'
import facultyImg from '../../assets/profile.jpg' 
import { useEffect } from 'react';

const GroupProfile = () => {

     const student = [
          {id: '21ITUOS001', name: 'riya', email: 'riyajivani@gmail.com'},
          {id: '21ITUOS002', name: 'riya', email: 'riyajivani@gmail.com'},
          {id: '21ITUOS003', name: 'riya', email:'riyajivani@gmail.com'},
          {id: '21ITUOS004', name: 'riya', email:'riyajivani@gmail.com'},
          {id: '21ITUOS005', name: 'riya', email:'riyajivani@gmail.com'},
          {id: '21ITUOS006', name: 'riya', email:'riyajivani@gmail.com'},
          {id: '21ITUOS007', name: 'riya', email:'riyajivani@gmail.com'},
          {id: '21ITUOS008', name: 'riya', email:'riyajivani@gmail.com'},
          {id: '21ITUOS009', name: 'riya', email:'riyajivani@gmail.com'},
          {id: '21ITUOS010', name: 'riya', email:'riyajivani@gmail.com'},
     ]
     
     // const fetchData = () => {
     //      //code for check the appropriate faculty and fetch the batch parter
     //      window.alert('hello');
     // }

     // useEffect(() => {
     //      fetchData();   
     // },[])

     return (
          <>
               <div className='group-profile-container'>
               <Sidebar />

               <div className='group-profile-body'>
                         <h1>your batch information</h1>  
                         
                         <div className="grp-card">
                              <img className="faculty-img" src={facultyImg}></img>

                              <div className="faculty-detail">
                                   <p>Faculty Name: riya jivani</p>
                                   <p>Email: riya@gmail.com</p>
                                   <p>Batch: h3</p>  
                                    
                              </div>
                         </div>

                         <div className="student-detail">
                              <table className='student-table'>
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
                                        ))
                                        }
                                   </tbody>
                              </table>
                         </div>

               </div>

               <Footer />
               </div>
               
          </>
     )
}

export default GroupProfile