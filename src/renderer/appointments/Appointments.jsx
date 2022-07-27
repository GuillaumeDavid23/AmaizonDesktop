import { BtnGeneral } from '../globalComponents'
import { useState, useEffect } from 'react'
import { getAppointments } from '../services/Appointment'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import './Appointments.css'

const Appointments = () => {
	// Récupération du token:
	const token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_AMAIZON'))

	// Déclaration useNavigate:
	const navigate = useNavigate()

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
	}, [])

	return (
		<Box className="d-flex justify-content-center align-items-center flex-column h-100">
			<ul>
				{appointments.map((appointment) => {
					return (
						<li key={appointment._id}>
							<span>{appointment._id}</span>
							<BtnGeneral
								text="Modifier"
								className="w-auto ms-3"
								onClick={() =>
									navigate('/', {
										state: {
											snackParams: {
												message: 'Fonctionnalité à dév',
												severity: 'warning'
											}
										}
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
	)
}

export default Appointments
