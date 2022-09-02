import { Typography } from '@mui/material'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { AnimatedPage, Title } from '../globalComponents'
import { useAuth } from '../hooks'
import { ChartsNbAndTypeOfProperty } from '../services/Stats'
import { Bar, Line, Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js'
import './Stats.css'

ChartJS.register(
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	BarElement,
	PointElement,
	LineElement
)

const Stats = () => {
	const { authToken } = useAuth()
	const [countProperty, setCountProperty] = React.useState([])
	const [countCreatedClient, setCountCreatedClient] = React.useState([])
	React.useEffect(() => {
		ChartsNbAndTypeOfProperty(authToken).then((response) => {
			setCountProperty(response.countProperty)
			setCountCreatedClient(response.createdClient)
		})
	}, [authToken])

	const ChartPieForAnnounceType = {
		labels: ['Appartement', 'Maison'],
		datasets: [
			{
				data: countProperty,
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)'
				],
				borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
				borderWidth: 1,
				hoverOffset: 4
			}
		]
	}
	const ChartBarForCreatedClient = {
		datasets: [
			{
				label: 'Nombre de clients',
				data: countCreatedClient,
				fill: false,
				borderColor: 'rgb(75, 192, 192)',
				tension: 0.3
			}
		]
	}


	return (
		<AnimatedPage>
			<Container className="h-100">
				<Title text="Statistiques" variant="h4" />
				<Row className="h-100">
					<Col xs={3}>
						<Typography variant="h5" className="text-center">
							Nombre d'annonces par type
						</Typography>
						<Pie data={ChartPieForAnnounceType} />
					</Col>
					<Col xs={6}>
						<Typography variant="h5" className="text-center">
							Clients créé sur les 30 derniers jours
						</Typography>
						<Line data={ChartBarForCreatedClient}  />
					</Col>
				</Row>
			</Container>
		</AnimatedPage>
	)
}

export default Stats
