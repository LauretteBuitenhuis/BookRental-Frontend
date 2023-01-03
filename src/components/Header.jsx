import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/0012p000041aQ4LAAU.png'
import AuthContext from '../store/auth-context';

function Header() {
  // TODO: remove logout button for development purposes
  const navigate = useNavigate();
    const authCtx = useContext(AuthContext);

    const logoutHandler = () => {
        authCtx.logout();
        navigate('/', { replace: true });
    }


  return (
    <div className="header">
      <img src={logo} alt="Header" className="header-img" />
      <div>
        <button className="logout-button" onClick={logoutHandler}>
          {" "}
          logout
        </button>
      </div>{" "}
    </div>
  );
}


export default Header;