import './listoutAll.css'
import Navbar from '../../components/Navigation/navbar'

const ListoutAll = () => {
  return (
     <div className='listout-container'>
      <Navbar/>
      
      <div className='listout-body'> 
        <h1>list of students</h1>
        <h1>list of faculties</h1>
      </div>
     </div>
  )
}

export default ListoutAll