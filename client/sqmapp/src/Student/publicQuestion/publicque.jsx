import './publicque.css';
import Sidebar from '../../components/Sidebar/sidebar'
import Footer from '../../components/Footer/footer'

const PublicQuestion = () => {
     return (
          <>
               <div className='publicque-container'>
               <Sidebar />

               <div className='publicque-body'>
                         
               <h1>public que</h1>
               </div>

               <Footer />
               </div>
               
          </>
     )
}

export default PublicQuestion