import {Route, Routes} from 'react-router-dom';
import SignUp from './components/SignUp/signup';
import Login from './components/Login/login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//student
import GroupProfile from './Student/GroupProfile/groupProfile';
import AskMentor from './Student/AskMentor/askmentor'
import MyQuestion from './Student/MyQuestion/myquestion'
import PublicQuestion from './Student/publicQuestion/publicque'

//faculty
import StudentList from './Faculty/StudentList/studentList'
import AskedQue from './Faculty/AskedQue/askedQue'
import AskFaculty from './Faculty/AskFaculty/askFaculty'
import SolvedByYou from './Faculty/SolvedByYou/solvedByYou'

//admin
import Create from './Admin/create/create'
import ListoutAll from './Admin/listoutAll/listoutAll'
import DeleteOne from './Admin/delete/delete';
import Assign from './Admin/assign/assign';

function App() {
  
  return ( 
    <div className='App'>
      
        <Routes>
          <Route exact path='/' element={<Login/>}/>
          <Route exact path='/signup' element={<SignUp/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/groupprofile' element={<GroupProfile />}></Route>
          <Route exact path='/askmentor' element={<AskMentor />}></Route>
          <Route exact path='/myquestion' element={<MyQuestion />}></Route>
          <Route exact path='/publicquestion' element={<PublicQuestion/>}></Route>
        
          <Route exact path='/studentlist' element={<StudentList />}></Route>
          <Route exact path='/askedquestion' element={<AskedQue/>}></Route>
          <Route exact path='/askfaculty' element={<AskFaculty/>}></Route>
          <Route exact path='/solvedbyyou' element={<SolvedByYou />}></Route>

          <Route exact path='/create' element={<Create />}></Route>
          <Route exact path='/delete' element={<DeleteOne/>}></Route>
          <Route exact path='/assign' element={<Assign/>}></Route>
          <Route exact path='/listoutall' element={<ListoutAll />}></Route>
        </Routes>

        <ToastContainer position='top-left' theme='dark' autoClose={1000} icon={false}/>
      </div>
  )
}

export default App;
