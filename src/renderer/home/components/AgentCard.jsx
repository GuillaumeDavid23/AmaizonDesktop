import { Box, Typography } from "@mui/material";
import { Button, Col, Image, Row } from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";

const AgentCard = ({ agent }) => {
    return (
		<Row className="contactBox align-items-center mt-3">
			<Col xs={3} className="d-flex justify-content-center">
				<Image
					style={{ borderRadius: '10px', width: '60%' }}
					fluid
					src={window.electron.url + '/avatar/' + agent._id + '.jpg'}
					onError={({ currentTarget }) => {
						currentTarget.onerror = null // prevents looping
						currentTarget.src = require('../../../assets/images/blank_profile.png')
					}}
				/>
			</Col>
			<Col xs={6}>
				<Box>
					<Typography fontFamily="Dosis" fontWeight="Bold" size={14}>
						{agent.firstname} {agent.lastname}
					</Typography>
				</Box>
				<Box className="d-flex justify-content-between w-100 pe-5">
					<Typography
						fontFamily="Dosis"
						size={14}
						sx={{ textTransform: 'capitalize' }}
					>
						{agent.roles}
					</Typography>
				</Box>
			</Col>
			<Col xs={3} className="d-flex justify-content-center">
				<Button
					style={{ fontSize: '14px' }}
					className="contactButton"
					onClick={() => {
						window.electron.send('mailto', agent.email)
					}}
				>
					Contacter
				</Button>
			</Col>
		</Row>
	)
};

export default AgentCard;
