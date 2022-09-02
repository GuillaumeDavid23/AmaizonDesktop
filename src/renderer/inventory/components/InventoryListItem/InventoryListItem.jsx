// React import
import React from 'react'

// Layout imports
import Box from '@mui/material/Box'

// MUI Design import
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Icon import
import ArrowForward from '@mui/icons-material/ArrowForward'

import { Col, Container, Image, Row } from 'react-bootstrap'
import './InventoryListItem.css'
import ModalInventory from '../singleInventory/ModalInventory'
import { styled, Tooltip, tooltipClasses } from '@mui/material'

const InventoryListItem = (props) => {
	const { inventory } = props

	// Modal state
	const [open, setOpen] = React.useState(false)
	const [openTips, setOpenTips] = React.useState(false)

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

	let condtionsArrayName = {
		1: 'Très mauvais',
		2: 'Mauvais',
		3: 'Pas top',
		4: 'Moyen',
		5: 'Bon',
		6: 'Très Bon'
	}
	let sumCondition = 0
	let countCondition = 0
	inventory.lst_roomDetails.forEach((roomDetail) => {
		countCondition++
		sumCondition += roomDetail.condition
	})
	let avgCondition = Math.round(sumCondition / countCondition)

	return (
		<Container
			style={{
				display: 'flex',
				flexDirection: 'column',
				backgroundColor: '#ECE6DE',
				padding: '10px',
				borderRadius: '5px',
				boxShadow: '3px 5px 10px #737373'
			}}
		>
			<ModalInventory
				inventory={inventory}
				handleModalClose={handleModalClose}
				open={open}
			/>
			{/* User Informations */}
			<Row>
				{/* Customer Info + Prefs */}
				<Box sx={{ paddingLeft: '10px', width: '100%' }}>
					<Typography align="center">
						{inventory.id_rental.id_property.title}
					</Typography>
					<Typography align="center" style={{ fontSize: '13px' }}>
						Ref: {inventory.id_rental.id_property.propertyRef}
					</Typography>
					<Box
						sx={{
							width: '100%',
							marginTop: '10px',
							marginBottom: '10px'
						}}
					>
						<Typography
							align="center"
							style={{ textTransform: 'capitalize' }}
						>
							Condition globale
						</Typography>
						<Box className="barreBox">
							<Image
								src={require('../../../../assets/images/barre_solo.png')}
								fluid
								onMouseEnter={() => setOpenTips(true)}
								onMouseLeave={() => setOpenTips(false)}
							/>
							<Tooltip
								open={openTips}
								arrow
								placement="right-start"
								title={condtionsArrayName[avgCondition]}
							>
								<Box
									className={`pointerBarre ${condtionsArray[avgCondition]}`}
								></Box>
							</Tooltip>
						</Box>
					</Box>
				</Box>
			</Row>
			{/* User Actions */}
			<Row
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
			</Row>
		</Container>
	)
}

export default InventoryListItem
