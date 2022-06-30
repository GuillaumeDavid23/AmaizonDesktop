import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { AnimatedPage } from "../globalComponents";
import Navigation from "../globalComponents/Navigation";
import Title from "../globalComponents/Title";
import { Box, Typography } from "@mui/material";
import { FaUserAlt } from "react-icons/fa";
import "./Home.css";
import ListAppoint from "../globalComponents/ListAppoint";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
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

    const allAgents = [
        {
            _id: "62874e145bab2a786351b1d7",
            firstname: "Guillaume",
            lastname: "David",
            email: "guigui@test.fr",
            password:
                "$2b$10$yLjC565CLDkpcfFkyntEDedvokoNVX/xleLWLSHJqiT81/qzUYD/2",
            newsletter: true,
            status: true,
            ref: "2564FG5656",
            agent: {
                customers: [
                    "620e1705906f9b1bc1adf768",
                    "628760f35bab2a786351b746",
                    "628762f8636d5e6641427ef3",
                    "6287641d636d5e6641427ef7",
                    "629877f275801b4869913062",
                ],
                phonePro: "0656897895",
            },
            roles: "agent",
        },
        {
            _id: "62874e145bab2a786351b2d7",
            firstname: "Henry",
            lastname: "jaque",
            email: "loljaque@test.fr",
            password:
                "$2b$10$yLjC565CLDkpcfFkyntEDedvokoNVX/xleLWLSHJqiT81/qzUYD/2",
            newsletter: true,
            status: true,
            ref: "2564FG5656",
            agent: {
                customers: [
                    "620e1705906f9b1bc1adf768",
                    "628760f35bab2a786351b746",
                    "628762f8636d5e6641427ef3",
                    "6287641d636d5e6641427ef7",
                    "629877f275801b4869913062",
                ],
                phonePro: "0656897895",
            },
            roles: "agent",
        },
        {
            _id: "62874e145bab2a786351b2g7",
            firstname: "Jeanne",
            lastname: "Pas d'arc",
            email: "loljaque@test.fr",
            password:
                "$2b$10$yLjC565CLDkpcfFkyntEDedvokoNVX/xleLWLSHJqiT81/qzUYD/2",
            newsletter: true,
            status: true,
            ref: "2564FG5656",
            agent: {
                customers: [
                    "620e1705906f9b1bc1adf768",
                    "628760f35bab2a786351b746",
                    "628762f8636d5e6641427ef3",
                    "6287641d636d5e6641427ef7",
                    "629877f275801b4869913062",
                ],
                phonePro: "0656897895",
            },
            roles: "agent",
        },
        {
            _id: "62874e145bab2a786351b1f5",
            firstname: "Guillaume",
            lastname: "David",
            email: "guigui@test.fr",
            password:
                "$2b$10$yLjC565CLDkpcfFkyntEDedvokoNVX/xleLWLSHJqiT81/qzUYD/2",
            newsletter: true,
            status: true,
            ref: "2564FG5656",
            agent: {
                customers: [
                    "620e1705906f9b1bc1adf768",
                    "628760f35bab2a786351b746",
                    "628762f8636d5e6641427ef3",
                    "6287641d636d5e6641427ef7",
                    "629877f275801b4869913062",
                ],
                phonePro: "0656897895",
            },
            roles: "agent",
        },
    ];

    const ChartJS = {
        labels: ["Appartement", "Maison"],
        datasets: [
            {
                data: [550, 215],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                ],
                borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
                borderWidth: 1,
            },
        ],
    };

    const agentList = [];
    allAgents.forEach((agent) => {
        agentList.push(
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
                            style={{ fontSize: "12px" }}
                            className="contactButton"
                        >
                            Contacter
                        </Button>
                    </Box>
                    <Box></Box>
                </Box>
            </Box>
        );
    });

    return (
        <AnimatedPage>
            <Container fluid className="homePage p-0">
                <Box className="h-100 d-flex">
                    <Box>
                        <Navigation />
                    </Box>

                    <Box className="w-100">
                        <Box
                            className="w-100 d-flex align-items-center"
                            style={{ height: "10%" }}
                        >
                            <Title text="Accueil" />
                        </Box>

                        <Row
                            className="ps-5 pt-5 w-100"
                            style={{ height: "90%" }}
                        >
                            <Col xs={3}>
                                <ListAppoint
                                    title="Aujourd'hui"
                                    data={appointments}
                                />
                            </Col>
                            <Col xs={3}>
                                <ListAppoint
                                    title="Demain"
                                    data={appointments}
                                />
                            </Col>
                            <Col xs={2}></Col>
                            <Col xs={4}>
                                <Row className="flex-column align-items-center h-100">
                                    <Col xs={8} className="h-50">
                                        <Typography
                                            variant="h5"
                                            className="text-center"
                                        >
                                            Type d'annonces en ligne
                                        </Typography>
                                        <Pie data={ChartJS} />
                                    </Col>
                                    <Col xs={12} className="h-50">
                                        <Row>
                                            <Typography
                                                variant="h5"
                                                className="text-center"
                                            >
                                                Contact rapide
                                            </Typography>
                                        </Row>
                                        <Row
                                            className="overflow-auto"
                                            style={{ height: "90%" }}
                                        >
                                            <Col>{agentList}</Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Box>
                </Box>
            </Container>
        </AnimatedPage>
    );
};

export default Home;
