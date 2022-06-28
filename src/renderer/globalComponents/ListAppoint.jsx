import { Box, Typography } from "@mui/material";
import Moment from "react-moment";
import "./ListAppoint.css";
const ListAppoint = ({ data, title }) => {
    function List({ list }) {
        const listItems = list.map((appoint) => (
            <div className="appointItem" key={appoint._id}>
                <div className="appointTime">
                    <Moment format="HH">{appoint.dateBegin}</Moment>h
                </div>
                <div className="appointDesc">{appoint.address}</div>
            </div>
        ));
        return listItems;
    }
    return (
        <Box className="appointBox">
            <Box className="appointBoxTitle">
                <Typography variant="h4" component="div" className="">
                    {title}
                </Typography>
            </Box>
            <Box className="appointBoxList">
                <List list={data} />
            </Box>
        </Box>
    );
};

export default ListAppoint;
