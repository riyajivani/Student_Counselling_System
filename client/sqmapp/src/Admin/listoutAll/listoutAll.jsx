import './listoutAll.css'
import Navbar from '../../components/Navigation/navbar'
import { useEffect, useState } from 'react';
import axios from 'axios'
const dburl = import.meta.env.PUBLIC_URL

const ListoutAll = () => {

  const [student,setStudent]=useState([]);
  const [faculty, setFaculty] = useState([]);
  const token = JSON.parse(localStorage.getItem("isAdmin"))?.token;

  const fetchData = async () => {
    try {
      let facultyUrl = `${dburl}/admin/getallfaculties`;
      let studentUrl = `${dburl}/admin/getallstudents`;
      const [studentResponse, facultyResponse] = await Promise.all([
        axios.get(studentUrl, { headers: { "Authorization": `Bearer ${token}` } }),
        axios.get(facultyUrl, { headers: { "Authorization": `Bearer ${token}` } }),
      ]);
      
      setStudent(studentResponse.data.student);
      setFaculty(facultyResponse.data.faculty);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  },[])

  return (
    <div className='listout-container'>
      <Navbar />
      
      <div className='listout-body'> 


        <h1>faculty details</h1>
                
                <div className="listout-grid">
                {faculty && faculty.map((data) => {
                    let { id, name, email, total_query} = data;
  
                  return(
                    <div className="listout-card" key={id}>
                      <h3 className='list-name'>{name}</h3>
                      <p>
                        <b>Id:</b> {id}
                      </p>
                      <h5>
                        <b>Email:</b> {email} <br /> <b>Total Query:</b> {total_query}
                      </h5>
                    </div>
                  );
  
                  })}
                </div>

              <h1>student details</h1>

              <div className="listout-grid">
                {student && student.map((data) => {
                  let { id, name, email, total_query} = data;

                return(
                  <div className="listout-card" key={id}>
                    <h3 className='list-name'>{name}</h3>
                    <p>
                      <b>Id:</b> {id}
                    </p>
                    <h5>
                      <b>Email:</b> {email} <br /> <b>Total Query:</b> {total_query}
                    </h5>
                  </div>
                );

                })}
        </div>
      </div>
    </div>
  )
}

export default ListoutAll