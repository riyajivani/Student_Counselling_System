import './publicque.css';
import Sidebar from '../../components/Sidebar/sidebar'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import AccordionActions from '@mui/material/AccordionActions';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useEffect, useState,useRef } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';
const dburl = import.meta.env.VITE_REACT_DBURL

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
     const [expandQueImageId, setExpandQueImageId] = useState(null);
     const [expandQuestionId, setExpandQuestionId] = useState(null);
     const [expandAnsImageId, setExpandAnsImageId] = useState(null);
     const [expandedAnswerId, setExpandedAnswerId] = useState(null);

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
                    const res = await axios.post(`${dburl}/student/comment`,
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
                    const res = await axios.get(`${dburl}/student/publicquery`,
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
               const res = await axios.post(`${dburl}/student/comments`,
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

     const containsImage = (query) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(query, 'text/html');
          const imageElements = doc.querySelectorAll('img');
          return imageElements.length > 0;
     };


     return (
          <>
               <div className='publicque-container'>
               <Sidebar />

               <div className='publicque-body'>
                         
                    <h1>Public Question</h1>

                         {
                              filteredQuestions.map((question, index) => {
                                   let { _id, query, status, student } = question;

                                   const words = query.split(" ");
                                   const shortenedQuery = words.length > 10 ? words.slice(0, 5).join(" ") + "..." : query;
                                   const isQueExpanded = _id === expandQuestionId;
                                   const isQueExpandedImage = _id === expandQueImageId;

                                   const ansWord = question.solution ? question.solution.split(" ") : [];
                                   const shortenedAns = ansWord.length > 10 ? ansWord.slice(0, 5).join(" ") + "..." : question.solution;
                                   const isAnsExpanded = _id === expandedAnswerId;
                                   const isAnsExpandedImage = _id === expandAnsImageId;

                                   return (
                                        <div key={index} style={{ marginBottom: '10px' }}>
                                             <Accordion style={{ boxShadow: 'none' }}>
                                                  <AccordionSummary
                                                       style={{ borderBottom: '2px solid #DBE2EF', color: '#3F72AF' }}
                                                       expandIcon={<ArrowDropDownSharpIcon style={{ color: '#3F72AF' }} />}
                                                       aria-controls="panel3-content">

                                                       {containsImage(query)

                                                            ? (<>
                                                                 {isQueExpandedImage
                                                                      ? <>
                                                                           <button className='fac-button' onClick={(e) => { e.stopPropagation(); setExpandQueImageId(null) }}>View Less</button>
                                                                           <h2 dangerouslySetInnerHTML={{ __html: query }} style={{ fontWeight: '400', fontSize: '20px' }}></h2>
                                                                      </>
                                                                      :
                                                                      <button className='fac-button' onClick={(e) => { e.stopPropagation(); setExpandQueImageId(_id) }}>View Question Image</button>
                                                                 }
                                                            </>)

                                                            :
                                                            (<>
                                                                 {words.length > 10
                                                                      ?
                                                                      (<>
                                                                           {isQueExpanded
                                                                                ? (
                                                                                     <>
                                                                                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                                                               <button className='fac-button' onClick={(e) => { e.stopPropagation(); setExpandQuestionId(null) }}>View Less</button>
                                                                                               <h2 dangerouslySetInnerHTML={{ __html: query }} style={{ fontWeight: '400', fontSize: '20px' }}></h2>
                                                                                          </div>
                                                                                     </>
                                                                                )
                                                                                : (
                                                                                     <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                                                          <button className='fac-button' onClick={(e) => { e.stopPropagation(); setExpandQuestionId(_id) }}>View Full Question</button>
                                                                                          <h2 dangerouslySetInnerHTML={{ __html: shortenedQuery }} style={{ fontWeight: '400', fontSize: '20px' }}></h2>
                                                                                     </div>
                                                                                )
                                                                           }
                                                                      </>)
                                                                      :
                                                                      <h2 dangerouslySetInnerHTML={{ __html: query }} style={{ fontWeight: '400', fontSize: '20px' }} ></h2>
                                                                 }
                                                            </>)

                                                       }

                                                  </AccordionSummary>

                                                  <AccordionDetails className='que-accordian-detail'>

                                                       {status === "Solved" &&
                                                            <div>
                                                                 <b style={{ marginRight: '20px', borderBottom: '2px solid black' }}>Faculty Answer:</b>

                                                                 {containsImage(question.solution)

                                                                      ? (<>
                                                                           {isAnsExpandedImage
                                                                                ? <>
                                                                                     <p dangerouslySetInnerHTML={{ __html: question.solution }}></p>
                                                                                     <button className='fac-button' onClick={() => { setExpandAnsImageId(null) }}>View Less</button>
                                                                                </>
                                                                                :
                                                                                <button className='fac-button' onClick={() => { setExpandAnsImageId(_id) }}>View Answer Image</button>
                                                                           }
                                                                      </>)

                                                                      :
                                                                      (<>
                                                                           {words.length > 10
                                                                                ?
                                                                                (<>
                                                                                     {isAnsExpanded
                                                                                          ? (
                                                                                               <>
                                                                                                    <h3 dangerouslySetInnerHTML={{ __html: question.solution }} style={{ fontWeight: '400', fontSize: '20px' }}></h3>
                                                                                                    <button className='fac-button' onClick={() => { setExpandedAnswerId(null) }}>View Less</button>
                                                                                               </>
                                                                                          )
                                                                                          : (
                                                                                               <>
                                                                                                    <h3 dangerouslySetInnerHTML={{ __html: shortenedAns }} style={{ fontWeight: '400', fontSize: '20px' }}></h3>
                                                                                                    <button className='fac-button' onClick={() => { setExpandedAnswerId(_id) }}>View Full Answer</button>
                                                                                               </>
                                                                                          )
                                                                                     }
                                                                                </>)
                                                                                :
                                                                                <h3 dangerouslySetInnerHTML={{ __html: question.solution }} style={{ fontWeight: '400', fontSize: '20px' }}></h3>
                                                                           }
                                                                      </>)

                                                                 }
                                                            </div>
                                                       }

                                                       <Accordion className='sub-accordian' id='sub-accordian' expanded={_id === expandedQuestionId} onChange={() => handleAccordionChange(_id)}>

                                                            <AccordionSummary
                                                                 className='sub-summary'
                                                                 aria-controls="panel3-content"
                                                                 expandIcon={<ArrowDropDownSharpIcon style={{ color: '#F9F7F7' }} />}
                                                                 id="panel3-header">
                                                                 Student Answers
                                                            </AccordionSummary>

                                                            <AccordionDetails className='sub-detail'>

                                                                 {comment && comment.map((cmt, index) => {
                                                                      const { Comment, student } = cmt;
                                                                      return (<div className='sub-card' key={index}>
                                                                           <div className='sub-card-text'>
                                                                                <Avatar sx={{ bgcolor: '#3F72AF' }} alt={student.name} src="/static/images/avatar/1.jpg" />
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
                                                            <Button onClick={() => { setRespond(!respond) }} style={{ color: '#14355b' }}>Respond</Button>
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