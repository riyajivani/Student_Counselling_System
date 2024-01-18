import './profile.css';
import Sidebar from '../../components/Sidebar/sidebar'
import Footer from '../../components/Footer/footer'

const Profile = () => {
     return (
          <>
               <div className='profile-container'>
               <Sidebar />

               <div className='profile-body'>
                         <h1>profile</h1>  
                         

               </div>

               <Footer />
               </div>
               
          </>
     )
}

export default Profile