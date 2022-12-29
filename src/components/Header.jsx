import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../assets/0012p000041aQ4LAAU.png'
import AuthContext from '../Store/auth-context';

function Header() {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
    navigate('/',{replace: true});
  };

  return (
    <div className="header">
      <img src={logo} alt='Header' className='header-img' />
      <nav>
        {isLoggedIn &&(<button className="logout-button" onClick={logoutHandler}>logout</button>
        )} 
      </nav>
    </div>
  )
};

export default Header;