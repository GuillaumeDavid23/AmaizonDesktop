import React from "react";

import Box from "@mui/material/Box";
import { AnimatedPage } from "../globalComponents";
import Title from '../globalComponents/Title/Title'
import AddForm from "./components/AddForm";
import './CustomerAdd.css'
const CustomerAdd = () => {
    return (
        <AnimatedPage>
            <Box
                className="w-100 d-flex align-items-center"
                style={{ height: "10%" }}
            >
                <Title text="Ajout d'un client" variant="h5" />
            </Box>
            <Box className="w-100" style={{ height: "90%" }}>
                <AddForm />
            </Box>
        </AnimatedPage>
    );
};

export default CustomerAdd;
