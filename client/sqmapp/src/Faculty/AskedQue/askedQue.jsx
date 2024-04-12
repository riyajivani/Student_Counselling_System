import './askedQue.css'
import Sidebar from '../../components/Sidebar/sidebar'
import ReactQuill from 'react-quill'
import 'quill/dist/quill.snow.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import {Modal} from 'antd'
const dburl = import.meta.env.VITE_REACT_DBURL

const AskedQue = () => {

  const [status,setStatus] = useState('');
  const [question,setQuestion] = useState([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [faculties, setFaculties] = useState([]);
  const [solve,setSolve]=useState(false);
  const [share,setShare]=useState(false);
  const [answer,setAnswer]=useState('');
  const [expandQueImageId, setExpandQueImageId] = useState(null);
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);
  const [expandAnsImageId, setExpandAnsImageId] = useState(null);
  const [expandedAnswerId, setExpandedAnswerId] = useState(null);
  const fid = JSON.parse(localStorage.getItem("isFaculty")).id;
  const token = JSON.parse(localStorage.getItem("isFaculty")).token;

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
    toolbar: toolbarOptions,
  }

  const getFaculties = async () => {
    const res = await axios.get(`${dburl}/faculty/getfaculties`)
    console.log(res.data.faculty);
    setFaculties(res.data.faculty);
  }
  useEffect(() => {
    getFaculties();
  }, [])

  const receiveData = async () => {
      let res = await axios.post(
        `${dburl}/faculty/getquery`, 
        {fid : fid},
        {
          headers:{
            "Content-Type": "application/json",
            "Authorization":`Bearer ${token}`,
          },
        }
      );
    console.log(res.data.query);
    setQuestion(res.data.query);
  };
  useEffect(() => {
    receiveData();
  }, [])

  const handleStatus = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    try {
      let res = await axios.post(
        `${dburl}/faculty/querybystatus`, 
      {fid : fid, status: newStatus},
      {
        headers:{
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,

        },
      }
    );

      // console.log(res.data);
      if (res.data.success === true) {
        setQuestion(res.data.query);
      } else {
        toast(res.data.message);
      }
    } catch (e) {
      console.log(e);
    }


  }

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    if (answer) {
      const res = await axios.put(
        `${dburl}/faculty/solvequery`,
        { qid: selectedQuestionId, fid: fid, solution: answer },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setAnswer('');
      setSolve(false);
      setQuestion(prevQuestions => prevQuestions.map(question => {
        if (question._id === selectedQuestionId) {
          return { ...question, status: "Solved" };
        }
        return question;
      }));
      toast(res.data.message);
      window.location.reload();
    }
  }

  const handleSend = async (e) => {
    e.preventDefault();
    if (selectedFaculty) {
      console.log(selectedQuestionId, selectedFaculty.id)
      const res = await axios.put(`${dburl}/faculty/sharequery`,
        { qid: selectedQuestionId, fid: selectedFaculty.id },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          }
        }
      );
      console.log(res);
      setShare(false);
    }
  };

  const containsImage = (query) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(query, 'text/html');
    const imageElements = doc.querySelectorAll('img');
    return imageElements.length > 0;
  };

  const handleQuillChange = (value) => {
    setAnswer(value);
  }

  return (
    <div className='askedque-container'>
      <Sidebar />

      <div className='askedque-body'> 

        <h1>question asked by students</h1>

        <select onChange={handleStatus} value={status} className='askedque-select'>
          <option value="" disabled>select status</option>
          <option value="Solved">solved</option>
          <option value="Not solved">unsolved</option>
        </select>

        <div className="askedque-grid">
          {question && question.map((que, index) => {
            let { _id, query, status, student } = que;

            const words = query.split(" ");
            const shortenedQuery = words.length > 10 ? words.slice(0, 10).join(" ") + "..." : query;
            const isQueExpanded = _id === expandedQuestionId;
            const isQueExpandedImage = _id === expandQueImageId;

            const ansWord = que.solution ? que.solution.split(" ") : [];
            const shortenedAns = ansWord.length > 10 ? ansWord.slice(0, 10).join(" ") + "..." : que.solution;
            const isAnsExpanded = _id === expandedAnswerId;
            const isAnsExpandedImage = _id === expandAnsImageId;

            const sharedStatus = que.sharetofaculty ? que.sharetofaculty.length > 0 : false;

            return (
                <div className="askedque-card" key={index}>
                {containsImage(query)

                  ? (<>
                    {isQueExpandedImage
                      ? <>
                        <button className='fac-button' onClick={() => { setExpandQueImageId(null) }}>View Less</button>
                        <h2 dangerouslySetInnerHTML={{ __html: query }}></h2>
                      </>
                      :
                      <button className='fac-button' onClick={() => { setExpandQueImageId(_id) }}>View Question Image</button>
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
                              <button className='fac-button' onClick={() => { setExpandedQuestionId(null) }}>View Less</button>
                              <h2 dangerouslySetInnerHTML={{ __html: query }}></h2>
                            </>
                          )
                          : (
                            <>
                              <button className='fac-button' onClick={() => { setExpandedQuestionId(_id) }}>View Full Question</button>
                              <h2 dangerouslySetInnerHTML={{ __html: shortenedQuery }}></h2>
                            </>
                          )
                        }
                      </>)
                      :
                      <h2 dangerouslySetInnerHTML={{ __html: query }} style={{ fontWeight: 'normal', fontSize: '20px' }}></h2>
                    }
                  </>)

                }
                <div style={{ paddingLeft: '10px' }}>

                  {status === "Solved" && (<>
                    {containsImage(que.solution)

                      ? (<>
                        {isAnsExpandedImage
                          ? <>
                            <p dangerouslySetInnerHTML={{ __html: que.solution }}></p>
                            <button className='fac-button' onClick={() => { setExpandAnsImageId(null) }}>View Less</button>
                          </>
                          :
                          <button className='fac-button' style={{ marginTop: '20px' }} onClick={() => { setExpandAnsImageId(_id) }}>View Answer Image</button>
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
                                  <h3 dangerouslySetInnerHTML={{ __html: que.solution }}></h3>
                                  <button className='fac-button' onClick={() => { setExpandedAnswerId(null) }}>View Less</button>
                                </>
                              )
                              : (
                                <>
                                  <h3 dangerouslySetInnerHTML={{ __html: shortenedAns }}></h3>
                                  <button className='fac-button' onClick={() => { setExpandedAnswerId(_id) }}>View Full Answer</button>
                                </>
                              )
                            }
                          </>)
                          :
                          <h3 dangerouslySetInnerHTML={{ __html: que.solution }}></h3>
                        }
                      </>)

                    }
                  </>)

                  }

                  <h4>{status !== "Solved" && "Not Solved "}</h4>
                  <ul>
                    {status === "Solved" ? <li>Solved By: <b>{que.faculty.name}</b></li> : <></>}
                    <li>Student ID: <b>{student.id}</b></li>
                    <li>Student Name: <b>{student.name}</b></li>
                  </ul>
                </div>

                  {status==="Not solved" &&
                  <div className='buttons'>
                    <button className='fac-button' onClick={() => { setSolve(true); setSelectedQuestionId(_id); }}>Solve</button>
                    {sharedStatus ? <></> : <button className='fac-button' onClick={() => { setShare(true); setSelectedQuestionId(_id); }}>Share</button>}
                  </div>
                  }

                <Modal open={solve} onCancel={() => { setSolve(false) }} footer={null} centered className="custom-modal">
                  <div style={{ margin: '30px auto' }}>
                    <ReactQuill
                      modules={module}
                      theme="snow"
                      value={answer}
                      onChange={handleQuillChange}
                      placeholder='enter your answer...🖊️'
                    />
                    <button className='fac-button' onClick={(e) => handleSubmitAnswer(e)} style={{ width: '100%', fontSize: 'large', marginTop: '20px' }}>
                      solve query
                    </button>
                    </div>
                  </Modal>

                  <Modal open={share} onCancel={()=>{setShare(false)}} footer={null} centered className="custom-modal">
                  <div>
                      <h2>Share with these Faculty Members</h2>
                    <form className='share-form'>
                        {faculties && faculties.map((faculty, index) =>
                          faculty.id !== fid &&
                          (
                            <div key={index}>
                              <input type='radio'
                                value={faculty.name}
                                checked={selectedFaculty === faculty}
                                onChange={() => setSelectedFaculty(faculty)}
                              />
                              {faculty.name}
                            </div>
                          ))}
                      <button className='fac-button' onClick={(e) => handleSend(e)} style={{ width: '100%', fontSize: 'large', marginTop: '20px' }}>
                          share query
                        </button>
                    </form>
                  </div>
                  </Modal>

                </div>
              );
            })}
        </div>

      </div>

    {/* <Footer/> */}
    </div>
  );
}

export default AskedQue