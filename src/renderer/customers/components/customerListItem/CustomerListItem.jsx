// React import
import React from 'react'

// Layout imports
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

// MUI Design import
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Bootstrap Design import
import { Image } from 'react-bootstrap'

// Icon import
import ArrowForward from '@mui/icons-material/ArrowForward'

const CustomerListItem = (props) => {
	const { customer } = props

	const callNewWindowForUser = React.useCallback(() => {
		window.electron.send('showCustomerDetailWindow', customer._id)
	}, [])

	return (
		<Grid
			container
			sx={{
				display: 'flex',
				flexDirection: 'column',
				backgroundColor: '#ECE6DE',
				padding: '10px',
				borderRadius: '5px',
				boxShadow: '3px 5px 10px #737373'
			}}
		>
			{/* User Informations */}
			<Grid item sx={{ display: 'flex', flexDirection: 'row' }}>
				{/* Profil Pic */}
				<Box
					sx={{
						height: '100px',
						width: '100px'
					}}
				>
					<Image
						style={{ borderRadius: '10px' }}
						fluid
						src={
							window.electron.url +
							'/avatar/' +
							customer._id +
							'.png'
						}
						onError={({ currentTarget }) => {
							currentTarget.onerror = null // prevents looping
							currentTarget.src = require('../../../../assets/images/blank_profile.png')
						}}
					/>
				</Box>
				{/* Customer Info + Prefs */}
				<Box sx={{ paddingLeft: '10px' }}>
					<Typography>
						{customer.firstname} {customer.lastname} (
						<i>{customer.email}</i>)
					</Typography>

					<Typography>
						<i>Préférences W.I.P</i>
					</Typography>
				</Box>
			</Grid>
			{/* User Actions */}
			<Grid
				item
				sx={{
					justifyContent: 'center',
					width: '100%'
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: { sm: 'column', md: 'row' },
						paddingTop: '10px',
						overflowY: 'auto',
						justifyContent: 'space-around',
						alignItems: 'center'
					}}
				>
					<Button
						variant="contained"
						sx={{
							width: { sm: '70%', md: '33%' },
							backgroundColor: '#647F94',
							borderRadius: '10px 0px 0px 10px',
							'&:hover': {
								backgroundColor: '#647F94'
							},
							fontSize: '75%'
						}}
					>
						Modifier
					</Button>
					<Button
						variant="contained"
						sx={{
							width: { sm: '70%', md: '33%' },
							backgroundColor: '#647F94',
							borderRadius: '0px',
							'&:hover': {
								backgroundColor: '#647F94'
							},
							fontSize: '75%'
						}}
					>
						Rendez-vous
					</Button>
					<Button
						variant="contained"
						sx={{
							width: { sm: '70%', md: '33%' },
							backgroundColor: '#647F94',
							borderRadius: '0px 10px 10px 0px',
							'&:hover': {
								backgroundColor: '#647F94'
							},
							fontSize: '75%'
						}}
						endIcon={<ArrowForward />}
						onClick={callNewWindowForUser}
					>
						Voir plus
					</Button>
				</Box>
			</Grid>
		</Grid>
	)
}

export default CustomerListItem
