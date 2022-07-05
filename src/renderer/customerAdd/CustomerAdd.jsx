import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AnimatedPage } from "../globalComponents";
import Title from "../globalComponents/Title";
import { useForm } from "react-hook-form";
const CustomerAdd = () => {
    // Destructuring Hook Form
    const {
        handleSubmit,
        control,
        formState: { errors, isValid },
    } = useForm({
        mode: "onBlur",
        reValidateMode: "onBlur",
        shouldFocusError: true,
    });
    return (
        <AnimatedPage>
            <Box
                className="w-100 d-flex align-items-center"
                style={{ height: "10%" }}
            >
                <Title text="Ajout d'un client" />
            </Box>
            <Box className="w-100" style={{ height: "90%" }}></Box>
        </AnimatedPage>
    );
};

export default CustomerAdd;
