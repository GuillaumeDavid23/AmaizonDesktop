// React import
import React from 'react'

// PropTypes validation import
import PropTypes from 'prop-types'

// MUI Design imports
import Box from '@mui/material/Box'

// Bootstrap Design imports
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import { Container, Row, Col, Image } from 'react-bootstrap'

// React Router import
import { useNavigate, useParams } from 'react-router-dom'

// CSS import
import './CustomerDetails.css'

const CustomerDetails = (props) => {
	// Get user ID from params
	const { id: userID } = useParams()

	// Set component states
	const [user, setUser] = React.useState()
	const [isLoading, setIsLoading] = React.useState(true)

	// Get Navigate method
	const navigate = useNavigate()

	const goToAppointmentPage = React.useCallback(() => {
		window.electron.send('mainShowAppointmentPage', '')
	}, [])

	React.useEffect(() => {
		// Fetching User through its ID
		fetch(`${window.electron.url}/api/user/${userID}`, {
			headers: {
				Authorization: `bearer ${JSON.parse(
					localStorage.getItem('REACT_TOKEN_AUTH_AMAIZON')
				)}`
			}
		})
			.then((res) => {
				if (res.ok) {
					res.json().then((data) => {
						// Retrieve user from response
						const { data: user } = data
						// Set User
						setUser(user)
					})
				}
			})
			.finally(() => {
				// Finnaly, unlock isLoading state
				setIsLoading(false)
			})
	}, [])

	return (
		<>
			{isLoading ? (
				// While fetching, show spinner
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			) : (
				// Once loaded, show User info
				<Container
					style={{
						height: '100%',
						backgroundColor: '#DCD0C1',
						margin: 0,
						maxWidth: '100%',
						padding: '50px'
					}}
				>
					<Row style={{ height: '100%' }}>
						{/* Espace 1: PP + ActionButton "Modifier"/"RDV" */}
						<Col
							style={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between'
							}}
						>
							{/* User PP */}
							<Row>
								<Col>
									{/* Actual PP */}
									<Box
										style={{
											height: '300px',
											width: '300px'
										}}
									>
										<Image
											style={{ borderRadius: '10px' }}
											fluid
											src={
												window.electron.url +
												'/avatar/' +
												userID +
												'.png'
											}
											onError={({ currentTarget }) => {
												currentTarget.onerror = null // prevents looping
												currentTarget.src = require('../../../../assets/images/blank_profile.png')
											}}
										/>
									</Box>
								</Col>
							</Row>
							{/* ActionsButtons */}
							<Row>
								<Col sx={12}>
									<Button
										variant="primary"
										onClick={goToAppointmentPage}
										style={{
											backgroundColor: '#647F94',
											borderColor: '#647F94',
											width: '100%'
										}}
									>
										Prendre Rdv
									</Button>
								</Col>
							</Row>
						</Col>
						{/* Espace 2: Informations utilisateur */}
						<Col
							style={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between'
							}}
						>
							{/* User info */}
							<Row>
								<Col>
									<Box>
										<h2>
											{user?.firstname} {user?.lastname}
										</h2>
									</Box>
									<Box>
										<p>Tel:{user?.phone}</p>
										<p>Mail:{user?.email}</p>
									</Box>
								</Col>
							</Row>
							{/* Action Button */}
							<Row>
								<Col xs={12}>
									<Button
										variant="secondary"
										onClick={() =>
											console.log('UserModify')
										}
										style={{
											backgroundColor: '#647F94',
											borderColor: '#647F94',
											width: '100%'
										}}
									>
										Modifier
									</Button>
								</Col>
							</Row>
						</Col>
						{/* Espace 3: Préférences utilisateur */}
						<Col
							style={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between'
							}}
						>
							<Row>
								<Box>
									<p>Budget mini: {user?.buyer?.budgetMin}</p>
									<p> Budget max: {user?.buyer?.budgetMax}</p>
									<p>
										Surface mini: {user?.buyer?.surfaceMin}
									</p>
									<p>
										Surface max: {user?.buyer?.surfaceMax}
									</p>
									<p>Localisation: {user?.buyer?.city}</p>
									<p>
										Nombre de pièces: {user?.buyer?.rooms}
									</p>
									<p>Transaction: {user?.buyer?.type}</p>
								</Box>
							</Row>
							<Row>
								<Col sx={12}>
									<Button
										variant="primary"
										onClick={() =>
											navigate('/customerPreference', {
												state: { user: user }
											})
										}
										style={{
											backgroundColor: '#647F94',
											borderColor: '#647F94',
											width: '100%'
										}}
									>
										Modifier
									</Button>
								</Col>
							</Row>
						</Col>
					</Row>
				</Container>
			)}
		</>
	)
}

CustomerDetails.propTypes = {
	user: PropTypes.object.isRequired
}

CustomerDetails.defaultProps = {
	user: { name: 'John Doe' }
}

export default CustomerDetails
