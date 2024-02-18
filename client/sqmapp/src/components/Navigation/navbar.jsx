import './navbar.css'
import SearchIcon from '@mui/icons-material/Search';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';    
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import GroupsIcon from "@mui/icons-material/Groups";
import { Tooltip, Modal } from "antd";
import { useState } from 'react';
import Img from "../../assets/profile.jpg";

const Navbar = () => {
     const studentDetail = JSON.parse(localStorage.getItem("isStudent"));
     //const facultyDetail = JSON.parse(localStorage.getItem("isFaculty"));
      const role = JSON.parse(localStorage.getItem("isAdmin"))?.role;
      const [modalVisible, setModalVisible] = useState(false);

      const handleProfileClick = () => {
          setModalVisible(true);
        };
      
     const handleCloseModal = () => {
          setModalVisible(false);
     };


     return(
               <nav className="navbar">

                    {role !== 'admin' &&
                         <div className='nav__search'>
                              <input type='text' name='search-input' className='search__input' placeholder='search question...' />
                              <SearchIcon className='search__icon'/>
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
                                   <a href="./login" className="nav__link">{<ExitToAppRoundedIcon style={{fontSize:'30px'}}/>}</a>
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
                                             <h2>Riya Jivani</h2>
                                        </div>
                                        <div className='profile-right'>
                                             <table>
                                                  <tr><td>ID:</td><td>21ITUOS001</td></tr>
                                                  <tr><td>Email:</td><td>riya@gmail.com</td></tr>
                                                  <tr><td>Sem:</td><td>6</td></tr>
                                                  <tr><td>Batch:</td><td>A</td></tr>
                                                  <tr><td>Total Query:</td><td>25</td></tr>
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
                                             <h2>Riya Jivani</h2>
                                        </div>
                                        <div className='profile-right'>
                                             <table>
                                                  <tr><td>ID:</td><td>ITFAC101</td></tr>
                                                  <tr><td>Email:</td><td>rav@ddu.ac.in</td></tr>
                                                  <tr><td>Batch:</td><td>A</td></tr>
                                                  <tr><td>Total Query:</td><td>25</td></tr>
                                                  <tr><td>Solved Query:</td><td>20</td></tr>

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