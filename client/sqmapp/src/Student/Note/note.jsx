import './note.css';
import Sidebar from '../../components/Sidebar/sidebar'
import Footer from '../../components/Footer/footer'


const Note = () => {
     return (
          <>
               <div className='note-container'>
               <Sidebar />

               <div className='note-body'>
               <h1>note</h1>

               </div>

               <Footer />
               </div>
               
          </>
     )
}

export default Note