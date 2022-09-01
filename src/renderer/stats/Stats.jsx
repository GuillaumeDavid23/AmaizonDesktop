import { Typography } from '@mui/material'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { AnimatedPage, Title } from '../globalComponents'
import { useAuth } from '../hooks'
import { ChartsNbAndTypeOfProperty } from '../services/Stats'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import './Stats.css'

ChartJS.register(ArcElement, Tooltip, Legend)

const Stats = () => {
	const { authToken } = useAuth()
	const [typeCharts, setTypeCharts] = React.useState([])
	React.useEffect(() => {
		ChartsNbAndTypeOfProperty(authToken).then((response) => {
			setTypeCharts(response.charts)
		})
	}, [authToken])

	const ChartPie = {
		labels: ['Appartement', 'Maison'],
		datasets: [
			{
				data: typeCharts,
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
			<Container className="h-100">
				<Title text="Statistiques" variant="h4" />
				<Row className="h-100">
					<Col xs={3}>
						<Typography variant="h5" className="text-center">
							Nombre d'annonces par type
						</Typography>
						<Pie data={ChartPie} />
					</Col>
				</Row>
			</Container>
		</AnimatedPage>
	)
}

export default Stats
