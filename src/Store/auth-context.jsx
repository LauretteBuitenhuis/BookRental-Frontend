import React, { useState } from "react";

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => { },
    logout: () => [],
    isAdmin: false,
});

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);

    const [admin,setAdmin] = useState(false);

    const userIsLoggedIn = !!token;

    const loginHandler = (props) => {
        setToken(props.token);
        localStorage.setItem('token',token);

        if(props.isAdmin==="admin") {
            setAdmin(true);
        }
        else {
            setAdmin(false);
        }
        localStorage.setItem('isAdmin', admin);
    };

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
    };


    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        isAdmin: admin,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;