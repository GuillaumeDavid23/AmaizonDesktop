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
import { Typography } from '@mui/material'
import { BsEyeFill, BsCalendar2Date, BsPen } from 'react-icons/bs'
const Typo = ({ title, text }) => {
	return (
		<Typography fontFamily="Dosis" fontSize={16}>
			{title} : {text}
		</Typography>
	)
}

const CustomerDetails = (props) => {
	// Get user ID from params
	const { id: userID } = useParams()

	const [user, setUser] = React.useState()
	const [isLoading, setIsLoading] = React.useState(false)
	const navigate = useNavigate()
	
	const { authToken } = useAuth()

	const goToAppointmentPage = React.useCallback(() => {
		window.electron.send('mainShowAppointmentPage', '')
	}, [])

	const goToModifyUser = React.useCallback(() => {
		window.electron.send('mainShowModifyCustomer', userID)
	}, [])
	
	React.useEffect(() => {
		getClient(userID, authToken)
			.then((res) => {
				if (res) {
					setUser(res.data)
				}
			})
			.catch((error) => {
				console.log(error)
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
					{/* Espace 1: PP + ActionButton "Modifier"/"RDV" */}
					<Row
						style={{
							height: '100%',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						{/* User PP */}
						<Col
							xs={6}
							style={{
								display: 'flex',
								justifyContent: 'center',
								marginBottom: 20
							}}
						>
							<Box
								style={{
									borderRadius: '100px',
									padding: '8px',
									position: 'relative',
									backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100' ry='100' stroke='rgb(100, 127, 148)' stroke-width='7' stroke-dasharray='20' stroke-dashoffset='16' stroke-linecap='butt'/%3e%3c/svg%3e")`
								}}
							>
								<Image
									style={{ borderRadius: '50%' }}
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
								<Box
									style={{
										width: '40px',
										height: '40px',
										borderRadius: '50%',
										border: '3px solid white',
										backgroundColor: '#647F94',
										position: 'absolute',
										bottom: '-10px',
										left: '0',
										right: '0',
										marginLeft: 'auto',
										marginRight: 'auto',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										cursor: 'pointer'
									}}
									onClick={goToModifyUser}
								>
									<BsPen size={18} color="white" />
								</Box>
							</Box>
						</Col>

						{/* Espace 2: Informations utilisateur */}
						<Col
							xs={5}
							style={{
								display: 'flex',
								flexDirection: 'column',
								width: '100%'
							}}
						>
							<Typography
								fontWeight="semi-bold"
								fontFamily="Dosis"
								fontSize={25}
							>
								{user?.firstname} {user?.lastname}
							</Typography>
							<Typo title="Téléphone" text={user?.phone} />
							<Typo title="Email" text={user?.email} />
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
								<Typography
									fontWeight="semi-bold"
									fontFamily="Dosis"
									fontSize={25}
								>
									Préférences de recherches
								</Typography>
								<Col>
									<Typo
										title="Budget mini"
										text={user?.buyer?.budgetMin}
									/>
									<Typo
										title="Budget max"
										text={user?.buyer?.budgetMax}
									/>
									<Typo
										title="Surface mini"
										text={user?.buyer?.surfaceMin}
									/>
									<Typo
										title="Surface max"
										text={user?.buyer?.surfaceMax}
									/>
								</Col>
								<Col>
									<Typo
										title="Localisation"
										text={user?.buyer?.city}
									/>
									<Typo
										title="Nombre de pièces"
										text={user?.buyer?.rooms}
									/>
									<Typo
										title="Transaction"
										text={user?.buyer?.type}
									/>
								</Col>
							</Row>
						</Col>

						{/* ActionsButtons */}
						<Col
							xs={1}
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								width: '100%'
							}}
						>
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
								Modifier les préférences
							</Button>
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
