import { useNavigate } from "react-router";
import { MdLibraryAdd } from "react-icons/md";
import "../styles/employees.css";

function Employees() {
  const navigate = useNavigate();

  const createUserHandler = () => {
    navigate("/register", { replace: true });
  };

  return (
    <div>
      <div className="employeesheader-container">
        <div className="employeesheader">
          <h4>BEKIJK WERKNEMERS</h4>
          <h2>Werknemersoverzicht</h2>
        </div>
        <h5>
          <MdLibraryAdd className="icon" onClick={createUserHandler} />
          Voeg werknemer toe
        </h5>
      </div>
    </div>
  );
}

export default Employees;
