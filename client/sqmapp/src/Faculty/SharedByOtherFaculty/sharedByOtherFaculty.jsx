import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/sidebar'
// import Footer from '../../components/Footer/footer'
import './sharedByOtherFaculty.css'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ReactQuill from 'react-quill'
import 'quill/dist/quill.snow.css'
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import AccordionActions from '@mui/material/AccordionActions';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify'
import axios from 'axios'

const SharedByOtherFaculty = () => {

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

  const [questions, setQuestions] = useState([])
  const [expandQueImageId, setExpandQueImageId] = useState(null);
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);
  const [expandAnsImageId, setExpandAnsImageId] = useState(null);
  const [expandedAnswerId, setExpandedAnswerId] = useState(null);

  const token = JSON.parse(localStorage.getItem("isFaculty")).token;
  const fid = JSON.parse(localStorage.getItem("isFaculty")).id;
  const [answer, setAnswer] = useState('');

  const sharedQuery = async () => {
    const res = await axios.post("http://localhost:3000/faculty/getsharedquery",
      { fid: fid },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      }
    );
    console.log(res);
    console.log(res);
    setQuestions(res.data.query);
  }

  useEffect(() => { sharedQuery() }, [])

  const handleSharedSolve = async (id) => {
    console.log(id, answer);
    const res = await axios.put("http://localhost:3000/faculty/solvesharedquery",
      { fid: fid, qid: id, solution: answer },
      {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    );
    console.log(res);
    setAnswer('');
    toast('answer sent successfully');
  }

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
    <div className='sby-container'>
      <Sidebar />

      <div className='sby-body'>

        <h1>Shared by other faculties</h1>

        {Array.isArray(questions)
          ? questions.map((question, index) => {
            let { _id, query, status } = question;

            const words = query.split(" ");
            const shortenedQuery = words.length > 10 ? words.slice(0, 10).join(" ") + "..." : query;
            const isQueExpanded = _id === expandedQuestionId;
            const isQueExpandedImage = _id === expandQueImageId;

            const ansWord = question.solution ? question.solution.split(" ") : [];
            const shortenedAns = ansWord.length > 10 ? ansWord.slice(0, 10).join(" ") + "..." : question.solution;
            const isAnsExpanded = _id === expandedAnswerId;
            const isAnsExpandedImage = _id === expandAnsImageId;

          return (
            <div key={index} style={{ marginBottom: '10px' }}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ArrowDropDownSharpIcon />}
                  aria-controls="panel3-content">

                  {containsImage(query)

                    ? (<>
                      {isQueExpandedImage
                        ? <>
                          <button className='fac-button' onClick={(e) => { e.stopPropagation(); setExpandQueImageId(null) }}>View Less</button>
                          <h2 dangerouslySetInnerHTML={{ __html: query }} style={{ fontWeight: '400', fontSize: '20px' }}></h2>
                        </>
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
                                  <button className='fac-button' onClick={(e) => { e.stopPropagation(); setExpandedQuestionId(null) }}>View Less</button>
                                  <h2 dangerouslySetInnerHTML={{ __html: query }} style={{ fontWeight: '400', fontSize: '20px' }}></h2>
                                </div>
                              </>
                            )
                            : (
                              <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <button className='fac-button' onClick={(e) => { e.stopPropagation(); setExpandedQuestionId(_id) }}>View Full Question</button>
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

                <AccordionDetails className='que-accordian-detail'>

                  {status !== "Solved"
                    ? <div style={{ display: 'flex', flexDirection: 'column' }}>

                      <ReactQuill
                        modules={module}
                        theme="snow"
                      value={answer}
                        onChange={handleQuillChange}
                        placeholder='enter your answer...🖊️'
                      />    

                    <AccordionActions>
                        <Button onClick={() => handleSharedSolve(_id)} style={{ color: '#14355b' }}>Respond</Button>
                    </AccordionActions>
                    </div> 
                    :
                    <>
                      <b style={{ marginRight: '10px' }}>Your Answer:</b>
                      {containsImage(question.solution)

                        ? (<>
                          {isAnsExpandedImage
                            ? <>
                              <p dangerouslySetInnerHTML={{ __html: question.solution }}></p>
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
                                    <h3 dangerouslySetInnerHTML={{ __html: question.solution }} style={{ fontWeight: '400', fontSize: '20px' }}></h3>
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
                    </>
                  }

                </AccordionDetails>

              </Accordion>
            </div>
          );


          })
          : <h2 style={{ textAlign: 'center', color: 'red', marginTop: '10px' }}>no questions are shared to you yet...</h2>
        }

      </div>

      {/* <Footer /> */}
    </div>
  )
}

export default SharedByOtherFaculty