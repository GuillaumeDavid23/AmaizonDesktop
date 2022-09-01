import { Box } from "@mui/material";
import { Button } from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";

const AgentCard = ({ agent }) => {
    return (
        <Box className="contactBox">
            <Box className="contactThumb">
                <FaUserAlt
                    style={{
                        height: "40%",
                        width: "40%",
                    }}
                />
            </Box>
            <Box className="w-100">
                <Box>
                    {agent.firstname} {agent.lastname}
                </Box>
                <Box className="d-flex justify-content-between w-100 pe-5">
                    {agent.roles}
                    <Button
                        style={{ fontSize: "14px" }}
                        className="contactButton"
                        onClick={() => {
                            window.electron.send("mailto", agent.email);
                        }}
                    >
                        Contacter
                    </Button>
                </Box>
                <Box></Box>
            </Box>
        </Box>
    );
};

export default AgentCard;
