import { Navigate, useNavigate } from "react-router";
import { MdLibraryAdd } from "react-icons/md";



function Employees() {
    const navigate = useNavigate();

    const createUserHandler = () => {
        navigate("/register", { replace: true });
    };

    return (
        <div className="inventaris-container">

            <div className="adminheader-container">
                <div className="adminheader">
                    <h4>BEKIJK WERKNEMERS</h4>
                    <h2>Werknemersoverzicht</h2>
                </div>

                {/* <nav className='navbar'>
                <button><img src={AdminIcon} alt='Admin'/></button>
                <span>Voornaam Achternaam</span> 
                <button> <img src={InventoryIcon} alt='Boeken inventaris' onClick={bookInventoryHandler} /></button>
                <button> <img src={EmployeesIcon} alt='Werknemers' /></button>               
                <button><img src={logOutIcon} alt='log out' onClick={logoutHandler}/></button>
            </nav> */}
            </div>
            <h5><MdLibraryAdd className="icon" onClick={createUserHandler} />Voeg werknemer toe </h5>

        </div>

    )
}

export default Employees