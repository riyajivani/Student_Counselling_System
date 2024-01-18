import Sidebar from '../../components/Sidebar/sidebar'
import Footer from '../../components/Footer/footer'
import './solvedByYou.css'

const solvedByYou = () => {
  return (
     <div className='sby-container'>
     <Sidebar />

     <div className='sby-body'>
               
     <h1>solvedByYou</h1>
     </div>

     <Footer />
     </div>
  )
}

export default solvedByYou