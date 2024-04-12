import './askmentor.css'
import Sidebar from '../../components/Sidebar/sidebar'
import 'quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'
import SendIcon from '@mui/icons-material/Send'
import { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
const dburl = import.meta.env.VITE_REACT_DBURL

const AskMentor = () => {

     const [question, setQuestion] = useState("")
     const sid = JSON.parse(localStorage.getItem("isStudent")).id;
     const token = JSON.parse(localStorage.getItem("isStudent")).token;

     var toolbarOptions = [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block'],
          ['link', 'image', 'formula'],

          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
          [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent

          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          [{ 'align': [] }],

          ['clean']                                         // remove formatting button
     ];

     const module = {
          toolbar: toolbarOptions
     }

     const handleAsk = async () => {

          console.log(sid);

               await axios.post(
                    `${dburl}/student/askmentor`,
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

     const handleQuillChange = (value) => {
          setQuestion(value);
     }

     return (
               <div className='askmentor-container'>
                    <Sidebar />

                    <div className='askmentor-body'>

                         <h1>Have a Doubt???</h1>
                         
                         <div className='ask__form'>
                         <ReactQuill modules={module} theme="snow" value={question} onChange={handleQuillChange} placeholder='enter your question here and send it...🖊️' />
                         <button type='button' className='ask__btn' onClick={handleAsk}><SendIcon /></button>
                         </div>
                    </div>

                    {/* <Footer /> */}
               </div>
     )
}

export default AskMentor