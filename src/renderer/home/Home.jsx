import { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { AnimatedPage, ListAppoint, Title } from '../globalComponents'
import { Box, Typography } from '@mui/material'
import './Home.css'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { AgentCard } from './components'
import moment from 'moment'
import { useSlideSnack } from '../hooks'
import { useLocation } from 'react-router-dom'
import { getAllAppointmentsForAnAgent } from '../services'
import { catchError } from '../../utils/funcs'

ChartJS.register(ArcElement, Tooltip, Legend)
const Home = () => {
	const [allAgents, setAllAgents] = useState([])
	const [charts, setCharts] = useState([])
	const [appointments, setAppointments] = useState([])

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

	let { state } = useLocation()
	useEffect(() => {
		let token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_AMAIZON'))

		fetch(window.electron.url + '/api/user/agents', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				Authorization: `bearer ${token}`
			}
		})
			.then((response) => {
				return response.json()
			})
			.then((response) => {
				setAllAgents(response.datas)
			})
			.catch(async (error) => {
				setSnackParams(await catchError(error))
			})

		fetch(window.electron.url + '/api/property/charts', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				authorization: `bearer ${token}`
			}
		})
			.then((response) => {
				return response.json()
			})
			.then((response) => {
				setCharts(response.charts)
			})
			.catch(async (error) => {
				setSnackParams(await catchError(error))
			})

		getAllAppointmentsForAnAgent(token)
			.then((response) => {
				setAppointments(response.datas)
			})
			.catch(async (error) => {
				setSnackParams(await catchError(error))
			})

		// Récupération d'une potentiel props SnackBar:
		if (state && state.snackParams) {
			let { message, severity } = state.snackParams
			setSnackParams({ message, severity })
		}
	}, [])

	const ChartJS = {
		labels: ['Appartement', 'Maison'],
		datasets: [
			{
				data: charts,
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)'
				],
				borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
				borderWidth: 1
			}
		]
	}

	return (
		<AnimatedPage>
			<Box className="w-100" style={{ height: '90%' }}>
				<Box
					className="w-100 d-flex align-items-center"
					style={{ height: '10%' }}
				>
					<Title text="Accueil" />
				</Box>

				<Row className="ps-5 pt-5 w-100" style={{ height: '100%' }}>
					<Col xs={3} style={{ height: '100%' }}>
						<ListAppoint
							title="Aujourd'hui"
							data={appointments}
							date={moment()}
						/>
					</Col>
					<Col xs={{ span: 3 }} style={{ height: '100%' }}>
						<ListAppoint
							title="Demain"
							data={appointments}
							date={moment().add(1, 'days')}
						/>
					</Col>

					<Col xs={{ span: 4, offset: 2 }} style={{ height: '100%' }}>
						<Row className="flex-column align-items-center h-100">
							<Col xs={8} className="h-50">
								<Typography
									variant="h5"
									className="text-center"
								>
									Type d'annonces en ligne
								</Typography>
								<Pie data={ChartJS} />
							</Col>
							<Col xs={12} className="h-50">
								<Row>
									<Typography
										variant="h5"
										className="text-center mt-3"
									>
										Contact rapide
									</Typography>
								</Row>
								<Row
									className="overflow-auto"
									style={{ height: '100%' }}
								>
									<Col>
										{allAgents.map((agent, index) => (
											<AgentCard
												agent={agent}
												key={index}
											/>
										))}
									</Col>
								</Row>
							</Col>
						</Row>
					</Col>
				</Row>
			</Box>
			{/* Snackbar */}
			{renderSnack}
		</AnimatedPage>
	)
}

export default Home
