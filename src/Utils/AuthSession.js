import React, { createContext, useState } from "react";

const AuthSession = createContext({});

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthSession.Provider value={{auth, setAuth}} >
            {children}
        </AuthSession.Provider>
    )
}

export default AuthSession;