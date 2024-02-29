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

     const [questions,setQuestions] = useState([]);
     const [answer,setAnswer] = useState(false);
     const [comment,setComment] = useState('');
     const token = JSON.parse(localStorage.getItem("isStudent")).token;
     const ref = useRef();

     const handleSend = (e) => {
          if(e.key==='Enter' && comment){
               toast("comment added");
               setComment('');
          }
     }
     
     const fetchPublicQue = async () => {
          try{
               const res = await axios.get("http://localhost:3000/student/publicquery",
               {
                    headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                    },
               }
               );
               console.log(res.data.query);
               setQuestions(res.data.query);
          }catch(e){
               console.log(e);
          }
     }

     useEffect(()=>{fetchPublicQue()},[])
     useEffect(()=>{console.log(questions)},[questions])

     return (
          <>
               <div className='publicque-container'>
               <Sidebar />

               <div className='publicque-body'>
                         
                    <h1>Public Question</h1>

                    {questions && questions.map((question,index)=>{
                         let { query,solution,status} = question;
                         return (
                              <div key={index} style={{marginBottom:'10px'}}>
                                   <Accordion>
                                   <AccordionSummary
                                        expandIcon={<ArrowDropDownSharpIcon />}
                                        aria-controls="panel3-content">
                                        <p>{query}</p>
                                   </AccordionSummary>

                                   <AccordionDetails className='que-accordian-detail'>

                                        {status==="Solved" && 
                                             <p>
                                                  <b style={{marginRight:'20px',borderBottom:'2px solid black'}}>Faculty Answer:</b>
                                                  {solution}
                                             </p>
                                        }

                                        <Accordion className='sub-accordian' id='sub-accordian'>

                                             <AccordionSummary
                                                  className='sub-summary'
                                                  aria-controls="panel3-content"
                                                  expandIcon={<ArrowDropDownSharpIcon />}
                                                  id="panel3-header">
                                                       Student Answers
                                             </AccordionSummary>

                                             <AccordionDetails className='sub-detail'>

                                             <AvatarGroup total={4} style={{right:'0'}}>
                                                            <Avatar sx={{ bgcolor: 'pink' }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                                            <Avatar sx={{ bgcolor: 'blue' }} alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                                             </AvatarGroup>

                                                  <div className='sub-card'>
                                                       <div className='sub-card-text'>
                                                            <Avatar sx={{ bgcolor: 'pink' }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                                            <h4>Remy Sharp</h4>
                                                       </div>
                                                       <p >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendissemalesuada lacus ex, sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                                            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                                            malesuada lacus ex, sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendissemalesuada lacus ex, sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                                            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                                            malesuada lacus ex, sit amet blandit leo lobortis eget.</p>
                                                  </div>

                                                  <div className='sub-card'>
                                                       <div className='sub-card-text'>
                                                            <Avatar sx={{ bgcolor: 'purple' }} alt="Travis Howard" src="/static/images/avatar/2.jpg"/>
                                                            <h4>Remy Sharp</h4>
                                                       </div>
                                                       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendissemalesuada lacus ex, sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                                            malesuada lacus ex.</p>
                                                  </div>

                                                  <div className='sub-card'>
                                                       <div className='sub-card-text'>
                                                            <Avatar sx={{ bgcolor: 'pink' }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                                            <h4>Remy Sharp</h4>
                                                       </div>
                                                       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                                  </div>

                                                  <div className='sub-card'>
                                                       <div className='sub-card-text'>
                                                            <Avatar sx={{ bgcolor: 'purple' }} alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                                                            <h4>Remy Sharp</h4>
                                                       </div>
                                                       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendissemalesuada lacus ex, sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                                            malesuada lacus ex, sit amet blandit leo lobortis eget.</p>
                                                  </div>
                                             </AccordionDetails>

                                        </Accordion>
          
                                   </AccordionDetails>

                                   <div style={{display:'flex',flexDirection:'column'}}>

                                        {answer===true && 
                                             <input type='text'
                                             placeholder='submit your answer' 
                                             ref={ref}
                                             name='comment' 
                                             value={comment} 
                                             onChange={(e)=>{setComment(e.target.value); console.log(comment)}}
                                             onKeyDown={handleSend} 
                                             className='comment-text'/>}

                                        <AccordionActions>
                                             <Button onClick={()=>{setAnswer(!answer)}} style={{color:'#7fad9e'}}>Respond</Button>
                                        </AccordionActions>
                                   </div>

                                   </Accordion>
                              </div>
                    )})}

               </div>

               {/* <Footer/> */}
               </div>
               
          </>
     )
}

export default PublicQuestion