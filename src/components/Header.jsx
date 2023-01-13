import { useNavigate } from "react-router-dom";
import "../styles/header.css";
import logo from "../assets/0012p000041aQ4LAAU.png";
import { useContext } from "react";
import AuthContext from "../store/auth-context";
import { BsPeopleFill, BsPersonFill } from "react-icons/bs";
import { TbLogout } from "react-icons/tb";
import { FaBook } from "react-icons/fa";


function Header() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const name = auth.name;

  const logoutHandler = () => {
    auth.logout();
    navigate("/", { replace: true });
  };

  const employeesHandler = () => {
    navigate("/employees", { replace: true });
  };

  const inventoryHandler = () => {
    navigate("/inventory", { replace: true });
  };

  const redirectMainHandler = () => {
    navigate("main", { replace: true });
  };

  function EmployeeButton() {
    if (auth.isAdmin === true) {
      return (
        <button>
          <BsPeopleFill className="header-icon red"
            onClick={employeesHandler}
          />
        </button>
      );
    }
    return null;
  }

  if (window.location.pathname === "/") return null;

  return (
    <div className="header">
      <button><img src={logo} alt="logo" onClick={redirectMainHandler} /> </button>

      <div>
        <button><FaBook className={auth.isAdmin ? "header-icon red" : "header-icon green"} onClick={inventoryHandler} /></button>
        <EmployeeButton classname="header-icon red" />
      </div>

      <div className="profile">
        <BsPersonFill className={auth.isAdmin ? "header-icon red" : "header-icon green"} />
        <h4> {name} </h4>
        <button><TbLogout className="header-icon grey" onClick={logoutHandler} /></button>

      </div>
    </div>
  );
}

export default Header;
