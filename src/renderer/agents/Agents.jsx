import { AnimatedPage, Title } from '../globalComponents'
import { Box, Button, Grid } from '@mui/material'
import { useState, useEffect } from 'react'
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
						<Button
							variant="contained"
							onClick={() => navigate('/createAgent')}
						>
							Ajouter un agent
						</Button>
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

// ? Composant avec REDUX:

// // Initial component States
// const initialStates = {
// 	searchCustomer: '',
// 	users: [],
// 	filteredUsers: []
// }

// // Component Actions
// const actions = {
// 	INIT_CUSTOMERS: 'INIT_CUSTOMERS',
// 	SET_CUSTOMERS: 'SET_CUSTOMERS',
// 	SET_SEARCHCUSTOMER: 'SET_SEARCHCUSTOMER',
// 	SET_FILTEREDUSERS: 'SET_FILTEREDUSERS'
// }

// // Component Reducer
// const CReducer = (states, action) => {
// 	switch (action.type) {
// 		case actions.INIT_CUSTOMERS:
// 			return {
// 				...states,
// 				users: action.payload,
// 				filteredUsers: action.payload
// 			}
// 		case actions.SET_CUSTOMERS:
// 			return { ...states, users: action.payload }
// 		case actions.SET_SEARCHCUSTOMER:
// 			return { ...states, searchCustomer: action.payload }
// 		case actions.SET_FILTEREDUSERS:
// 			return { ...states, filteredUsers: action.payload }

// 		default:
// 			return { ...states }
// 	}
// }

// // Setting up component Reducer
// const [states, dispatch] = React.useReducer(CReducer, initialStates)
// const { searchCustomer, users, filteredUsers } = states

// const handleChange = ({ target: { value } }) => {
// 	dispatch({ type: actions.SET_SEARCHCUSTOMER, payload: value })

// 	// By default, setting new list to original customers list
// 	let newCustomerList = [...users]

// 	if (value !== '') {
// 		newCustomerList = []

// 		// filtering on firstname + lastname + email
// 		newCustomerList.push(
// 			...users.filter((user) => user.firstname.includes(value)),
// 			...users.filter((user) => user.lastname.includes(value)),
// 			...users.filter((user) => user.email.includes(value))
// 		)

// 		// Using Set to get UNIQUE customers
// 		newCustomerList = [...new Set(newCustomerList)]
// 	}

// 	// Setting filtered customers
// 	dispatch({
// 		type: actions.SET_FILTEREDUSERS,
// 		payload: newCustomerList
// 	})
// }

// React.useEffect(() => {
// 	fetch(`${window.electron.url}/api/user/customers`, {
// 		headers: {
// 			Authorization: `bearer ${JSON.parse(
// 				localStorage.getItem('REACT_TOKEN_AUTH_AMAIZON')
// 			)}`
// 		}
// 	}).then((res) => {
// 		if (res.ok) {
// 			res.json().then((data) => {
// 				const { user: customers } = data
// 				console.log(customers)
// 				dispatch({
// 					type: actions.INIT_CUSTOMERS,
// 					payload: customers
// 				})
// 			})
// 		}
// 	})
// }, [])
