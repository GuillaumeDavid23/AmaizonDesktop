import { BtnGeneral, ListAppoint } from '../globalComponents'
import { useState, useEffect } from 'react'
import { getAppointments, getAllAppointmentsForAnAgent } from '../services'
import { Box } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import './Appointments.css'
import { useSlideSnack } from '../hooks'
import moment from 'moment'
import { catchError } from '../../utils/funcs'

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

	// Récupération d'une potentiel props SnackBar:
	useEffect(() => {
		if (state && state.snackParams) {
			let { message, severity } = state.snackParams
			setSnackParams({ message, severity })
		}
	}, [])

	// Récupération des rendez-vous:
	const [appointments, setAppointments] = useState([])
	const [showAllAppointment, setShowAllAppointment] = useState(false)
	useEffect(() => {
		if (!showAllAppointment) {
			getAllAppointmentsForAnAgent(token)
				.then((res) => {
					setAppointments(res.datas)
				})
				.catch(async (error) => {
					setSnackParams(await catchError(error))
				})
		} else {
			getAppointments(token)
				.then((res) => {
					setAppointments(res.appointments)
				})
				.catch(async (error) => {
					setSnackParams(await catchError(error))
				})
		}
	}, [showAllAppointment])

	return (
		<>
			<Box className="mt-3 mx-2">
				<Box className="d-flex h-75">
					<Box className="w-20">
						<ListAppoint
							title="Aujourd'hui"
							data={appointments}
							date={moment()}
						/>
					</Box>
					<Box className="w-20">
						<ListAppoint
							title={
								moment()
									.add(1, 'days')
									.format('dddd')
									.charAt(0)
									.toUpperCase() +
								moment().add(1, 'days').format('dddd').slice(1)
							}
							data={appointments}
							date={moment().add(1, 'days')}
						/>
					</Box>
					<Box className="w-20">
						<ListAppoint
							title={
								moment()
									.add(2, 'days')
									.format('dddd')
									.charAt(0)
									.toUpperCase() +
								moment().add(2, 'days').format('dddd').slice(1)
							}
							data={appointments}
							date={moment().add(2, 'days')}
						/>
					</Box>
					<Box className="w-20">
						<ListAppoint
							title={
								moment()
									.add(3, 'days')
									.format('dddd')
									.charAt(0)
									.toUpperCase() +
								moment().add(3, 'days').format('dddd').slice(1)
							}
							data={appointments}
							date={moment().add(3, 'days')}
						/>
					</Box>
					<Box className="w-20">
						<ListAppoint
							title={
								moment()
									.add(4, 'days')
									.format('dddd')
									.charAt(0)
									.toUpperCase() +
								moment().add(4, 'days').format('dddd').slice(1)
							}
							data={appointments}
							date={moment().add(4, 'days')}
						/>
					</Box>
				</Box>
				<Box className="d-flex justify-content-center mb-3">
					<BtnGeneral
						text={`${
							!showAllAppointment ? 'Tout les' : 'Mes'
						} rendez-vous`}
						className="me-2"
						onClick={() =>
							setShowAllAppointment(!showAllAppointment)
						}
					/>
					<BtnGeneral
						text="Nouveau rendez-vous"
						className="ms-2"
						onClick={() => navigate('/createAppointment')}
					/>
				</Box>
			</Box>
			{renderSnack}
		</>
	)
}

export default Appointments
