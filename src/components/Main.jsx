import { useContext } from "react";
import AuthContext from "../store/auth-context";
import AdminPage from "./AdminPage";
import UserPage from "./UserPage";

function Main() {
  const authCtx = useContext(AuthContext);
  return authCtx.isAdmin ? <AdminPage /> : <UserPage />;
}

export default Main;
