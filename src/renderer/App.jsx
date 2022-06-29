import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthProvider from "./services/AuthProvider";

import PrivateRoute from "./routes/PrivateRoutes";

import Login from "./login/Login";
import Home from "./home/Home";

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route
                        index
                        element={
                            <PrivateRoute>
                                <Home />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/home"
                        element={
                            <PrivateRoute>
                                <Home />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
