// React import
import React from 'react'

// Layout imports
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

// MUI Design imports
import Button from '@mui/material/Button'

// Bootstrap Design imports
import FormControl from 'react-bootstrap/FormControl'

// Sub component imports
import { InventoryListItem } from './components'
import Title from '../globalComponents/Title/Title'
import { BtnGeneral } from '../globalComponents'
import { useAuth } from '../hooks'
import { getInventories } from '../services/Inventories'

// Initial component States
const initialStates = {
	searchInventory: '',
	inventories: [],
	filteredInventories: []
}

// Component Actions
const actions = {
	INIT_INVENTORIES: 'INIT_INVENTORIES',
	SET_INVENTORIES: 'SET_INVENTORIES',
	SET_SEARCHINVENTORY: 'SET_SEARCHINVENTORY',
	SET_FILTEREDINVENTORIES: 'SET_FILTEREDINVENTORIES'
}

// Component Reducer
const CReducer = (states, action) => {
	switch (action.type) {
		case actions.INIT_INVENTORIES:
			return {
				...states,
				inventories: action.payload,
				filteredInventories: action.payload
			}
		case actions.SET_INVENTORIES:
			return { ...states, inventories: action.payload }
		case actions.SET_SEARCHINVENTORY:
			return { ...states, searchInventory: action.payload }
		case actions.SET_FILTEREDINVENTORIES:
			return { ...states, filteredInventories: action.payload }

		default:
			return { ...states }
	}
}
// Actual Component
const Inventory = () => {
	const { authToken } = useAuth()
	// Setting up component Reducer
	const [states, dispatch] = React.useReducer(CReducer, initialStates)
	const { searchInventory, inventories, filteredInventories } = states

	const handleChange = ({ target: { value } }) => {
		dispatch({ type: actions.SET_SEARCHINVENTORY, payload: value })

		// By default, setting new list to original customers list
		let newInventoriesList = [...inventories]

		if (value !== '') {
			newInventoriesList = []

			// filtering on firstname + lastname + email
			newInventoriesList.push(
				...inventories.filter((inventory) =>
					inventory.userReference.includes(value)
				)
			)

			// Using Set to get UNIQUE customers
			newInventoriesList = [...new Set(newInventoriesList)]
		}

		// Setting filtered customers
		dispatch({
			type: actions.SET_FILTEREDINVENTORIES,
			payload: newInventoriesList
		})
	}

	React.useEffect(() => {
		getInventories(authToken).then((res) => {
			const { inventories } = res
			dispatch({
				type: actions.INIT_INVENTORIES,
				payload: inventories
			})
		})
	}, [])

	return (
		<Grid sx={{ height: '100%' }}>
			<Box>
				{/* Component Header */}
				<Title text="Etat des lieux" variant="h5" />

				{/* Filter input */}
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
						value={searchInventory || ''}
					/>
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
				{filteredInventories.map((inventory) => {
					return (
						<Grid
							item
							xs={3}
							key={`${inventory._id}_${inventory.id_rental._id}`}
						>
							<InventoryListItem inventory={inventory} />
						</Grid>
					)
				})}
			</Grid>
		</Grid>
	)
}

export default Inventory
