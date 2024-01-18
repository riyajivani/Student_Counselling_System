import {Route, Routes} from 'react-router-dom';
import SignUp from './components/SignUp/signup';
import Login from './components/Login/login';

//student
import GroupProfile from './Student/GroupProfile/groupProfile';
import AskMentor from './Student/AskMentor/askmentor'
import MyQuestion from './Student/MyQuestion/myquestion'
import Note from './Student/Note/note'
import PublicQuestion from './Student/publicQuestion/publicque'
import SProfile from './Student/SProfile/sprofile'

//faculty
import StudentList from './Faculty/StudentList/studentList'
import AskedQue from './Faculty/AskedQue/askedQue'
import AskFaculty from './Faculty/AskFaculty/askFaculty'
import SolvedByYou from './Faculty/SolvedByYou/solvedByYou'
import FProfile from './Faculty/FProfile/fprofile'

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
          <Route exact path='/note' element={<Note/>}></Route>
          <Route exact path='/publicquestion' element={<PublicQuestion/>}></Route>
          <Route exact path='/sprofile' element={<SProfile />}></Route>
        
          <Route exact path='/studentlist' element={<StudentList />}></Route>
          <Route exact path='/askedquestion' element={<AskedQue/>}></Route>
          <Route exact path='/askfaculty' element={<AskFaculty/>}></Route>
          <Route exact path='/solvedbyyou' element={<SolvedByYou />}></Route>
          <Route exact path='/fprofile' element={<FProfile />}></Route>
        </Routes>
          
      </div>
  )
}

export default App;
