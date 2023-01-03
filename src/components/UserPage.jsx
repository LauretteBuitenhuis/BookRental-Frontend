import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";
import logOutIcon from '../assets/ic_exit_to_app_24px.png';
import UserIcon from '../assets/ic_account_box_24px_user.png';
import '../styles/mainUser.css';


function UserPage() {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="userheader-container">
      <div className="userheader">
        <h4>OVERZICHT</h4>
        <h2>Reserveringen</h2>
      </div>

            <nav className='user-navbar'>
                <button><img src={UserIcon} alt='Admin'/></button>
                <span>Voornaam Achternaam</span>                
                <button><img src={logOutIcon} alt='log out' onClick={logoutHandler}/></button>
            </nav>
        </div>
    )

}

export default UserPage;
