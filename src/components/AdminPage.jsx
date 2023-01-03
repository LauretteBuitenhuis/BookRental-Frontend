import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";
import logOutIcon from '../assets/ic_exit_to_app_24px.png';
import EmployeesIcon from '../assets/ic_supervisor_account_24px.png';
import InventoryIcon from '../assets/BooksOverview.png';
import AdminIcon from '../assets/ic_account_box_24px_admin.png';


function AdminPage() {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="adminheader-container">
      <div className="adminheader">
        <h4>OVERZICHT</h4>
        <h2>Reserveringen</h2>
      </div>


            <nav className='navbar'>
                <div><img src={AdminIcon} alt='Admin'/></div>
                <span className="my-spacer">Voornaam Achternaam</span> 
                <button> <img src={InventoryIcon} alt='Boeken inventaris' /></button>
                <button> <img src={EmployeesIcon} alt='Werknemers' /></button>               
                <button><img src={logOutIcon} alt='log out' onClick={logoutHandler}/></button>
            </nav>
        </div>
    )

}

export default AdminPage;
