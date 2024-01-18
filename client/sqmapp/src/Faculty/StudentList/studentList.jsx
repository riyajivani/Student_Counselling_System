import Sidebar from '../../components/Sidebar/sidebar'
import Footer from '../../components/Footer/footer'
import './studentList.css'

const studentList = () => {
  return (
     <div className='studentlist-container'>
     <Sidebar />

     <div className='studentlist-body'>
               
     <h1>studentList</h1>
     </div>

     <Footer />
     </div>
  )
}

export default studentList
