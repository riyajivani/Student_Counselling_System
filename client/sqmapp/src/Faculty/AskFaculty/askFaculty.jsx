import Sidebar from '../../components/Sidebar/sidebar'
// import Footer from '../../components/Footer/footer'
import './askFaculty.css'
import axios from 'axios'
import { useEffect, useState } from 'react'

const AskFaculty = () => {

  const token = JSON.parse(localStorage.getItem("isFaculty")).token;
  const fid = JSON.parse(localStorage.getItem("isFaculty")).id;
  const [questions, setQuestions] = useState([]);

  const handleRemove = async (id) => {
    try {
      const res = await axios.put("http://localhost:3000/faculty/removesharequery",
        { qid: id, fid: fid },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          }
        }
      );
      console.log(res);
      setQuestions(prevQuestions => prevQuestions.filter(que => que._id !== id));
    } catch (error) {
      console.error("Error removing question:", error);
    }
  }

  const sharedQuery = async () => {
    const res = await axios.post("http://localhost:3000/faculty/sharedquery",
      { fid: fid },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      }
    );
    console.log(res);
    setQuestions(res.data.query);
  }

  useEffect(() => { sharedQuery() }, [])

  return (
    <div className='askfaculty-container'>
      <Sidebar />

      <div className='askfaculty-body'>

        <h1>Asked to another Faculty</h1>

        {questions
          ? questions.map((que, index) => {
            const { _id, query, status, faculty, solution } = que;

          return (
            <div key={index} >
              <div style={{ borderBottom: '1px solid black', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3><b>({index + 1}) {query}</b></h3>
                  <p><b>To:</b> {faculty.name}</p>
                  <p>{status}</p>
                  {status === 'Solved' && <p>Answer: {solution}</p>}
                </div>
                {status !== 'Solved' && <button className='remove-btn' onClick={() => handleRemove(_id)}>remove</button>}
              </div>
            </div>
          );
          })
          : <h2 style={{ textAlign: 'center', color: 'red', marginTop: '10px' }}>you have not shared any query yet...</h2>
        }

      </div>

      {/* <Footer /> */}
    </div>
  )
}

export default AskFaculty