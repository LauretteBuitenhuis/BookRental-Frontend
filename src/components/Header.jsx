import { useNavigate } from "react-router-dom";
import "../styles/header.css";
import logo from "../assets/0012p000041aQ4LAAU.png";
import logOutIcon from "../assets/ic_exit_to_app_24px.png";
import EmployeesIcon from "../assets/ic_supervisor_account_24px.png";
import InventoryIcon from "../assets/BooksOverview.png";
import AdminIcon from "../assets/ic_account_box_24px_admin.png";
import { useContext } from "react";
import AuthContext from "../store/auth-context";

function Header() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    auth.logout();
    navigate("/", { replace: true });
  };

  const employeesHandler = () => {
    navigate("/employees", { replace: true });
  };

  const redirectMainHandler = () => {
    navigate("main", { replace: true });
  };

  return (
    <div className="header">
      <div className="profile">
        <img src={AdminIcon} alt="Admin" />
        <h4>Voornaam Achternaam</h4>
      </div>
      <div className="button">
        <img src={InventoryIcon} alt="inventaris" />
        <button>
          <img
            src={EmployeesIcon}
            alt="Werknemers"
            onClick={employeesHandler}
          />
        </button>
        <button>
          <img src={logOutIcon} alt="log out" onClick={logoutHandler} />
        </button>
      </div>
      <button>
        <img src={logo} className="logo" onClick={redirectMainHandler} />
      </button>
    </div>
  );
}

export default Header;
