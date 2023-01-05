import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";
import "../styles/mainUser.css";
import { MdLibraryAdd } from "react-icons/md";

function UserPage() {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.logout();
    navigate("/", { replace: true });
  };

  const bookInventoryHandler = () => {
    navigate("/inventory", { replace: true });
  };

  return (
    <div>
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
          <h5>
            Verzoeken{" "}
            <MdLibraryAdd className="icon" onClick={bookInventoryHandler} />
          </h5>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
