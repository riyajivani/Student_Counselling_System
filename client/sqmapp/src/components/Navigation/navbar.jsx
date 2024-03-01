import './navbar.css'
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';    
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import GroupsIcon from "@mui/icons-material/Groups";
import { Tooltip, Modal } from "antd";
import { useState, useEffect } from 'react';
import Img from "../../assets/profile.jpg";
import { useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios'

const Navbar = () => {
     const location = useLocation(); // Get the current location
     const isPublicQuestionPage = location.pathname === '/publicquestion';
     const studentDetail = JSON.parse(localStorage.getItem("isStudent"));
     const facultyDetail = JSON.parse(localStorage.getItem("isFaculty"));
     const role = JSON.parse(localStorage.getItem("isAdmin"))?.role;
     const [modalVisible, setModalVisible] = useState(false);
     const [searchQuery, setSearchQuery] = useState(''); //what user enters in textfield
     const [search, setSearch] = useState([]); // questions in list based on user search
     const [questions, setQuestions] = useState([]);//public questions from backend
     const [selectedQuestion, setSelectedQuestion] = useState(null); //user select question based on searchlist


     const fetchQue = async () => {
          try {
               const res = await axios.get("http://localhost:3000/student/publicquery",
                    {
                         headers: {
                              "Content-Type": "application/json"
                         },
                    }
               );
               const queries = res.data.query.map(item => item.query);
               setQuestions(queries);
          } catch (e) {
               console.log(e);
          }
     }

     useEffect(() => { fetchQue() }, [])

      const handleProfileClick = () => {
          setModalVisible(true);
        };
      
     const handleCloseModal = () => {
          setModalVisible(false);
     };

     const handleSignOut = () => {
          localStorage.clear();
     }

     const handleSearchInputChange = (e) => {
          const query = e.target.value.toLowerCase();
          setSearchQuery(query);
          const filtered = questions.filter(question =>
               query && question.toLowerCase().includes(query)
          );
          setSearch(filtered);
     };

     const handleSearchItemClick = (question) => {
          // Set the selected question and hide the search list
          console.log(question);
          setSelectedQuestion(question);
          localStorage.setItem('searchedQue', selectedQuestion);
          setSearch([]);
     };

     const handleClearSearch = () => {
          setSearchQuery('');
          setSearch([]);
          setSelectedQuestion(null);
          localStorage.removeItem('searchedQue');
     };

     return(
               <nav className="navbar">

               {isPublicQuestionPage && role !== 'admin' &&
                    <div className='searchbar_container'>

                         <div className='nav__search'>
                              <SearchIcon />
                              <input
                                   type='text'
                                   name='search-input'
                                   className='search__input'
                                   placeholder='search question...'
                                   value={searchQuery}
                                   onChange={handleSearchInputChange}
                              />
                              {searchQuery && (
                                   <CloseIcon style={{ backgroundColor: 'rgba(255,0,0,0.4)', borderRadius: '5px', color: 'white' }} onClick={handleClearSearch} />
                              )}
                         </div>

                         {search.length > 0
                              ? (
                                   <div className='search-results-list'>
                                        {search.map((question, index) => (
                                             <p key={index} className='search-result' onClick={() => handleSearchItemClick(question)}>{question}</p>
                                        ))}
                                   </div>
                              ) : <></>}
                    </div>
               }

               <ul>
                         {role === 'admin' 
                              ?<>
                              <Tooltip title="Add Member" color='#7fad9e'>
                                   <li className="nav__item">
                                        <a href={"./create"} className="nav__link">{<PersonAddIcon style={{fontSize:'30px'}}/>}</a>
                                   </li>
                              </Tooltip>

                              <Tooltip title="Delete Member" color='#7fad9e'>
                                   <li className="nav__item">
                                        <a href={"./delete"} className="nav__link">{<PersonRemoveIcon style={{fontSize:'30px'}}/>}</a>
                                   </li>
                              </Tooltip>

                              <Tooltip title="Assign Faculty" color='#7fad9e'>
                                   <li className="nav__item">
                                        <a href={"./assign"} className="nav__link">{<SupervisorAccountIcon style={{fontSize:'30px'}}/>}</a>
                                   </li>
                              </Tooltip>

                              <Tooltip title="ListOut All" color='#7fad9e'>
                                   <li className="nav__item">
                                        <a href={"./listoutall"} className="nav__link">{<GroupsIcon style={{fontSize:'30px'}}/>}</a>
                                   </li>
                              </Tooltip>
                              </> 

                              :<Tooltip title="profile" color='#7fad9e'>
                                   <li className="nav__item">
                                        <a href={"#"} className="nav__link"  onClick={handleProfileClick}>{<Person2OutlinedIcon style={{fontSize:'30px'}}/>}</a>
                                   </li>
                              </Tooltip>
                         }

                         <Tooltip title="logout" color='#7fad9e'>
                              <li className="nav__item">
                              <a href="./login" className="nav__link" onClick={handleSignOut}>{<ExitToAppRoundedIcon style={{ fontSize: '30px' }} />}</a>
                              </li>                       
                         </Tooltip>
               </ul>

                    {/* Modal for displaying student or faculty info */}
                    <Modal open={modalVisible} onCancel={handleCloseModal} footer={null} centered className="custom-modal">
                    
                         {studentDetail ?.role === 'student' ? (
                              <div className='profile'>
                                   <h1 style={{textAlign:'center'}}>Profile</h1>

                                   <div className='profile-grid'>
                                        <div className='profile-left'>
                                             <img className="profile-img" src={Img}></img>
                                        <h2>{studentDetail.student.name}</h2>
                                        </div>
                                        <div className='profile-right'>
                                             <table>
                                             <tr><td>ID:</td><td>{studentDetail.student.id}</td></tr>
                                             <tr><td>Email:</td><td>{studentDetail.student.email}</td></tr>
                                             <tr><td>Sem:</td><td>{studentDetail.student.sem}</td></tr>
                                             <tr><td>Batch:</td><td>{studentDetail.student.batch}</td></tr>
                                             <tr><td>Total Query:</td><td>{studentDetail.student.total_query}</td></tr>
                                             </table>
                                        </div>
                                   </div>  
                              </div>
                         )
                         :(
                              <div className='profile'>
                                   <h1 style={{textAlign:'center'}}>Profile</h1>

                                   <div className='profile-grid'>
                                        <div className='profile-left'>
                                             <img className="profile-img" src={Img}></img>
                                             <h2>{facultyDetail.faculty.name}</h2>
                                        </div>
                                        <div className='profile-right'>
                                             <table>
                                                  <tr><td>ID:</td><td>{facultyDetail.faculty.id}</td></tr>
                                                  <tr><td>Email:</td><td>{facultyDetail.faculty.email}</td></tr>
                                                  <tr><td>Total Query:</td><td>{facultyDetail.faculty.total_query}</td></tr>
                                                  <tr><td>Solved:</td><td>{facultyDetail.faculty.solved_query}</td></tr>
                                                  <tr><td>Unsolved:</td><td>{facultyDetail.faculty.remaining_query}</td></tr>

                                             </table>
                                        </div>
                                   </div>  
                              </div>
                         )}
                    </Modal>

               </nav>
          )
}

export default Navbar