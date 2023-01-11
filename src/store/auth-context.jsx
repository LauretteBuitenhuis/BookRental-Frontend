import React, { useState, useCallback } from "react";

const AuthContext = React.createContext({
  token: null,
  isLoggedIn: () => false,
  login: (_loginUserDto) => {},
  logout: () => {},
  isAdmin: false,
  name: null,
});

export const AuthContextProvider = ({ children }) => {
  const initialToken = localStorage.getItem("token");
  const initialIsAdmin = localStorage.getItem("isAdmin") === "true";

  const [token, setToken] = useState(initialToken);
  const [isAdmin, setIsAdmin] = useState(initialIsAdmin);
  const [name, setName] = useState();

  const isLoggedIn = useCallback(() => {
    return token != null;
  }, [token]);

  const loginHandler = (loginUserDto) => {
    setToken(loginUserDto.token);
    localStorage.setItem("token", loginUserDto.token);

    const userDtoIsAdmin = loginUserDto.isAdmin === "admin";
    setIsAdmin(userDtoIsAdmin);
    localStorage.setItem("isAdmin", userDtoIsAdmin);

    setName(loginUserDto.name);
    localStorage.setItem("name",loginUserDto.name)
  };

  const logoutHandler = () => {
    setToken(null);
    setIsAdmin(false);
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
  };

  const contextValue = {
    token,
    isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    isAdmin,
    name,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
