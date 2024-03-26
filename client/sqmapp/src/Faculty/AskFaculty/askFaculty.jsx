import Sidebar from '../../components/Sidebar/sidebar'
import './askFaculty.css'
import axios from 'axios'
import { useEffect, useState } from 'react'

const AskFaculty = () => {

  const token = JSON.parse(localStorage.getItem("isFaculty")).token;
  const fid = JSON.parse(localStorage.getItem("isFaculty")).id;
  const [questions, setQuestions] = useState([]);
  const [expandImageId, setExpandImageId] = useState(null);
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);

  const handleRemove = async (id) => {
    try {
      const res = await axios.put("http://localhost:3000/faculty/removesharequery",
        { qid: id, fid: fid },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          }
        }
      );
      console.log(res);
      setQuestions(prevQuestions => prevQuestions.filter(que => que._id !== id));
    } catch (error) {
      console.error("Error removing question:", error);
    }
  }

  const sharedQuery = async () => {
    const res = await axios.post("http://localhost:3000/faculty/sharedquery",
      { fid: fid },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      }
    );
    console.log(res);
    setQuestions(res.data.query);
  }

  const containsImage = (query) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(query, 'text/html');
    const imageElements = doc.querySelectorAll('img');
    return imageElements.length > 0;
  };

  useEffect(() => { sharedQuery() }, [])

  return (
    <div className='askfaculty-container'>
      <Sidebar />

      <div className='askfaculty-body'>

        <h1>Asked to another Faculty</h1>

        {questions && questions.length > 0 && questions.some(que => que.status !== "Solved")
          ? questions.map((que, index) => {
            const { _id, query, status, faculty } = que;

            const words = query.split(" ");
            const shortenedQuery = words.length > 10 ? words.slice(0, 10).join(" ") + "..." : query;
            const isExpanded = _id === expandedQuestionId;
            const isExpandedImage = _id === expandImageId;

            return (status !== "Solved" &&
              <div className='ask-faculty-card' key={index}>

                {containsImage(query)

                  ? (<>
                    {isExpandedImage
                      ? <>
                        <button className='fac-button' onClick={() => { setExpandImageId(null) }}>View Less</button>
                        <h2 dangerouslySetInnerHTML={{ __html: query }}></h2>
                      </>
                      :
                      <button className='fac-button' onClick={() => { setExpandImageId(_id) }}>View Question Image</button>
                    }
                  </>)

                  :
                  (<>
                    {words.length > 10
                      ?
                      (<>
                        {isExpanded
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
                      <h2 dangerouslySetInnerHTML={{ __html: query }} ></h2>
                    }
                  </>)

                }

                <div style={{ paddingLeft: '10px' }}>
                  <p>To: {faculty.name}</p>
                  <button className='remove-btn' onClick={() => handleRemove(_id)}>remove</button>
                </div>
              </div>
            );
          })

          : <h2 style={{ textAlign: 'center', color: 'red', marginTop: '10px' }}>you have not shared any query yet...</h2>
        }

      </div>

    </div>
  )
}

export default AskFaculty