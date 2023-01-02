import { useContext } from "react";
import AuthContext from "../store/auth-context";
import AdminPage from "./AdminPage";
import UserPage from "./UserPage";

function Main() {
  const authCtx = useContext(AuthContext);

  const isAdmin = authCtx.isAdmin;

  if (isAdmin) {
    return (
      <div>
        <AdminPage />
      </div>
    );
  } else {
    return (
      <div>
        <UserPage />
      </div>
    );
  }
}

export default Main;
