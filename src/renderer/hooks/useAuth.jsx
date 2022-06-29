import React from "react";

import AuthContext from "../contexts/AuthContext";

const useAuth = () => {
    const context = React.useContext(AuthContext);

    if (!context) throw new Error("Context must be use inside a Provider");

    return context;
};

export default useAuth;
