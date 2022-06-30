import { Box, Typography } from "@mui/material";
import Moment from "react-moment";
import moment from "moment";
import "./ListAppoint.css";
const ListAppoint = ({ data, title }) => {
    function List({ list }) {
        let listItems = [];
        for (let index = 8; index <= 17; index++) {
            let findAppoint = false;
            list.forEach((appoint) => {
                if (index.toString() === moment(appoint.dateBegin).format("HH")) {
                    let html = (
                        <div className="appointItem" key={appoint._id}>
                            <div className="appointTime">
                                <Moment format="HH">{appoint.dateBegin}</Moment>
                                h
                            </div>
                            <div className="appointDesc">{appoint.address}</div>
                        </div>
                    );
                    findAppoint = true;
                    listItems.push(html);
                    return
                } 
            });
            if(!findAppoint){
                let html = (
                    <div className="appointItem" key={index}>
                        <div className="appointTime">{index}h</div>
                        <div className="appointDesc"></div>
                    </div>
                );
                listItems.push(html);
            }
        }
        return listItems;
    }
    return (
        <Box className="appointBox">
            <Box className="appointBoxTitle">
                <Typography variant="h5" component="div" className="">
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
