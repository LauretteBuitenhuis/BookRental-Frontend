import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { MdLibraryAdd } from "react-icons/md";
import AuthContext from "../store/auth-context";
import "../styles/employees.css";
import { TextInput } from "./TextInput";
import { SortedTable } from "./SortedTable";

function Employees() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [deleteModus, setDeleteModus] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [addModus, setAddModus] = useState(false);
  const [updateModus, setUpdateModus] = useState(false);
  const [updatedId, setUpdatedId] = useState();

  function getAllUsers() {
    fetch("http://localhost:8082/user/all")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  function updateUser(user) {
    setAddModus(true);
    setUpdateModus(true);
    setUpdatedId(user.id);
    setFirstName(user.FirstName);
    setLastName(user.LastName);
    setEmail(user.email);
  }

  function sendUserUpdate() {
    console.log("Send update");
    let newUser = {
      id: updatedId,
      firstName,
      lastName,
      email,
    };
    fetch(`http://localhost:8082/user/${newUser.id}/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
      body: JSON.stringify(newUser),
    });
    setFirstName("");
    setLastName("");
    setEmail("");
    setUpdatedId();
    setUpdateModus(false);
    setAddModus(false);
  }

  function leaveScreen() {
    setUpdateModus(false);
    setAddModus(false);
  }

  const logoutHandler = () => {
    authCtx.logout();
    navigate("/", { replace: true });
  };

  const bookInventoryHandler = () => {
    navigate("/books", { replace: true });
  };

  const createUserHandler = () => {
    navigate("/register", { replace: true });
  };

  // TODO - filtering
  // TODO - searching
  function search() {}

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
        </div>

        <div className="inventory-container-employees">
          <TextInput name="search" placeholder="Zoek..." onChange={search} />
          <div className="table-options">
            <MdLibraryAdd className="icon" onClick={createUserHandler} />
            Voeg werknemer toe
          </div>
          <SortedTable
            showDeleteModal={showDeletePopUp}
            updateFunction={updateUser}
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

        {addModus && (
          <div className="inventory-container">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (updateModus === false) {
                  //addUser();
                } else {
                  sendUserUpdate();
                }
              }}
            >
              {" "}
              <label>Voornaam:</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <label>Achternaam:</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
              <label>E-mail:</label>
              <input
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <button type="submit" className="button">
                {updateModus ? "Bijwerken" : "Als nieuwe werknemer toevoegen"}
              </button>
              <button
                type="submit"
                className="button"
                onClick={() => leaveScreen()}
              >
                Annuleren
              </button>
            </form>
          </div>
        )}

        {deleteModus && (
          <div className="inventory-container">
            <div className="pop-up">
              <h3>
                Weet je zeker dat je {firstName + " " + lastName} uit het
                systeem wil halen?
              </h3>
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
      <div></div>
    </div>
  );
}

export default Employees;
