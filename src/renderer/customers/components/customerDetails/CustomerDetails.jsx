// React import
import React from 'react'

// PropTypes validation import
import PropTypes from 'prop-types'

// MUI Design imports
import Box from '@mui/material/Box'

// Bootstrap Design imports
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import { Container, Row, Col } from 'react-bootstrap'

// React Router import
import { useNavigate, useParams } from 'react-router-dom'

// CSS import
import './CustomerDetails.css'

const CustomerDetails = (props) => {
	// Get user ID from params
	const { id: userID } = useParams()

	const [user, setUser] = React.useState()
	const [isLoading, setIsLoading] = React.useState(true)
	const navigate = useNavigate()
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
	}, [])

	return (
		<>
			{isLoading ? (
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			) : (
				<Container style={{ height: '100%' }}>
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
												width: '300px',
												backgroundColor: 'blue'
											}}
										></Box>
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
										>
											Prendre Rdv
										</Button>
									</Col>
									<Col>
										<Button
											variant="primary"
											onClick={() =>
												navigate(
													'/customerPreference',
													{ user: user }
												)
											}
										>
											Modifier
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
								justifyContent: 'center'
							}}
						>
							<Box></Box>
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
