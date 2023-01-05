import { useContext } from "react";
import { useNavigate } from "react-router";
import { MdLibraryAdd } from "react-icons/md";
import AuthContext from "../store/auth-context";
import logOutIcon from '../assets/ic_exit_to_app_24px.png';
import EmployeesIcon from '../assets/ic_supervisor_account_24px.png';
import InventoryIcon from '../assets/BooksOverview.png';
import AdminIcon from '../assets/ic_account_box_24px_admin.png';
import '../styles/employees.css';




function Employees() {
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);

    const logoutHandler = () => {
        authCtx.logout();
        navigate("/", { replace: true });
    };

    const bookInventoryHandler = () => {
        navigate("/books", { replace: true });
    }


    const createUserHandler = () => {
        navigate("/register", { replace: true });
    };

    return (
        <div>
            <div>

                <div className="employeesheader-container">
                    <div className="employeesheader">
                        <h4>BEKIJK WERKNEMERS</h4>
                        <h2>Werknemersoverzicht</h2>
                    </div>

                    <nav className="employeesnavbar">
                        <img src={AdminIcon} alt='Admin' />
                        <span>Voornaam Achternaam</span>
                        <button> <img src={InventoryIcon} alt='Boeken inventaris' onClick={bookInventoryHandler} /></button>
                        <img className="static" src={EmployeesIcon} alt='Werknemers' />
                        <button><img src={logOutIcon} alt='log out' onClick={logoutHandler} /></button>
                    </nav>
                </div>
            </div>
            <div>
                <h5><MdLibraryAdd className="icon" onClick={createUserHandler} />Voeg werknemer toe </h5>
            </div>


        </div>

    )
}

export default Employees