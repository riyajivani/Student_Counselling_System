import './askmentor.css';
import Sidebar from '../../components/Sidebar/sidebar'
import Footer from '../../components/Footer/footer'
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify'

const AskMentor = () => {

     const [question, setQuestion] = useState("")
     const sid = JSON.parse(localStorage.getItem("isStudent")).id;
     const token = JSON.parse(localStorage.getItem("isStudent")).token;

     const handleAsk = async () => {

               console.log(sid);
               console.log(question);

               await axios.post(
                    "http://localhost:3000/student/askmentor",
                    {
                      question: question,
                      sid: sid,
                    },
                    {
                      headers: {
                         "Content-Type": "application/json",
                         "Authorization": `Bearer ${token}`
                      },
                    }
               );
               toast.success("sucessfully sent");
               setQuestion(""); 
     }

     return (
               <div className='askmentor-container'>
                    <Sidebar />

                    <div className='askmentor-body'>

                         <h1>Have a Doubt???</h1>
                         
                         <div className='ask__form'>
                              <textarea className='input__que' value={question} rows={10} cols={300} onChange={(e)=>{setQuestion(e.target.value)}} placeholder='enter your question here and send it...🖊️'/>
                              <button type='button' className='ask__btn' onClick={handleAsk}><SendIcon/></button>
                         </div>
                    </div>

                    <Footer />
               </div>
     )
}

export default AskMentor