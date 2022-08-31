import { BtnGeneral } from '../globalComponents'
import { useState, useEffect } from 'react'
import { getAppointments } from '../services/Appointment'
import { Box } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import './Appointments.css'
import { useSlideSnack } from '../hooks'

const Appointments = () => {
	// Récupération du token:
	const token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_AMAIZON'))

	// Déclaration useNavigate et useLocation:
	const navigate = useNavigate()
	let { state } = useLocation()

	// Gestion de la snack Params:
	const [snackParams, setSnackParams] = useState({
		message: '',
		severity: 'error'
	})
	const { handleOpen, renderSnack } = useSlideSnack({
		message: snackParams.message,
		time: 2000,
		severity: snackParams.severity
	})
	useEffect(() => {
		if (snackParams.message) {
			handleOpen()
		}
	}, [snackParams])

	// Récupération des rendez-vous:
	const [appointments, setAppointments] = useState([])
	useEffect(() => {
		getAppointments(token)
			.then((res) => {
				setAppointments(res.appointments)
			})
			.catch((error) => {
				console.log(error)
			})

		// Récupération d'une potentiel props SnackBar:
		if (state && state.snackParams) {
			let { message, severity } = state.snackParams
			setSnackParams({ message, severity })
		}
	}, [])

	return (
		<>
			<Box className="d-flex justify-content-center align-items-center flex-column h-100">
				<ul id="appointmentsList">
					{appointments.map((appointment) => {
						return (
							<li key={appointment._id}>
								<span>{appointment._id}</span>
								<BtnGeneral
									text="Modifier"
									className="w-auto ms-3"
									onClick={() =>
										navigate('/createAppointment', {
											state: { id: appointment._id }
										})
									}
								/>
							</li>
						)
					})}
				</ul>
				<BtnGeneral
					text="Nouveau rendez-vous"
					className="w-auto"
					onClick={() => navigate('/createAppointment')}
				/>
			</Box>
			{renderSnack}
		</>
	)
}

export default Appointments
