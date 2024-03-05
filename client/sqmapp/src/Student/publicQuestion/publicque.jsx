import './publicque.css';
import Sidebar from '../../components/Sidebar/sidebar'
// import Footer from '../../components/Footer/footer'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import AccordionActions from '@mui/material/AccordionActions';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import AvatarGroup from '@mui/material/AvatarGroup';
import { useEffect, useState,useRef } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';

const PublicQuestion = () => {

     const role = JSON.parse(localStorage.getItem("isStudent"))?.role;
     const [questions,setQuestions] = useState([]);
     const [respond, setRespond] = useState(false);
     const [answer, setAnswer] = useState('');
     const [comment, setComment] = useState([]);
     const selectedQue = localStorage.getItem("searchedQue");
     const ref = useRef();
     const [filteredQuestions, setFilteredQuestions] = useState([]);
     const [expandedQuestionId, setExpandedQuestionId] = useState(null);

     // const filteredQuestions = selectedQue!==null
     //      && questions.filter(question => question.query.includes(selectedQue));

     useEffect(() => {
          if (selectedQue !== null) {
               setFilteredQuestions(questions.filter(question => question.query.includes(selectedQue)))
          } else {
               setFilteredQuestions(questions);
          }
     }, [selectedQue, questions])


     const handleSend = async (e, qid, sid) => {
          if (e.key === 'Enter' && answer) {
               try {
                    const res = await axios.post("http://localhost:3000/student/comment",
                         { qid: qid, sid: sid, comment: answer },
                         {
                              headers: {
                                   "Content-Type": "application/json",
                              }
                         }
                    );
                    console.log(res);
                    toast("comment added");
                    setAnswer('');
               } catch (e) {
                    console.log(e);
               }
          }
     }
     

     useEffect(() => {

          const fetchPublicQue = async () => {
               try {
                    const res = await axios.get("http://localhost:3000/student/publicquery",
                         {
                              headers: {
                                   "Content-Type": "application/json"
                                   // "Authorization": `Bearer ${token}`
                              },
                         }
                    );
                    console.log(res.data.query);
                    setQuestions(res.data.query);
               } catch (e) {
                    console.log(e);
               }
          }

          fetchPublicQue();
     }, [])

     const fetchComment = async (id) => {
          console.log(id)
          try {
               const res = await axios.post("http://localhost:3000/student/comments",
                    { qid: id },
                    {
                         headers: {
                              "Content-Type": "application/json"
                              // "Authorization": `Bearer ${token}`
                         },
                    }
               );
               console.log(res.data);
               setComment(res.data.comment);
          } catch (e) {
               console.log(e);
          }
     }

     const handleAccordionChange = (questionId) => {
          if (questionId === expandedQuestionId) {
               // Collapse the question
               setExpandedQuestionId(null);
               setComment([]); // Clear comments when collapsing
          } else {
               // Expand the question
               setExpandedQuestionId(questionId);
               fetchComment(questionId);
          }
     }


     return (
          <>
               <div className='publicque-container'>
               <Sidebar />

               <div className='publicque-body'>
                         
                    <h1>Public Question</h1>

                         {
                              filteredQuestions.map((question, index) => {
                                   let { _id, query, solution, status, student } = question;
                                   return (
                                        <div key={index} style={{ marginBottom: '10px' }}>
                                             <Accordion>
                                                  <AccordionSummary
                                                       expandIcon={<ArrowDropDownSharpIcon />}
                                                       aria-controls="panel3-content">
                                                       <p>{query}</p>
                                                  </AccordionSummary>

                                                  <AccordionDetails className='que-accordian-detail'>

                                                       {status === "Solved" &&
                                                            <p>
                                                                 <b style={{ marginRight: '20px', borderBottom: '2px solid black' }}>Faculty Answer:</b>
                                                                 {solution}
                                                            </p>
                                                       }

                                                       <Accordion className='sub-accordian' id='sub-accordian' expanded={_id === expandedQuestionId} onChange={() => handleAccordionChange(_id)}>

                                                            <AccordionSummary
                                                                 className='sub-summary'
                                                                 aria-controls="panel3-content"
                                                                 expandIcon={<ArrowDropDownSharpIcon />}
                                                                 id="panel3-header">
                                                                 Student Answers
                                                            </AccordionSummary>

                                                            <AccordionDetails className='sub-detail'>

                                                                 <AvatarGroup total={comment.length} style={{ right: '0' }}>
                                                                      {comment && comment.map((cmt, index) => {
                                                                           return (<Avatar key={index} sx={{ bgcolor: 'purple' }} alt={cmt.student.name} src="/static/images/avatar/1.jpg" />)
                                                                      })}
                                                                 </AvatarGroup>

                                                                 {comment && comment.map((cmt, index) => {
                                                                      const { Comment, student } = cmt;
                                                                      return (<div className='sub-card' key={index}>
                                                                           <div className='sub-card-text'>
                                                                                <Avatar sx={{ bgcolor: 'pink' }} alt={student.name} src="/static/images/avatar/1.jpg" />
                                                                                <h4>{student.name}</h4>
                                                                           </div>
                                                                           <p >{Comment}</p>
                                                                      </div>)
                                                                 })}
                                                            </AccordionDetails>

                                                       </Accordion>

                                                  </AccordionDetails>

                                                  {role === 'student' && <div style={{ display: 'flex', flexDirection: 'column' }}>

                                                       {respond === true &&
                                                            <input type='text'
                                                            placeholder='submit your answer'
                                                            ref={ref}
                                                            name='answer'
                                                            value={answer}
                                                            onChange={(e) => { setAnswer(e.target.value); console.log(answer) }}
                                                            onKeyDown={(e) => handleSend(e, _id, student.id)}
                                                                 className='comment-text' />}

                                                       <AccordionActions>
                                                            <Button onClick={() => { setRespond(!respond) }} style={{ color: '#7fad9e' }}>Respond</Button>
                                                       </AccordionActions>
                                                  </div>}

                                             </Accordion>
                                        </div>
                                   )
                              }
                              )
                         }


               </div>

               {/* <Footer/> */}
               </div>
               
          </>
     )
}

export default PublicQuestion