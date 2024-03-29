import './navbar.css'
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import GroupsIcon from "@mui/icons-material/Groups";
import { Tooltip, Modal } from "antd";
import { useState, useEffect } from 'react';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import axios from 'axios'

const Navbar = () => {
     const que = localStorage.getItem('searchedQue');
     const location = useLocation(); // Get the current location
     const isPublicQuestionPage = location.pathname === '/publicquestion';
     const studentDetail = JSON.parse(localStorage.getItem("isStudent"));
     const facultyDetail = JSON.parse(localStorage.getItem("isFaculty"));
     const role = JSON.parse(localStorage.getItem("isAdmin"))?.role;
     const [modalVisible, setModalVisible] = useState(false);
     const [searchQuery, setSearchQuery] = useState(''); //what user enters in textfield
     const [search, setSearch] = useState([]); // questions in list based on user search
     const [questions, setQuestions] = useState([]);//public questions from backend
     const navigate = useNavigate();


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

     const convertToBase64 = async (file) => {
          const reader = new FileReader();
          await reader.readAsDataURL(file);
          return new Promise((resolve, reject) => {
               reader.onload = () => resolve(reader.result);
               reader.onerror = (error) => reject(error);
          });
     };

     const studentImgUpload = async (e) => {
          let base64 = null;

          if (e.target.files && e.target.files.length > 0)
               base64 = await convertToBase64(e.target.files[0]);

          try {
               const res = await axios.put("http://localhost:3000/student/setprofileimage",
                    { id: studentDetail.id, image: base64 },
                    {
                         headers: {
                              "Content-Type": "application/json"
                         },
                    }
               );

               if (res.data.success) {
                    console.log(res.data.message);
                    studentDetail.student.image = base64
                    localStorage.setItem("isStudent", JSON.stringify(studentDetail));
                    window.location.reload(true);
               }

          } catch (e) {
               console.log(e);
          }
     }

     const facultyImgUpload = async (e) => {
          let base64 = null;

          if (e.target.files && e.target.files.length > 0)
               base64 = await convertToBase64(e.target.files[0]);

          try {
               const res = await axios.put("http://localhost:3000/faculty/setprofileimage",
                    { id: facultyDetail.id, image: base64 },
                    {
                         headers: {
                              "Content-Type": "application/json"
                         },
                    }
               );

               if (res.data.success) {
                    console.log(res.data.message);
                    facultyDetail.faculty.image = base64
                    localStorage.setItem("isFaculty", JSON.stringify(facultyDetail));
                    window.location.reload(true);
               }

          } catch (e) {
               console.log(e);
          }
     }

     const handleCloseModal = () => {
          setModalVisible(false);
     };

     const handleSignOut = () => {
          localStorage.clear();
          navigate("/login");
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
          localStorage.setItem('searchedQue', question);
          // setSelectedQuestion(question);
          setSearch([]);
          window.location.reload(true); //auto refresh the page and show the selected questions
     };

     const handleClearSearch = () => {
          setSearchQuery('');
          setSearch([]);
          // setSelectedQuestion(null);
          localStorage.removeItem('searchedQue');
          window.location.reload(true); //auto refresh the page and show the all questions
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
                                   placeholder={que ? 'clear filter...' : 'search question...'}
                                   value={searchQuery}
                                   onChange={handleSearchInputChange}
                              />

                              <CloseIcon style={{ cursor: 'pointer' }} onClick={handleClearSearch} />
                         </div>

                         {search.length > 0
                              ? (
                                   <div className='search-results-list'>
                                        {search.map((question, index) => {
                                             const words = question.split(" ");
                                             const shortenedQuery = words.length > 10 ? words.slice(0, 5).join(" ") + "..." : question;

                                             return (
                                                  <div
                                                       dangerouslySetInnerHTML={{ __html: shortenedQuery }}
                                                       key={index}
                                                       className='search-result'
                                                       onClick={() => handleSearchItemClick(question)}
                                                  >
                                                  </div>
                                             );
                                        })}
                                   </div>
                              ) : <></>}
                    </div>
               }

               <ul>
                         {role === 'admin' 
                              ?<>
                              <Tooltip title="Add Member" color='#3F72AF'>
                                   <li className="nav__item">
                                        <Link to={"/create"} className="nav__link">{<PersonAddIcon style={{ fontSize: '30px' }} />}</Link>
                                   </li>
                              </Tooltip>

                              <Tooltip title="Delete Member" color='#3F72AF'>
                                   <li className="nav__item">
                                        <Link to={"/delete"} className="nav__link">{<PersonRemoveIcon style={{ fontSize: '30px' }} />}</Link>
                                   </li>
                              </Tooltip>

                              <Tooltip title="Assign Faculty" color='#3F72AF'>
                                   <li className="nav__item">
                                        <Link to={"/assign"} className="nav__link">{<SupervisorAccountIcon style={{ fontSize: '30px' }} />}</Link>
                                   </li>
                              </Tooltip>

                              <Tooltip title="ListOut All" color='#3F72AF'>
                                   <li className="nav__item">
                                        <Link to={"/listoutall"} className="nav__link">{<GroupsIcon style={{ fontSize: '30px' }} />}</Link>
                                   </li>
                              </Tooltip>

                              <Tooltip title="Report" color='#3F72AF'>
                                   <li className="nav__item">
                                        <Link to={"/report"} className="nav__link">{<DateRangeIcon style={{ fontSize: '30px' }} />}</Link>
                                   </li>
                              </Tooltip>
                              </> 

                         : <Tooltip title="profile" color='#3F72AF'>
                                   <li className="nav__item">
                                        <a href={"#"} className="nav__link"  onClick={handleProfileClick}>{<Person2OutlinedIcon style={{fontSize:'30px'}}/>}</a>
                                   </li>
                              </Tooltip>
                         }

                    {/* <Tooltip title="logout" color='#3F72AF'>
                              <li className="nav__item">
                              <a href="./login" className="nav__link" onClick={handleSignOut}>{<ExitToAppRoundedIcon style={{ fontSize: '30px' }} />}</a>
                              </li>
                         </Tooltip> */}

                    <li className="nav__button" onClick={handleSignOut}>
                         Logout
                    </li>

               </ul>

                    {/* Modal for displaying student or faculty info */}
                    <Modal open={modalVisible} onCancel={handleCloseModal} footer={null} centered className="custom-modal">
                    
                    {studentDetail && studentDetail?.role === 'student' ? (
                              <div className='profile'>
                                   <h1 style={{textAlign:'center'}}>Profile</h1>

                                   <div className='profile-grid'>
                                        <div className='profile-left'>
                                        {studentDetail.student.image !== null
                                             ? <>
                                                  <img className="profile-img" src={studentDetail.student.image} alt="profile image"></img>
                                                  <CloseIcon className='clear-profile' onClick={studentImgUpload} />
                                             </>
                                             : <label>
                                                  <div className='img-upload'>
                                                       <DriveFolderUploadIcon />
                                                       <p>Click to Upload</p>
                                                  </div>
                                                  <input type="file" style={{ width: '0', height: '0' }} accept=".jpeg,.jpg,.png" onChange={studentImgUpload} />
                                             </label>
                                        }
                                        <h2>{studentDetail.student.name}</h2>
                                        </div>
                                        <div className='profile-right'>
                                        <table><tbody>
                                             <tr><td>ID:</td><td>{studentDetail.student.id}</td></tr>
                                             <tr><td>Email:</td><td>{studentDetail.student.email}</td></tr>
                                             <tr><td>Sem:</td><td>{studentDetail.student.semester}</td></tr>
                                             <tr><td>Batch:</td><td>{studentDetail.student.batch}</td></tr>
                                             <tr><td>Total Query:</td><td>{studentDetail.student.total_query}</td></tr>
                                        </tbody></table>
                                        </div>
                                   </div>  
                              </div>
                         )
                         : facultyDetail && facultyDetail?.role === 'faculty' ? (
                              <div className='profile'>
                                   <h1 style={{textAlign:'center'}}>Profile</h1>

                                   <div className='profile-grid'>
                                        <div className='profile-left'>
                                             {facultyDetail.faculty.image !== null
                                                  ? <>
                                                       <img className="profile-img" src={facultyDetail.faculty.image} alt="profile image"></img>
                                                       <CloseIcon className='clear-profile' onClick={facultyImgUpload} />
                                                  </>
                                                  : <label>
                                                       <div className='img-upload'>
                                                            <DriveFolderUploadIcon />
                                                            <p>Click to Upload</p>
                                                       </div>
                                                       <input type="file" style={{ width: '0', height: '0' }} accept=".jpeg,.jpg,.png" onChange={facultyImgUpload} />
                                                  </label>
                                             }
                                             <h2>{facultyDetail.faculty.name}</h2>
                                        </div>
                                        <div className='profile-right'>
                                             <table><tbody>
                                                  <tr><td>ID:</td><td>{facultyDetail.faculty.id}</td></tr>
                                                  <tr><td>Email:</td><td>{facultyDetail.faculty.email}</td></tr>
                                                  <tr><td>Total Query:</td><td>{facultyDetail.faculty.total_query}</td></tr>
                                                  <tr><td>Solved:</td><td>{facultyDetail.faculty.solved_query}</td></tr>
                                                  <tr><td>Unsolved:</td><td>{facultyDetail.faculty.remaining_query}</td></tr>
                                             </tbody></table>
                                        </div>
                                   </div>  
                              </div>
                         ) : <></>}
                    </Modal>

               </nav>
          )
}

export default Navbar