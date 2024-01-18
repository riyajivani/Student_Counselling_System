import './askmentor.css';
import Sidebar from '../../components/Sidebar/sidebar'
import Footer from '../../components/Footer/footer'
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';

const AskMentor = () => {

     const [question, setQuestion] = useState("")
     const sid = JSON.parse(localStorage.getItem("isStudent")).id;

     const handleAsk = async () => {
          try {

               console.log(sid);
               const res = await fetch('your_api_endpoint', {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json',
                    },
                    body: {question, sid},
               });
          
               if (res.ok) {
                    console.log("sent successfully");
               } else {
                    console.error('Failed to submit question');
               }
          }catch(error) {
                console.error('Error occurred while submitting question', error);
          }

     }

     return (
               <div className='askmentor-container'>
                    <Sidebar />

                    <div className='askmentor-body'>

                         <h1>Have a Doubt
                              ???</h1>
                         
                         <div className='ask__form'>
                              <textarea className='input__que' rows={14} cols={300} onChange={(e)=>{setQuestion(e.target.value)}} placeholder='enter your question here and send it...🖊️'/>
                              <button type='button' className='ask__btn' onClick={handleAsk}><SendIcon/></button>
                         </div>
                    </div>

                    <Footer />
               </div>
     )
}

export default AskMentor