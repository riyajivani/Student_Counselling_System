import './myquestion.css';
import Sidebar from '../../components/Sidebar/sidebar'
import Footer from '../../components/Footer/footer'

const MyQuestion = () => {
     return (
          <>
               <div className='myque-container'>
               <Sidebar />

               <div className='myque-body'>
                         
               <h1>my question</h1>
               </div>

               <Footer />
               </div>
               
          </>
     )
}

export default MyQuestion