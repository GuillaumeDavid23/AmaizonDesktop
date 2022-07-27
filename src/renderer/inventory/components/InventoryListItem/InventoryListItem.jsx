// React import
import React from 'react'

// Layout imports
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

// MUI Design import
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Bootstrap design imports
import Modal from 'react-bootstrap/Modal'

// Icon import
import ArrowForward from '@mui/icons-material/ArrowForward'
import { Image } from 'react-bootstrap'
import './InventoryListItem.css'
const InventoryListItem = (props) => {
	const { inventory } = props

	// Modal state
	const [open, setOpen] = React.useState(false)

	const handleModalClose = () => {
		setOpen(false)
	}

	const handleModalOpen = () => {
		setOpen(true)
	}

	let condtionsArray = {
		1: 'lowest',
		2: 'low',
		3: 'medium-low',
		4: 'medium',
		5: 'high',
		6: 'highest'
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
				YES
			</Modal>
			{/* User Informations */}
			<Grid item sx={{ display: 'flex', flexDirection: 'row' }}>
				{/* Customer Info + Prefs */}
				<Box sx={{ paddingLeft: '10px', width: '100%' }}>
					<Typography align="center">
						{inventory.id_rental.id_property.title}
					</Typography>
					<Typography align="center" style={{ fontSize: '13px' }}>
						Ref: {inventory.id_rental.id_property.propertyRef}
					</Typography>

					{inventory.lst_roomDetails.map((roomDetail, index) => {
						if (index < 4) {
							return (
								<Box sx={{ width: '100%' }}>
									<Typography
										style={{ textTransform: 'capitalize' }}
									>
										{roomDetail.name}
									</Typography>
									<Box className="barreBox">
										<Image
											src={require('../../../../assets/images/barre_solo.png')}
											fluid
										/>
										<Box
											className={`pointerBarre ${
												condtionsArray[
													roomDetail.condition
												]
											}`}
										></Box>
									</Box>
								</Box>
							)
						}
						return false
					})}
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

export default InventoryListItem
