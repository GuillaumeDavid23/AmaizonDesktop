// React import
import React from 'react'

// React Router import
import { useNavigate } from 'react-router-dom'

// Layout imports
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

// Bootstrap Design imports
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

// Sub component imports
import { CustomerListItem } from './components'
import Title from '../globalComponents/Title/Title'

// Initial component States
const initialStates = {
	searchCustomer: '',
	users: [],
	filteredUsers: []
}

// Component Actions
const actions = {
	INIT_CUSTOMERS: 'INIT_CUSTOMERS',
	SET_CUSTOMERS: 'SET_CUSTOMERS',
	SET_SEARCHCUSTOMER: 'SET_SEARCHCUSTOMER',
	SET_FILTEREDUSERS: 'SET_FILTEREDUSERS'
}

// Component Reducer
const CReducer = (states, action) => {
	switch (action.type) {
		case actions.INIT_CUSTOMERS:
			return {
				...states,
				users: action.payload,
				filteredUsers: action.payload
			}
		case actions.SET_CUSTOMERS:
			return { ...states, users: action.payload }
		case actions.SET_SEARCHCUSTOMER:
			return { ...states, searchCustomer: action.payload }
		case actions.SET_FILTEREDUSERS:
			return { ...states, filteredUsers: action.payload }

		default:
			return { ...states }
	}
}

// Actual Component
const Customers = () => {
	// Setting up component Reducer
	const [states, dispatch] = React.useReducer(CReducer, initialStates)
	const { searchCustomer, users, filteredUsers } = states

	// Filter change Handler
	const handleChange = ({ target: { value } }) => {
		dispatch({ type: actions.SET_SEARCHCUSTOMER, payload: value })

		// By default, setting new list to original customers list
		let newCustomerList = [...users]

		if (value !== '') {
			newCustomerList = []

			// filtering on firstname + lastname + email
			newCustomerList.push(
				...users.filter((user) =>
					user.firstname.toLowerCase().includes(value)
				),
				...users.filter((user) =>
					user.lastname.toLowerCase().includes(value)
				),
				...users.filter((user) =>
					user.email.toLowerCase().includes(value)
				)
			)

			// Using Set to get UNIQUE customers
			newCustomerList = [...new Set(newCustomerList)]
		}

		// Setting filtered customers
		dispatch({
			type: actions.SET_FILTEREDUSERS,
			payload: newCustomerList
		})
	}

	// Get navigation
	const navigate = useNavigate()

	// Fetch customer withhis id
	React.useEffect(() => {
		fetch(`${window.electron.url}/api/user/customers`, {
			headers: {
				Authorization: `bearer ${JSON.parse(
					localStorage.getItem('REACT_TOKEN_AUTH_AMAIZON')
				)}`
			}
		}).then((res) => {
			if (res.ok) {
				res.json().then((data) => {
					const { user: customers } = data
					console.log(customers)
					dispatch({
						type: actions.INIT_CUSTOMERS,
						payload: customers
					})
				})
			}
		})
	}, [])

	// Electron KeyHandling Callback
	const handleElectronKeyPress = React.useCallback((event) => {
		const { key, ctrlKey } = event

		if (ctrlKey && key === 'n') {
			window.electron.send('mainGoToPage', '/customerAdd')
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
		<Grid sx={{ height: '100%' }}>
			<Box>
				{/* Component Header */}
				<Title text="Client" variant="h5" />

				{/* Filter Input */}
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						margin: 'auto',
						width: '33%',
						justifySelf: 'center'
					}}
				>
					<FormControl
						onChange={handleChange}
						placeholder="Rechercher..."
						value={searchCustomer || ''}
					/>
				</Box>
				{/* Add user Button */}
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
						paddingRight: '50px'
					}}
				>
					<Button
						style={{
							backgroundColor: '#647F94',
							borderColor: '#647F94'
						}}
						onClick={() => {
							navigate('/customerAdd')
						}}
					>
						Ajouter un client
					</Button>
				</Box>
			</Box>

			{/* Customers list */}
			<Grid
				container
				sx={{
					marginTop: '0px',
					paddingX: '20px',
					overflowY: 'scroll',
					height: '75%'
				}}
				spacing={3}
			>
				{filteredUsers.map((customer) => {
					return (
						<Grid
							item
							xs={4}
							key={`${customer.id}_${customer.email}`}
						>
							<CustomerListItem customer={customer} />
						</Grid>
					)
				})}
			</Grid>
		</Grid>
	)
}

export default Customers
