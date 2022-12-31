import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../Store/auth-context';

function AdminPage() {
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);

    const logoutHandler = () => {
        authCtx.logout();
        navigate('/', { replace: true });
    }

    return (
        <div className="adminheader-container">
            <div className="adminheader">
                <h4>OVERZICHT</h4>
                <h2>Reserveringen</h2>
            </div>

            <nav className='navbar'>
                {/* <button className='request-button' > to user homepage</button>
                <button className='request-button' > boek toevoegen </button>
                <button className='request-button' > werknemer toevoegen</button>
                <span className="my-spacer">Voornaam Achternaam</span> */}
                <button className='logout-button' onClick={logoutHandler} > logout</button>
            </nav>
        </div>
    )
}

export default AdminPage