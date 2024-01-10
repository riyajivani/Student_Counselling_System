import './askmentor.css';
import Sidebar from '../../components/Sidebar/sidebar'
import Footer from '../../components/Footer/footer'
import SendIcon from '@mui/icons-material/Send';
import { Button } from 'antd';

const AskMentor = () => {

     const handleAsk = () => {

     }

     return (
               <div className='askmentor-container'>
                    <Sidebar />

                    <div className='askmentor-body'>

                         <h1>Have a Doubt
                              ???</h1>
                         
                         <div className='ask__form'>
                              <textarea className='input__que' rows={15} cols={300} placeholder='enter your question here and send it...🖊️'/>
                              <button type='button' className='ask__btn' onClick={handleAsk}><SendIcon/></button>
                         </div>
                    </div>

                    <Footer />
               </div>
     )
}

export default AskMentor