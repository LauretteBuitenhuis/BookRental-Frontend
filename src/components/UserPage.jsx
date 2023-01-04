import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";
import logOutIcon from '../assets/ic_exit_to_app_24px.png';
import UserIcon from '../assets/ic_account_box_24px_user.png';
import '../styles/mainUser.css';
import { MdLibraryAdd } from "react-icons/md";

function UserPage() {
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);

    const logoutHandler = () => {
        authCtx.logout();
        navigate("/", { replace: true });
    };

    const bookInventoryHandler = () => {
        navigate("/books", { replace: true });
    };

    return (
        <div>
            <div className="userheader-container">
                <div className="userheader">
                    <h4>OVERZICHT</h4>
                    <h2>Reserveringen</h2>
                </div>

                <nav className='user-navbar'>
                    <img src={UserIcon} alt='Admin' />
                    <span>Voornaam Achternaam</span>
                    <button><img src={logOutIcon} alt='log out' onClick={logoutHandler} /></button>
                </nav>
            </div>

            <div className="main-container">
                <div className="possessions">
                    <h5>Huidige bezittingen</h5>
                    <table>
                        <tr>
                            <th>title</th>
                            <th>Author</th>
                            <th>ISBN</th>
                            <th>Start-date</th>
                        </tr>
                    </table>
                </div>

                <div className="requests">
                    <h5>Verzoeken <MdLibraryAdd className="icon"onClick={bookInventoryHandler} /></h5>
                </div>
            </div>


        </div>

    )

}

export default UserPage;
