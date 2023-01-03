import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";

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

      <nav className="navbar">
        {/* <div>User icon...<div>
                <span className="my-spacer">Voornaam Achternaam</span> */}
        <button className="logout-button" onClick={logoutHandler}>
          {" "}
          logout
        </button>
      </nav>
    </div>
  );
}

export default UserPage;
