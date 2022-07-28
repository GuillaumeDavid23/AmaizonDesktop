import { useState } from 'react'
import { Box, Button, Grid, Typography } from '@mui/material'
import Modal from 'react-bootstrap/Modal'
import { ArrowForward } from '@mui/icons-material'
import { AgentDetails } from './components'
import { useNavigate } from 'react-router-dom'
import { Image } from 'react-bootstrap'

const AgentListItem = ({ agent }) => {
	// Déclaration useNavigate:
	let navigate = useNavigate()

	// Modal state
	const [open, setOpen] = useState(false)

	const handleModalClose = () => {
		setOpen(false)
	}

	const handleModalOpen = () => {
		setOpen(true)
	}

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
			{/* CustomerInfo Modal */}
			<Modal
				show={open}
				onHide={handleModalClose}
				style={{ height: '800px' }}
			>
				<AgentDetails user={agent} />
			</Modal>
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
						{agent.firstname} {agent.lastname}
					</Typography>
					<Typography>
						(<i>{agent.email}</i>)
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
						Modifier
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
						Rendez-vous
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
						onClick={handleModalOpen}
					>
						Voir plus
					</Button>
				</Box>
			</Grid>
		</Grid>
	)
}

export default AgentListItem
