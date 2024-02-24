import "./myquestion.css";
import Sidebar from "../../components/Sidebar/sidebar";
import Footer from "../../components/Footer/footer";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import AccordionActions from '@mui/material/AccordionActions';
import Button from '@mui/material/Button';
// import { useEffect, useState } from "react";
// import axios from "axios";

const MyQuestion = () => {
  const question = [
    {
      question: "What is the capital of France?",
      answer:
        "Paris dvnbg khyt jrewskzjc xvkbhnjgyhtr ewaszcxvbnjmuy tr5ewas dcvxbhju ytr5ewasdxv bgnh juytreds cxvbnh",
      status: "solved",
      mode: "public",
    },
    {
      question: "Who is the 16th President of the United States?",
      answer:
        "Abraham Lincoln dvnbg khyt jrewskzjc xvkbhnjgyhtr ewaszcxvbnjmuy tr5ewas dcvxbhju ytr5ewasdxv bgnh juytreds cxvbnh",
      status: "solved",
      mode: "private",
    },
    {
      question: "What is the square root of 25?",
      answer:
        "5 dvnbg khyt jrewskzjc xvkbhnjgyhtr ewaszcxvbnjmuy tr5ewas dcvxbhju ytr5ewasdxv bgnh juytreds cxvbnh",
      status: "solved",
      mode: "public",
    },
    {
      question: "What is the main ingredient in guacamole?",
      answer:
        "Avocado dvnbg khyt jrewskzjc xvkbhnjgyhtr ewaszcxvbnjmuy tr5ewas dcvxbhju ytr5ewasdxv bgnh juytreds cxvbnh",
      status: "not solved",
      mode: "public",
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      answer:
        "William Shakespeare dvnbg khyt jrewskzjc xvkbhnjgyhtr ewaszcxvbnjmuy tr5ewas dcvxbhju ytr5ewasdxv bgnh juytreds cxvbnh",
      status: "not solved",
      mode: "private",
    },
    {
      question: "What is the capital of Japan?",
      answer:
        "Tokyo dvnbg khyt jrewskzjc xvkbhnjgyhtr ewaszcxvbnjmuy tr5ewas dcvxbhju ytr5ewasdxv bgnh juytreds cxvbnh",
      status: "solved",
      mode: "public",
    },
    {
      question: "What is the largest planet in our solar system?",
      answer:
        "Jupiter dvnbg khyt jrewskzjc xvkbhnjgyhtr ewaszcxvbnjmuy tr5ewas dcvxbhju ytr5ewasdxv bgnh juytreds cxvbnh",
      status: "not solved",
      mode: "private",
    },
    {
      question: "How many continents are there?",
      answer:
        "7 dvnbg khyt jrewskzjc xvkbhnjgyhtr ewaszcxvbnjmuy tr5ewas dcvxbhju ytr5ewasdxv bgnh juytreds cxvbnh",
      status: "solved",
      mode: "public",
    },
    {
      question: "Who painted the Mona Lisa?",
      answer:
        "Leonardo da Vinci dvnbg khyt jrewskzjc xvkbhnjgyhtr ewaszcxvbnjmuy tr5ewas dcvxbhju ytr5ewasdxv bgnh juytreds cxvbnh",
      status: "not solved",
      mode: "public",
    },
    {
      question: "What is the chemical symbol for gold?",
      answer:
        "Au dvnbg khyt jrewskzjc xvkbhnjgyhtr ewaszcxvbnjmuy tr5ewas dcvxbhju ytr5ewasdxv bgnh juytreds cxvbnh",
      status: "solved",
      mode: "private",
    },
  ];

  // const [question, setQuestion] = useState([]);
  // const sid = JSON.parse(localStorage.getItem("isStudent")).id;

  // const fetchMyQue = async () => {

  //   let res = await axios.post(
  //     "http://localhost:3000/student/getquery", 
  //     {sid : sid},
  //     {
  //       headers:{
  //          "Content-Type": "application/json",
  //          "Authorization": `Bearer ${token}`
  //       },
  //     }
  //   );
  // setQuestion(res.data.query);
  // }

  // useEffect(()=>{fetchMyQue()},[])

  // useEffect(()=>{console.log(question)},[question])

  return (
    <>
      <div className="myque-container">
        <Sidebar />

        <div className="myque-body">
          <h1>your questions</h1>

          {/* <div className="myque-grid">
            {question.map((que) => {
              let { question, answer, status, mode } = que;

              return (
                <div className="myque-card" key={question}>
                  <h3>{question}</h3>
                  <p>
                    <b>Answer:</b> {answer}
                  </p>
                  <h5>
                    <b>Status:</b> {status} <br /> <b>Mode:</b> {que.mode}
                  </h5>

                  <button
                    className="mode_btn"
                    onClick={() => {
                      mode === "public"
                        ? (que.mode = "private")
                        : (que.mode = "public");
                      console.log(que.mode);
                    }}
                  >
                    make it {mode == "public" ? "private" : "public"}
                  </button>
                </div>
              );
            })}
          </div> */}

          {question.map((que,index) => {
              let { question, answer, status, mode } = que;

              return (
                <Accordion key={index}>

                  <AccordionSummary
                    expandIcon={<ArrowDropDownSharpIcon />}>
                      {question}
                  </AccordionSummary>

                  <AccordionDetails className='sub-detail'>
                    {/* <div className='sub-card'> */}
                    <div style={{display:'flex',flexDirection:'column',gap:'0'}}>
                      <h4 style={{margin:'0'}}>Status: {status} {status==="solved" && " ✅ "}</h4>
                      <p >Mode: {mode}</p>
                      <p>
                        <b style={{marginRight:'20px',borderBottom:'2px solid black'}}>Faculty Answer:</b>
                          {answer}
                      </p>
                    </div>
                    {/* </div> */}
                  </AccordionDetails>

                  <AccordionActions>
                    <Button style={{color:'black'}}>make it {mode == "public" ? "private" : "public"}</Button>
                  </AccordionActions>

                </Accordion>
              )
          })}
         

        </div>

        <Footer />
      </div>
    </>
  );
};

export default MyQuestion;
