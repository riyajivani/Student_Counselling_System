import './navbar.css'
import SearchIcon from '@mui/icons-material/Search';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';    
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import GroupsIcon from "@mui/icons-material/Groups";
import { Tooltip } from "antd";

const Navbar = () => {
     //const isStudent = JSON.parse(localStorage.getItem("isStudent"))?.role;
     //const isFaculty = JSON.parse(localStorage.getItem("isFaculty"))?.role;
      const role = JSON.parse(localStorage.getItem("isAdmin"))?.role;

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
                                        <a href={"#"} className="nav__link"  onClick={handleProfileClick}>{<Person2OutlinedIcon/>}</a>
                                   </li>
                              </Tooltip>
                         }

                         <Tooltip title="logout" color='#7fad9e'>
                              <li className="nav__item">
                                   <a href="./login" className="nav__link">{<ExitToAppRoundedIcon style={{fontSize:'30px'}}/>}</a>
                              </li>                       
                         </Tooltip>
                    </ul>
               
               </nav>
          )
}

export default Navbar