// React import
import React from 'react'

// PropTypes validation import
import PropTypes from 'prop-types'

// Bootstrap Design imports
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { Box, Typography } from '@mui/material'

// React Router import
import { useParams } from 'react-router-dom'

// CSS import
import './AgentDetails.css'
import CustomerItem from './components/CustomerItem'

const AgentDetails = (props) => {
	// Get user ID from params
	const { id: userID } = useParams()

	const [user, setUser] = React.useState()
	const [isLoading, setIsLoading] = React.useState(true)
	const goToAppointmentPage = React.useCallback(() => {
		window.electron.send('mainShowAppointmentPage', '')
	}, [])

	React.useEffect(() => {
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
						console.log(data)
						const { data: user } = data
						setUser(user)
					})
				}
			})
			.finally(() => {
				setIsLoading(false)
			})
	}, [userID])

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
								<p>
									Teléphone perso:{' '}
									{user?.phone ? user?.phone : 'Inconnu'}
								</p>
								<p>Teléphone pro: {user?.agent?.phonePro}</p>
								<p>Email: {user?.email}</p>
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
							<Row
								style={{
									height: '80%',
								}}
							>
								<Typography variant="h6" align="center">
									Liste des clients
								</Typography>
								<Box
									style={{
										height: '80%',
										overflowY: 'scroll'
									}}
								>
									{user?.agent.customers.length > 0 &&
										user.agent.customers.map((customer) => {
											return (
												<CustomerItem customer={customer} />
											)
										})}
								</Box>
							</Row>
						</Col>
					</Row>
				</Container>
			)}
		</>
	)
}

AgentDetails.propTypes = {
	user: PropTypes.object.isRequired
}

AgentDetails.defaultProps = {
	user: { name: 'John Doe' }
}

export default AgentDetails
