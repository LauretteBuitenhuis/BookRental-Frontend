import "./styles/index.css";
import { CreateAccount } from "./components/CreateAccount";
import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Main from "./components/Main";
import Reservations from "./components/Reservations";
import Header from "./components/Header";
import AuthContext from "./store/auth-context";
import { Inventory } from "./components/Inventory";
import Employees from "./components/Employees";

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn();

  return (
    <div className="app-container">
      <Header />
      <Routes>
        {!isLoggedIn && <Route path="/" element={<Login />} />}
        {isLoggedIn && <Route path="/main" element={<Main />} />}
        {isLoggedIn && authCtx.isAdmin && <Route path="/register" element={<CreateAccount />} />}
        {isLoggedIn && <Route path="/inventory" element={<Inventory />} />}
        {isLoggedIn && authCtx.isAdmin && <Route path="employees" element={<Employees />} />}
        {isLoggedIn && <Route path="reservations" element={<Reservations />} />}
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/main" : "/"} replace />}
        />
      </Routes>
    </div>
  );
}

export default App;
