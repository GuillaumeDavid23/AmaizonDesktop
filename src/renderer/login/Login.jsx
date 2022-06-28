import React from "react";

import { AnimatedPage } from "../globalComponents";
import { ConnectForm } from "./components";

const Login = () => {
    return (
        <AnimatedPage>
            <div className="">
                <ConnectForm />
            </div>
        </AnimatedPage>
    );
};

export default Login;
