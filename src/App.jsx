import "./styles/index.css";
import { CreateAccount } from "./components/CreateAccount";
import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Main from "./components/Main";
import Header from "./components/Header";
import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn();

  return (
    <div className="app-container">
      <Header />
      <Routes>
        {!isLoggedIn && <Route path="/" element={<Login />} />}
        {isLoggedIn && <Route path="main" element={<Main />} />}
        {isLoggedIn && <Route path="/register" element={<CreateAccount />} />}
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/main" : "/"} replace />}
        />
      </Routes>
    </div>
  );
}

export default App;
