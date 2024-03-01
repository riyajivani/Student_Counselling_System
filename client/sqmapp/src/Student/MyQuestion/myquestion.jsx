import "./myquestion.css";
import Sidebar from "../../components/Sidebar/sidebar";
// import Footer from "../../components/Footer/footer";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import AccordionActions from '@mui/material/AccordionActions';
import Button from '@mui/material/Button';
import {toast} from 'react-toastify'
import { useState } from "react";
import axios from "axios";

const MyQuestion = () => {
  const [question,setQuestion] = useState([]);
  const [status,setStatus] = useState('');
  const sid = JSON.parse(localStorage.getItem("isStudent")).id;
  const token = JSON.parse(localStorage.getItem("isStudent")).token;
  let res;

  const handleStatus = async (e) => {

    const newStatus = e.target.value;
    setStatus(newStatus);

    try{
      res = await axios.post(
        "http://localhost:3000/student/getquery", 
        {sid : sid, status: newStatus},
        {
          headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        }
      );
      console.log(res.data);
      if(res.data.success===false){
        toast(res.data.message);
      }else{
        setQuestion(res.data.query);
      }

    }catch(error){
      console.log(error);
    }

  }
  // useEffect(()=>{console.log(question[0]._id)},[question])

  const handleMode = async (id,mode) => {
    console.log(id, mode);
    let newMode;
      mode === "public" ? (newMode = "private") : (newMode = "public");

    try {
      const response = await axios.put(
        "http://localhost:3000/student/changemode",
        { qid: id, mode: newMode },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      setQuestion((prevQuestions) =>
        prevQuestions.map((que) =>
          que._id === id ? { ...que, mode: newMode } : que
        )
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="myque-container">
        <Sidebar />

        <div className="myque-body">
          <h1>your questions</h1>

          <select onChange={handleStatus} value={status} className='askedque-select'>
            <option value="" disabled>select status</option>
            <option value="Solved">solved</option>
            <option value="Not solved">unsolved</option>
          </select>

          {question && question.map((que,index) => {
              let { query, solution, status, mode, faculty, _id } = que;

              return (
                <Accordion key={index} style={{ marginBottom: '20px' }}>

                  <AccordionSummary
                    expandIcon={<ArrowDropDownSharpIcon />}>
                      {query}
                  </AccordionSummary>

                  <AccordionDetails className='sub-detail'>
                    <div style={{display:'flex',flexDirection:'column',gap:'0'}}>
                      <h4 style={{margin:'0'}}>Status: {status} {status==="Solved" && " ✅ "}</h4>
                      <p >Mode: {mode}</p>
                      {status==="Solved" 
                      ?<>
                        <h4 style={{margin:'0'}}>Solved By: {faculty.name}</h4> 
                        <p>
                          <b style={{marginRight:'20px',borderBottom:'2px solid black'}}>Faculty Answer:</b>
                            {solution}
                        </p>
                      </>
                      :<></>}
                      
                    </div>
                  </AccordionDetails>

                  <AccordionActions>
                    <Button onClick={()=>handleMode(_id,mode)} style={{color:'black'}}>make it {mode === "public" ? "private" : "public"}</Button>
                  </AccordionActions>

                </Accordion>
              )
          })}

        </div>

        {/* <Footer /> */}
      </div>
    </>
  );
};

export default MyQuestion;
