import './navbar.css'
import { useState} from 'react';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import SearchIcon from '@mui/icons-material/Search';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';     
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';

const Navbar = () => {
     const [active, setActive] = useState("nav__menu");
     const isStudent = JSON.parse(localStorage.getItem("isStudent")).role;
     //const isFaculty = JSON.parse(localStorage.getItem("isFaculty")).role;
     
     const navToggle = () => {
          active === 'nav__menu'
               ? setActive('nav__menu nav__active')
               : setActive('nav__menu')
     };

     return(
               <nav className="navbar">

                    <div className='nav__search'>
                         <input type='text' name='search-input' className='search__input' placeholder='search question...' />
                         <SearchIcon className='search__icon'/>
                    </div>

                    <ul className={active}>

                         {isStudent === "student" && <>
                              <li className="nav__item">
                                   <a href={"./sprofile"} className="nav__link">
                                   {active == "nav__menu nav__active" && < Person2OutlinedIcon className='active-icon'/>} Profile</a>
                              </li>
                              <li className="nav__item">
                                   <a href="#" className="nav__link">
                                   {active == "nav__menu nav__active" && <EmailOutlinedIcon className='active-icon'/>} Inbox</a>
                              </li>
                              <li className="nav__item">
                                   <a href="./login" className="nav__link">
                                   {active == "nav__menu nav__active" && <ExitToAppRoundedIcon className='active-icon'/>} Logout</a>
                              </li></>
                         }

                         {/* {isFaculty === "faculty" && <>
                         <li className="nav__item">
                              <a href="./fprofile" className="nav__link">
                              {active == "nav__menu nav__active" && < Person2OutlinedIcon className='active-icon'/>} Profile</a>
                         </li>
                         <li className="nav__item">
                              <a href="#" className="nav__link">
                              {active == "nav__menu nav__active" && <EmailOutlinedIcon className='active-icon'/>} Inbox</a>
                         </li>
                         <li className="nav__item">
                              <a href="./login" className="nav__link">
                              {active == "nav__menu nav__active" && <ExitToAppRoundedIcon className='active-icon'/>} Logout</a>
                         </li></>
                         } */}

                    </ul>
               
                    <div className='nav__toggler' onClick={navToggle}>
                         <div className='line-1'></div>
                         <div className='line-2'></div>
                         <div className='line-3'></div>
                    </div>

                    <DarkModeRoundedIcon className='theme-btn'/>
               
               </nav>
          )
}

export default Navbar