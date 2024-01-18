import {Route, Routes} from 'react-router-dom';
import SignUp from './components/SignUp/signup';
import Login from './components/Login/login';
import GroupProfile from './Student/GroupProfile/groupProfile';
import AskMentor from './Student/AskMentor/askmentor'
import MyQuestion from './Student/MyQuestion/myquestion'
import Note from './Student/Note/note'
import PublicQuestion from './Student/publicQuestion/publicque'
import Todo from './Student/ToDo/todo'


function App() {
  const user = localStorage.getItem("token");
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
          <Route exact path='/todo' element={<Todo/>}></Route>
        </Routes>
          
      </div>
  )
}

export default App;
