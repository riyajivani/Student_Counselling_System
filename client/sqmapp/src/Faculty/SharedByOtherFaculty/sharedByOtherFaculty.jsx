import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/sidebar'
// import Footer from '../../components/Footer/footer'
import './sharedByOtherFaculty.css'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import AccordionActions from '@mui/material/AccordionActions';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify'
import axios from 'axios'

const SharedByOtherFaculty = () => {

  const [questions, setQuestions] = useState([])
  const token = JSON.parse(localStorage.getItem("isFaculty")).token;
  const fid = JSON.parse(localStorage.getItem("isFaculty")).id;
  const [answer, setAnswer] = useState('');

  const sharedQuery = async () => {
    const res = await axios.post("http://localhost:3000/faculty/getsharedquery",
      { fid: fid },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      }
    );
    console.log(res);
    console.log(res);
    setQuestions(res.data);
  }

  useEffect(() => { sharedQuery() }, [])

  const handleSharedSolve = async (id) => {
    console.log(id, answer);
    const res = await axios.put("http://localhost:3000/faculty/solvesharedquery",
      { fid: fid, qid: id, solution: answer },
      {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    );
    console.log(res);
    setAnswer('');
    toast('answer sent successfully');
  }

  return (
    <div className='sby-container'>
      <Sidebar />

      <div className='sby-body'>

        <h1>Shared by other faculties</h1>

        {Array.isArray(questions)
          ? questions.map((question, index) => {
          let { id, query } = question;

          return (
            <div key={index} style={{ marginBottom: '10px' }}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ArrowDropDownSharpIcon />}
                  aria-controls="panel3-content">
                  <p>{query}</p>
                </AccordionSummary>

                <AccordionDetails className='que-accordian-detail'>

                  <div style={{ display: 'flex', flexDirection: 'column' }}>

                    <input type='text'
                      placeholder='submit your answer'
                      value={answer}
                      onChange={(e) => { setAnswer(e.target.value); }}
                      className='comment-text' />

                    <AccordionActions>
                      <Button onClick={() => handleSharedSolve(id)} style={{ color: '#7fad9e' }}>Respond</Button>
                    </AccordionActions>
                  </div>

                </AccordionDetails>

              </Accordion>
            </div>
          );


          })
          : <h2 style={{ textAlign: 'center', color: 'red', marginTop: '10px' }}>no questions are shared to you yet...</h2>
        }

      </div>

      {/* <Footer /> */}
    </div>
  )
}

export default SharedByOtherFaculty