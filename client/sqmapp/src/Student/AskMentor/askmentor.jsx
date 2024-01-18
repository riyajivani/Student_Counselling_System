import './askmentor.css';
import Sidebar from '../../components/Sidebar/sidebar'
import Footer from '../../components/Footer/footer'
import SendIcon from '@mui/icons-material/Send';
import { Button } from 'antd';

const AskMentor = () => {

     const handleAsk = async () => {
          // try{
          //      const response = await fetch('your_api_endpoint', {
          //           method: 'POST',
          //           headers: {
          //           'Content-Type': 'application/json',
          //           },
          //           body: JSON.stringify({ question }),
          //      });
          
          //      if (response.ok) {
          //           history.push(`/askedque?question=${encodeURIComponent(question)}`);
          //      } else {
          //           console.error('Failed to submit question');
          //      }
          // }catch(error) {
          //      console.error('Error occurred while submitting question', error);
          // }

     }

     return (
               <div className='askmentor-container'>
                    <Sidebar />

                    <div className='askmentor-body'>

                         <h1>Have a Doubt
                              ???</h1>
                         
                         <div className='ask__form'>
                              <textarea className='input__que' rows={14} cols={300} placeholder='enter your question here and send it...🖊️'/>
                              <button type='button' className='ask__btn' onClick={handleAsk}><SendIcon/></button>
                         </div>
                    </div>

                    <Footer />
               </div>
     )
}

export default AskMentor