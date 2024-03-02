import './askedQue.css'
import Sidebar from '../../components/Sidebar/sidebar'
// import Footer from '../../components/Footer/footer'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import {Modal} from 'antd'

const AskedQue = () => {
  const [status,setStatus] = useState('');
  const [question,setQuestion] = useState([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [faculties, setFaculties] = useState([]);
  const [solve,setSolve]=useState(false);
  const [share,setShare]=useState(false);
  const [answer,setAnswer]=useState('');
  const fid = JSON.parse(localStorage.getItem("isFaculty")).id;
  const token = JSON.parse(localStorage.getItem("isFaculty")).token;

  const getFaculties = async () => {
    const res = await axios.get("http://localhost:3000/faculty/getfaculties")
    // console.log(res.data.faculty);
    setFaculties(res.data.faculty);
  }
  useEffect(() => {
    getFaculties();
  }, [])

  const receiveData = async () => {
      let res = await axios.post(
        "http://localhost:3000/faculty/getquery", 
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
},[])

  const handleStatus = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    let res = await axios.post(
      "http://localhost:3000/faculty/querybystatus", 
      {fid : fid, status: newStatus},
      {
        headers:{
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,

        },
      }
    );

    console.log(res.data);
    if(res.data.success===true){
      setQuestion(res.data.query);
    }else{
      toast(res.data.message);
    }
    
  }
  // useEffect(()=>{console.log(status)},[status])


  const handleSubmitAnswer = async (e,id)=> {
    if (answer) {
      e.preventDefault();
      console.log(id);
      const res = await axios.put(
        "http://localhost:3000/faculty/solvequery",
        { qid: id, fid: fid, solution: answer },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast(res.data.message);
      setAnswer('');
      setSolve(false);
    }
  }

  const handleSend = async (e) => {
    e.preventDefault();
    if (selectedFaculty) {
      // console.log(`Sending question to ${JSON.stringify(selectedFaculty)}`);
      console.log(selectedQuestionId, selectedFaculty.id)
      const res = await axios.put("http://localhost:3000/faculty/sharequery",
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

  return (
    <div className='askedque-container'>
      <Sidebar />

      <div className='askedque-body'>          
        <h1>asked question</h1>

        <select onChange={handleStatus} value={status} className='askedque-select'>
          <option value="" disabled>select status</option>
          <option value="Solved">solved</option>
          <option value="Not solved">unsolved</option>
        </select>

        <div className="askedque-grid">
          {question && question.map((que, index) => {
              let {_id,query,mode,status,student} = que;
              return (
                <div className="askedque-card" key={index}>
                  <h2>{query}</h2>
                    <h3>{status}{status==="Solved" && " ✅ "}</h3>
                    <h4>Mode: {mode}</h4>
                  <ul>
                  {status==="Solved"?<li>Solved By: <b>riya faculty</b></li>:<></>}
                    <li>Student ID: <b>{student.id}</b></li>
                    <li>Student Name: <b>{student.name}</b></li>
                  </ul>

                  {status==="Not solved" &&
                      <div className='buttons'>
                          <button className='fac-button' onClick={()=>{setSolve(true)}}>Solve</button>
                      <button className='fac-button' onClick={() => { setShare(true); setSelectedQuestionId(_id); }}>Share</button>
                      </div>
                  }

                  <Modal open={solve} onCancel={()=>{setSolve(false)}} footer={null} centered className="custom-modal">
                    <div className='solve-model'>
                      <textarea 
                        rows={5} cols={50}
                        value={answer} 
                        onChange={(e)=>{setAnswer(e.target.value)}} 
                        className='answer-ta'
                        onKeyDown={(e) => {e.key === 'Enter' && handleSubmitAnswer(e, _id)}}/>
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