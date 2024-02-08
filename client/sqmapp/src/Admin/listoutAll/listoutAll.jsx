import './listoutAll.css'
import Navbar from '../../components/Navigation/navbar'
import { useEffect, useState } from 'react';
import MoonLoader from "react-spinners/MoonLoader";
import axios from 'axios'

const ListoutAll = () => {

  const [student,setStudent]=useState([]);
  const [faculty,setFaculty]=useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      let studentUrl = "http://localhost:3000/admin/getallstudents";
      let facultyUrl = "http://localhost:3000/admin/getallfaculties";

      const [studentResponse, facultyResponse] = await Promise.all([
        axios.get(studentUrl),
        axios.get(facultyUrl),
      ]);
      
      setStudent(studentResponse.data.student);
      setFaculty(facultyResponse.data.faculty);

      console.log(studentResponse.data.student);
      console.log(facultyResponse.data.faculty);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  },[])

  return (
    <div className='listout-container'>
      <Navbar />
      
      <div className='listout-body'> 

        {
          isLoading===true 
          ? <MoonLoader color="rgba(214, 54, 54, 1)" size={70} cssOverride={{margin: '0 auto'}}/>  

          : <>
              <h1>faculty details</h1>
                
                <div className="listout-grid">
                  { faculty.map((data) => {
                    let { id, name, email, total_query} = data;
  
                  return(
                    <div className="listout-card" key={id}>
                      <h3>{name}</h3>
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
                { student.map((data) => {
                  let { id, name, email, total_query} = data;

                return(
                  <div className="listout-card" key={id}>
                    <h3>{name}</h3>
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
            </>
        }

      </div>
    </div>
  )
}

export default ListoutAll