import { Col, Container, Row } from "react-bootstrap";
import { AnimatedPage } from "../globalComponents";
import Navigation from "../globalComponents/Navigation";
import Title from "../globalComponents/Title";
import { Box, Typography } from "@mui/material";
import Moment from "react-moment";
import "./Home.css";
import ListAppoint from "../globalComponents/ListAppoint";

const Home = (props) => {
    const appointments = [
        {
            _id: "61f937b8b3e03e6ecae9ce8f",
            dateBegin: "2022-02-01T12:00:00.000Z",
            dateEnd: "2022-02-01T13:00:00.000Z",
            address: "33 grande rue du taser",
            outdoor: true,
            id_buyer: "61f93607aee1cc92467bc5d6",
            id_agent: "61f80338a0495a41d29c8c81",
        },
        {
            _id: "61f937b8b3e03e6ecae9ce7f",
            dateBegin: "2022-02-01T14:00:00.000Z",
            dateEnd: "2022-02-01T15:00:00.000Z",
            address: "23 grande rue du gland",
            outdoor: true,
            id_buyer: "61f93607aee1cc92467bc5d6",
            id_agent: "61f80338a0495a41d29c8c81",
        },
        {
            _id: "61f937b8b3e03e6ecae9ce9f",
            dateBegin: "2022-02-01T15:00:00.000Z",
            dateEnd: "2022-02-01T16:00:00.000Z",
            address: "13 grande rue de la bite",
            outdoor: true,
            id_buyer: "61f93607aee1cc92467bc5d6",
            id_agent: "61f80338a0495a41d29c8c81",
        },
    ];

    return (
        <AnimatedPage>
            <Box className="w-100">
                <Box className="w-100">
                    <Title text="Accueil" />
                </Box>
                <Row className="ps-4 pe-4 mt-5">
                    <Col xs={3}>
                        <ListAppoint title="Aujourd'hui" data={appointments} />
                    </Col>
                    <Col xs={3}>
                        <ListAppoint title="Demain" data={appointments} />
                    </Col>
                </Row>
            </Box>
        </AnimatedPage>
    );
};

export default Home;
