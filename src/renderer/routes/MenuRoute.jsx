import React from "react";

import Box from "@mui/material/Box";
import { Container } from "react-bootstrap";

import Navigation from "../globalComponents/Navigation";

const MenuRoute = (props) => {
    const { children } = props;
    return (
        <Container
            fluid
            className="h-100 p-0"
            style={{ backgroundColor: "white" }}
        >
            <Box className="h-100 d-flex">
                <Box>
                    <Navigation />
                </Box>
                <Box className="w-100">{children}</Box>
            </Box>
        </Container>
    );
};

export default MenuRoute;
