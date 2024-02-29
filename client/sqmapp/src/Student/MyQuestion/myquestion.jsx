import "./myquestion.css";
import Sidebar from "../../components/Sidebar/sidebar";
// import Footer from "../../components/Footer/footer";
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
// import AccordionActions from '@mui/material/AccordionActions';
// import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import axios from "axios";

const MyQuestion = () => {
//   const [status,setStatus] = useState('');
//   const [question,setQuestion] = useState([]);
//   const sid = JSON.parse(localStorage.getItem("isStudent")).id;

//   const handleStatus = async (e) => {
//     const newStatus = e.target.value;
//     setStatus(newStatus);

//     let res = await axios.post(
//       "http://localhost:3000/student//getquery", 
//       {sid:sid, status: newStatus},
//       {
//         headers:{
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log(res.data.query);
//     setQuestion(res.data.query);
// }
  // const [question, setQuestion] = useState([]);
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
      // setQuestion(res.data.query);
    }catch(error){
      console.log(error);
      // console.log(res.data.message);
      
    }

  }

  // useEffect(()=>{console.log(question)},[question])

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

          {/* {question.map((que,index) => {
              let { question, answer, status, mode } = que;

              return (
                <Accordion key={index}>

                  <AccordionSummary
                    expandIcon={<ArrowDropDownSharpIcon />}>
                      {question}
                  </AccordionSummary>

                  <AccordionDetails className='sub-detail'>
                    <div style={{display:'flex',flexDirection:'column',gap:'0'}}>
                      <h4 style={{margin:'0'}}>Status: {status} {status==="solved" && " ✅ "}</h4>
                      <p >Mode: {mode}</p>
                      <p>
                        <b style={{marginRight:'20px',borderBottom:'2px solid black'}}>Faculty Answer:</b>
                          {answer}
                      </p>
                    </div>
                  </AccordionDetails>

                  <AccordionActions>
                    <Button style={{color:'black'}}>make it {mode == "public" ? "private" : "public"}</Button>
                  </AccordionActions>

                </Accordion>
              )
          })} */}

        </div>

        {/* <Footer /> */}
      </div>
    </>
  );
};

export default MyQuestion;
