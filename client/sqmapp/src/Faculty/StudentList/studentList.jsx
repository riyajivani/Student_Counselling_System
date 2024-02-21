import Sidebar from '../../components/Sidebar/sidebar'
import Footer from '../../components/Footer/footer'
import './studentList.css'

const studentList = () => {
  const student = [
    { id: "21ITUOS001", name: "riya", email: "riyajivani@gmail.com" },
    { id: "21ITUOS002", name: "riya", email: "riyajivani@gmail.com" },
    { id: "21ITUOS003", name: "riya", email: "riyajivani@gmail.com" },
    { id: "21ITUOS004", name: "riya", email: "riyajivani@gmail.com" },
    { id: "21ITUOS005", name: "riya", email: "riyajivani@gmail.com" },
    { id: "21ITUOS006", name: "riya", email: "riyajivani@gmail.com" },
    { id: "21ITUOS007", name: "riya", email: "riyajivani@gmail.com" },
    { id: "21ITUOS008", name: "riya", email: "riyajivani@gmail.com" },
    { id: "21ITUOS009", name: "riya", email: "riyajivani@gmail.com" },
    { id: "21ITUOS010", name: "riya", email: "riyajivani@gmail.com" },
  ];
  return (
     <div className='studentlist-container'>
     <Sidebar />

     <div className='studentlist-body'>
               
     <h1>studentList</h1>

     <div className="student-detail">
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
          </div>
     </div>

     <Footer />
     </div>
  )
}

export default studentList
