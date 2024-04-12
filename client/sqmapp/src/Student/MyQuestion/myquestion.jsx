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
const dburl = import.meta.env.VITE_REACT_DBURL

const MyQuestion = () => {
  const [question,setQuestion] = useState([]);
  const [expandQueImageId, setExpandQueImageId] = useState(null);
  const [expandQuestionId, setExpandQuestionId] = useState(null);
  const [expandAnsImageId, setExpandAnsImageId] = useState(null);
  const [expandedAnswerId, setExpandedAnswerId] = useState(null);
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
        `${dburl}/student/changemode`,
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

  const containsImage = (query) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(query, 'text/html');
    const imageElements = doc.querySelectorAll('img');
    return imageElements.length > 0;
  };

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
            let { query, status, mode, faculty, _id } = que;

            const words = query.split(" ");
            const shortenedQuery = words.length > 10 ? words.slice(0, 5).join(" ") + "..." : query;
            const isQueExpanded = _id === expandQuestionId;
            const isQueExpandedImage = _id === expandQueImageId;

            const ansWord = que.solution ? que.solution.split(" ") : [];
            const shortenedAns = ansWord.length > 10 ? ansWord.slice(0, 5).join(" ") + "..." : que.solution;
            const isAnsExpanded = _id === expandedAnswerId;
            const isAnsExpandedImage = _id === expandAnsImageId;

              return (
                <Accordion key={index} style={{ marginBottom: '20px' }}>

                  <AccordionSummary
                    style={{ backgroundColor: '#14355b', color: '#F9F7F7' }}
                    expandIcon={<ArrowDropDownSharpIcon style={{ color: '#F9F7F7' }} />}>

                    {containsImage(query)

                      ? (<>
                        {isQueExpandedImage
                          ? <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <button className='fac-button' onClick={(e) => { e.stopPropagation(); setExpandQueImageId(null) }}>View Less</button>
                            <h2 dangerouslySetInnerHTML={{ __html: query }} style={{ fontWeight: '400', fontSize: '20px' }}></h2>
                          </div>
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

                  <AccordionDetails className='sub-detail'>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                      <h4 style={{margin:'0'}}>Status: {status} {status==="Solved" && " ✅ "}</h4>
                      <p >Mode: {mode}</p>
                      {status==="Solved" 
                      ?<>
                          <p style={{ margin: '0' }}>Solved By: {faculty.name}</p>
                          <p>
                            <b style={{ marginRight: '20px', borderBottom: '2px solid black' }}>Faculty Answer:</b>

                            {containsImage(que.solution)

                              ? (<>
                                {isAnsExpandedImage
                                  ? <>
                                    <p dangerouslySetInnerHTML={{ __html: que.solution }}></p>
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
                                          <h3 dangerouslySetInnerHTML={{ __html: que.solution }} style={{ fontWeight: '400', fontSize: '20px' }}></h3>
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
                          </p>
                      </>
                      :<></>}
                      
                    </div>
                  </AccordionDetails>

                  <AccordionActions>
                    <Button onClick={() => handleMode(_id, mode)} style={{ color: '#14355b' }}>make it {mode === "public" ? "private" : "public"}</Button>
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
