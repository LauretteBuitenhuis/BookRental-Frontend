import { useContext } from "react";
import AuthContext from "../store/auth-context";
import UserBookOverview from "./UserBookOverview";
import AdminBookOverview from "./AdminBookOverview";

function Books() {
  const authCtx = useContext(AuthContext);
  return authCtx.isAdmin ? <AdminBookOverview /> : <UserBookOverview />;
}

export default Books;
