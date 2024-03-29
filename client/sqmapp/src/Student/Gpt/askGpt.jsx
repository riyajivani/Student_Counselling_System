import Sidebar from '../../components/Sidebar/sidebar'
import './askgpt.css'

const AskGpt = () => {
     return (
          <div className="gpt-container">
               <Sidebar />
               <div className="gpt-body">
                    <h1>ask gpt</h1>
               </div>
          </div>
     )
}

export default AskGpt