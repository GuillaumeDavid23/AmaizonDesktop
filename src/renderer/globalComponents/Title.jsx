import { Box, Typography } from "@mui/material";
import "./Title.css";
const Title = ({text}) => {
    console.log(window.electron.url);
    return (
        <Box className="boxTitle">
            <Typography variant="h4" component="div" className="">
                {text}
            </Typography>
        </Box>
    );
};

export default Title;
