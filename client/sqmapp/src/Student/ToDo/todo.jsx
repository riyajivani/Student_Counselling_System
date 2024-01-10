import './todo.css';
import Sidebar from '../../components/Sidebar/sidebar'
import Footer from '../../components/Footer/footer'

const Todo = () => {
     return (
          <>
               <div className='todo-container'>
               <Sidebar />

               <div className='todo-body'>
                         
               <h1>todo</h1>
               </div>

               <Footer />
               </div>
               
          </>
     )
}

export default Todo