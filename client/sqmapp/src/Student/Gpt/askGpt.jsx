import './askgpt.css'
import Sidebar from '../../components/Sidebar/sidebar'
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import SsLogo from '../../assets/SsLogo.png'
import { Avatar } from '@mui/material';
import { sendMsgToOpenAI } from './openAi';
import { useEffect, useRef, useState } from 'react';

const AskGpt = () => {

     const msgEnd = useRef(null);
     const [input, setInput] = useState("");
     const [messages, setMessages] = useState([
          {
               text: "How can I help you today?",
               isBot: true
          }
     ]);

     useEffect(() => {
          msgEnd.current.scrollIntoView();
     }, [messages])

     const handleEnter = async (e) => {
          if (e.key == 'Enter') await handleSendGPT();
     }

     const handleSendGPT = async () => {

          const text = input;
          setInput('');
          setMessages([
               ...messages,
               { text, isBot: false }
          ])
          const res = await sendMsgToOpenAI(text);
          setMessages([
               ...messages,
               {
                    text, isBot: false
               },
               {
                    text: res, isBot: true
               }
          ])
     }

     const studentInfo = JSON.parse(localStorage.getItem("isStudent")).student;

     return (
          <div className='gpt-container'>
               <Sidebar />

               <div className='gpt-body'>

                    <div className='gpt-sidebar'>
                         <span className='brand'>ScholarSphereGPT</span>

                         <button className='midBtn' onClick={() => { window.location.reload() }}>
                              <AddIcon style={{ fontSize: '2rem' }} />
                              <span>New Chat</span>
                         </button>

                         <span className='gpt-footer'></span>
                    </div>

                    <div className='main'>
                         <div className="chats">
                              {
                                   messages.map((message, index) => (
                                        <div className={message.isBot ? "chat bot" : "chat"} key={index}>
                                             {message.isBot
                                                  ? <img src={SsLogo} alt='logo' className='gpt-logo' />
                                                  : <Avatar sx={{ bgcolor: '#3F72AF' }} alt={studentInfo.name} src={studentInfo.name[0]} />
                                             }
                                             {message.isBot ? (
                                                  <pre>
                                                       {message.text}
                                                  </pre>
                                             ) : (
                                                       <p>{message.text}</p>
                                             )}
                                        </div>
                                   ))
                              }
                              <div ref={msgEnd} />
                         </div>
                         <div className="inp">
                              <input type='text' value={input} onKeyDown={handleEnter} onChange={(e) => { setInput(e.target.value) }} placeholder='Message ScholarSphereGPT' className='gpt-input' />
                              <SendIcon onClick={handleSendGPT} className='sendGPTBtn' />
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default AskGpt