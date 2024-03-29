import './logo.css'
import SsLogo from '../../assets/SsLogo.png'

const Logo = () => {
       return (
            <div className="logo">
                 <img src={SsLogo} alt="logo" className='logo-item' />
          </div>
       );
};

export default Logo