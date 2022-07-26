import { AnimatedPage } from '../globalComponents'
import { Box } from '@mui/material'
import { useState, useEffect } from 'react'
import { getAgents } from '../services/Agent'
import { useSlideSnack } from '../hooks'
import { useNavigate, useLocation } from 'react-router-dom'

const Agents = () => {
	// Déclaration useNavigate:
	let navigate = useNavigate()

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

	// Initialisation:
	let { state } = useLocation()
	const [agents, setAgents] = useState([])
	useEffect(() => {
		// Récupération des agents:
		getAgents().then((res) => {
			setAgents(res.datas)
		})

		// Récupération d'une potentiel props SnackBar:
		if (state && state.snackParams) {
			let { message, severity } = state.snackParams
			setSnackParams({ message, severity })
		}
	}, [])

	return (
		<AnimatedPage>
			<Box className="d-flex justify-content-center align-items-center h-100">
				<ul>
					{agents.map((agent) => {
						return (
							<li key={agent._id} className="d-flex">
								<span>
									{agent.lastname} {agent.firstname}
								</span>
								<button
									onClick={() =>
										navigate('/createAgent', {
											state: { id: agent._id }
										})
									}
								>
									Modifier
								</button>
							</li>
						)
					})}
				</ul>
			</Box>
			{/* Snackbar */}
			{renderSnack}
		</AnimatedPage>
	)
}

export default Agents