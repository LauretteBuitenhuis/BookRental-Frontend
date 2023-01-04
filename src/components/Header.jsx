import { useNavigate } from 'react-router-dom';
import logo from '../assets/0012p000041aQ4LAAU.png'

function Header() {
  const navigate = useNavigate();

    const redirectMainHandler = () => {
      navigate('main', {replace: true});
    }

  return (
    <div className="header">
      <button><img src={logo} alt="Header" className="header-img" onClick={redirectMainHandler}/></button>
    </div>
  );
}


export default Header;