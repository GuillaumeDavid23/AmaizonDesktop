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
import { getClient } from '../../../services/Client'
import { useAuth } from '../../../hooks'

const CustomerDetails = (props) => {
	// Get user ID from params
	const { id: userID } = useParams()

	const [user, setUser] = React.useState()
	const [isLoading, setIsLoading] = React.useState(true)
	const navigate = useNavigate()
	const goToAppointmentPage = React.useCallback(() => {
		window.electron.send('mainShowAppointmentPage', '')
	}, [])
	const { authToken } = useAuth()

	React.useEffect(() => {
		getClient(userID, authToken)
			.then((res) => {
				if (res.ok) {
					res.json().then((data) => {
						console.log(data)
						const { data: user } = data
						setUser(user)
					})
				}
			})
			.finally(() => {
				setIsLoading(false)
			})
	}, [authToken, userID])

	return (
		<>
			{isLoading ? (
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			) : (
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
								justifyContent: 'center'
							}}
						>
							<Container
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-evenly'
								}}
							>
								{/* User PP */}
								<Row>
									<Col
										style={{
											display: 'flex',
											justifyContent: 'center'
										}}
									>
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
												onError={({
													currentTarget
												}) => {
													currentTarget.onerror = null // prevents looping
													currentTarget.src = require('../../../../assets/images/blank_profile.png')
												}}
											/>
										</Box>
									</Col>
								</Row>
								{/* ActionsButtons */}
								<Row
									style={{
										display: 'flex',
										justifyContent: 'space-between'
									}}
								>
									<Col>
										<Button
											variant="secondary"
											onClick={() =>
												console.log('UserModify')
											}
										>
											Modifier
										</Button>
									</Col>
									<Col>
										<Button
											variant="primary"
											onClick={goToAppointmentPage}
											style={{
												backgroundColor: '#647F94',
												borderColor: '#647F94'
											}}
										>
											Prendre Rdv
										</Button>
									</Col>
								</Row>
							</Container>
						</Col>
						{/* Espace 2: Informations utilisateur */}
						<Col
							style={{
								display: 'flex',
								flexDirection: 'column'
							}}
						>
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
						{/* Espace 3: Préférences utilisateur */}
						<Col
							style={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'flex-start'
							}}
						>
							<Row>
								<Box>
									<p>Budget mini: {user?.buyer?.budgetMin}</p>
									<p>Budget max: {user?.buyer?.budgetMax}</p>
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
								<Button
									variant="primary"
									onClick={() =>
										navigate('/customerPreference', {
											state: { user: user }
										})
									}
									style={{
										backgroundColor: '#647F94',
										borderColor: '#647F94'
									}}
								>
									Modifier
								</Button>
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
