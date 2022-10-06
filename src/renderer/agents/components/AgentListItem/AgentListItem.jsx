import React from 'react'
import { Box, Button, Grid, Typography } from '@mui/material'
import { ArrowForward } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import { BsEyeFill, BsCalendar2Date, BsPen } from 'react-icons/bs'
const AgentListItem = ({ agent }) => {
	// Déclaration useNavigate:
	let navigate = useNavigate()

	// Modal state
	const callNewWindowForUser = React.useCallback(() => {
		window.electron.send('showAgentDetailWindow', agent._id)
	}, [agent._id])

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
						width: '100px',
						borderRadius: '10px'
					}}
				>
					<Image
						style={{ borderRadius: '10px' }}
						fluid
						src={
							window.electron.url +
							'/avatar/' +
							agent._id +
							'.png'
						}
						onError={({ currentTarget }) => {
							currentTarget.onerror = null // prevents looping
							currentTarget.src = require('../../../../assets/images/blank_profile.png')
						}}
					/>
				</Box>
				{/* Agent Info + Prefs */}
				<Box sx={{ paddingLeft: '10px' }}>
					<Typography>
						Agent n°{agent.ref}
					</Typography>
					<Typography>
						{agent.firstname} {agent.lastname}
					</Typography>
					<Typography fontStyle="italic" fontSize={14}>
						{agent.email}
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
							fontSize: '0.8em',
							width: { sm: '70%', md: '33%' },
							backgroundColor: '#647F94',
							borderRadius: '10px 0px 0px 10px',
							'&:hover': {
								backgroundColor: '#647F94'
							}
						}}
						onClick={() =>
							navigate('/createAgent', {
								state: { id: agent.id }
							})
						}
					>
						<BsPen size={20} />
					</Button>
					<Button
						variant="contained"
						sx={{
							fontSize: '0.8em',
							width: { sm: '70%', md: '33%' },
							backgroundColor: '#647F94',
							borderRadius: '0px',
							'&:hover': {
								backgroundColor: '#647F94'
							}
						}}
						onClick={() =>
							navigate('/', {
								state: {
									snackParams: {
										message:
											'Fonctionnalité pas encore développée !',
										severity: 'warning'
									}
								}
							})
						}
					>
						<BsCalendar2Date size={20} />
					</Button>
					<Button
						variant="contained"
						sx={{
							fontSize: '0.8em',
							width: { sm: '70%', md: '33%' },
							backgroundColor: '#647F94',
							borderRadius: '0px 10px 10px 0px',
							'&:hover': {
								backgroundColor: '#647F94'
							}
						}}
						endIcon={<ArrowForward />}
						onClick={callNewWindowForUser}
					>
						<BsEyeFill size={20} />
					</Button>
				</Box>
			</Grid>
		</Grid>
	)
}

export default AgentListItem
