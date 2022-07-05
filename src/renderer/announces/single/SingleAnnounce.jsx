import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BsBorderAll } from "react-icons/bs";
import { MdArchitecture, MdLocationSearching } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

import { AnimatedPage } from "../../globalComponents";
import BtnGeneral from "../../globalComponents/BtnGeneral";
import Description from "./components/Description";
import Photos from "./components/Photos";
import "./SingleAnnounce.css"

const SingleAnnounce = (props) => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { property } = state;
    return (
        <AnimatedPage>
            <Container className="mt-4 mb-4 h-100 overflow-auto">
                <BtnGeneral
                    text="Retour"
                    onClick={() =>
                        navigate("/announces")
                    }
                    style={{width: '10%'}}
                />
                <Row className="justify-content-evenly align-items-center mt-4">
                    <Col xs="12" lg="8" className="d-flex flex-column">
                        {property.imageUrl ? (
                            <Photos data={property.imageUrl} />
                        ) : (
                            <Photos data={null} />
                        )}
                        <div className="mt-5 d-flex justify-content-evenly">
                            <div className="d-flex flex-column align-items-center fw-bold">
                                <MdArchitecture size={40} />
                                {property.surface} m²
                            </div>
                            <div className="d-flex flex-column align-items-center fw-bold">
                                <BsBorderAll size={40} />
                                {property.roomNumber} pièce(s)
                            </div>
                            <div className="d-flex flex-column align-items-center fw-bold">
                                <MdLocationSearching size={40} />
                                {property.location}
                            </div>
                        </div>
                    </Col>
                    <Col xs="12" lg="10">
                        <Description data={property} />
                    </Col>
                </Row>
            </Container>
        </AnimatedPage>
    );
};;

export default SingleAnnounce;
