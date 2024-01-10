import React from 'react';
import './footer.css';
import { Footer } from 'antd/es/layout/layout';
import GroupsIcon from '@mui/icons-material/Groups';
import QuizIcon from '@mui/icons-material/Quiz';
import EditNoteIcon from '@mui/icons-material/EditNote';
import EmailIcon from '@mui/icons-material/Email';
import { Tooltip } from 'antd';     

const MyFooter = () => {
     return (
          <Footer className='footer'>
               
               <div className='footer-icon'>
                    {/* <a href="#" className='footer__link'><GroupsIcon /></a>
                    <a href="#" className='footer__link'><QuizIcon /></a>
                    <a href="#" className='footer__link'><EditNoteIcon /></a>
                    <a href="#" className='footer__link'><EmailIcon/></a> */}

                    <Tooltip title="Group profile" arrow={false}>
                         <a href="#" className='footer__link'><GroupsIcon /></a>
                    </Tooltip>

                    <Tooltip title="Ask Mentor" arrow={false}>
                         <a href="#" className='footer__link'><QuizIcon /></a>
                    </Tooltip>

                    <Tooltip title="Note" arrow={false}>
                         <a href="#" className='footer__link'><EditNoteIcon /></a>
                    </Tooltip>

                    <Tooltip title="Inbox" arrow={false}>
                         <a href="#" className='footer__link'><EmailIcon /></a>
                    </Tooltip>
                    
               </div>

               <div className='footer-text'>
                    <p>©All Rights Resrved By <a href="https://www.ddu.ac.in/">DHARMSINH DESAI UNIVERSITY</a></p>
               </div>
               
          </Footer>
     );
}

export default MyFooter;