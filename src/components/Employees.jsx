import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { MdLibraryAdd } from "react-icons/md";
import AuthContext from "../store/auth-context";
import logOutIcon from '../assets/ic_exit_to_app_24px.png';
import EmployeesIcon from '../assets/ic_supervisor_account_24px.png';
import InventoryIcon from '../assets/BooksOverview.png';
import AdminIcon from '../assets/ic_account_box_24px_admin.png';
import '../styles/employees.css';

import { TextInput } from "./TextInput";
import { CheckboxInput } from "./CheckboxInput";
import { SortedTable } from "./SortedTable";




function Employees() {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);

    const [users, setUsers] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [deleteModus, setDeleteModus] = useState(false);
    const [deleteId, setDeleteId] = useState();


    function getAllUsers() {
        fetch("http://localhost:8082/user/all")
            .then((res) => res.json())
            .then((data) => setUsers(data));
    }

    useEffect(() => {
        getAllUsers();
    }, []);


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

    // TODO - filtering
    // TODO - searching
    function search() { }

    function showDeletePopUp(user) {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setDeleteId(user.id);
        setDeleteModus(true);
    }

    function deleteUser(id) {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${id}/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: auth.token,
            },
        }).then(() => getAllUsers());
        setFirstName("");
        setDeleteId();
        setDeleteModus(false);
    }



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

                <div className="inventory-container-employees">

                    <TextInput name="search" placeholder="Zoek..." onChange={search} />
                    <CheckboxInput name="isAvailable" label="in Dienst" />

                    <MdLibraryAdd className="icon" onClick={createUserHandler} />Voeg werknemer toe
                    <SortedTable
                        showDeleteModal={showDeletePopUp}
                        data={users}
                        columns={[
                            {
                                key: "lastName",
                                sortable: true,
                            },
                            {
                                key: "firstName",
                                sortable: true,
                            },
                            {
                                key: "email",
                                sortable: false,
                            },
                        ]}
                    />
                </div>
                {deleteModus && (
        <div className="inventory-container">
          <div className="pop-up">
            <h3>Weet je zeker dat je {firstName +" " + lastName} uit het systeem wil halen?</h3>
            <div>
              <button
                type="submit"
                className="button"
                onClick={() => deleteUser(deleteId)}
              >
                Ja, verwijder werknemer
              </button>
              <button
                type="submit"
                className="button"
                onClick={() => setDeleteModus(false)}
              >
                Nee, annuleren
              </button>
            </div>
          </div>
        </div>
      )}

            </div>
            <div>

            </div>


        </div>

    )
}

export default Employees