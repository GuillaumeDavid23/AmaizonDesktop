import { AnimatedPage, BtnGeneral, Title } from '../globalComponents'
import { Box, Button, Grid } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { getAgents } from '../services'
import { useSlideSnack } from '../hooks'
import { useNavigate, useLocation } from 'react-router-dom'
import './Agents.css'
import { AgentListItem } from './components'
// import FormControl from 'react-bootstrap/FormControl'

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

	// Electron KeyHandling Callback
	const handleElectronKeyPress = React.useCallback((event) => {
		const { key, ctrlKey } = event

		if (ctrlKey && key === 'n') {
			window.electron.send('mainGoToPage', '/createAgent')
		}

		return
	}, [])

	// ReactJS Key handling
	React.useEffect(() => {
		window.addEventListener('keydown', handleElectronKeyPress, true)

		return () => {
			window.removeEventListener('keydown', handleElectronKeyPress, true)
		}
	}, [handleElectronKeyPress])
	
	return (
		<AnimatedPage>
			<Grid sx={{ height: '100%' }}>
				<Box sx={{ height: '10%' }}>
					{/* Component Header */}
					<Title text="Agents" />

					<Box
						sx={{
							display: 'flex',
							justifyContent: 'flex-end',
							paddingRight: '50px',
							marginBottom: '2em'
						}}
					>
						<BtnGeneral
							text="Ajouter un agent"
							onClick={() => navigate('/createAgent')}
						/>
					</Box>
				</Box>

				{/* Customers list */}
				<Grid
					container
					sx={{
						marginTop: '20px',
						paddingX: '20px',
						overflowY: 'scroll',
						height: '80%'
					}}
					spacing={3}
				>
					{agents.map((agent) => {
						return (
							<Grid item xs={4} key={agent.id}>
								<AgentListItem agent={agent} />
							</Grid>
						)
					})}
				</Grid>
			</Grid>
			{/* Snackbar */}
			{renderSnack}
		</AnimatedPage>
	)
}

export default Agents