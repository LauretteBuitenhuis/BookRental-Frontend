import { useContext } from "react";
import AuthContext from "../store/auth-context";

import "../styles/mainAdmin.css";

function AdminPage() {
  const authCtx = useContext(AuthContext);

  return (
    <div className="adminheader-container">
      <div className="adminheader">
        <h4>OVERZICHT</h4>
        <h2>Reserveringen</h2>
      </div>
    </div>
  );
}

export default AdminPage;
