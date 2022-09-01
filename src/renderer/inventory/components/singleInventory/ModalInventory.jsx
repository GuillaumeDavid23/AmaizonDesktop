// React import
import React from 'react'

// Layout imports
import Box from '@mui/material/Box'

// MUI Design import
import Typography from '@mui/material/Typography'

// Bootstrap design imports
import Modal from 'react-bootstrap/Modal'

// Icon import
import { RiAdminFill, RiKey2Fill, RiDoorOpenFill } from 'react-icons/ri'
import { GiElectric, GiWaterDrop } from 'react-icons/gi'
import { IoFlame } from 'react-icons/io5'
import { ImCross } from 'react-icons/im'

import { Col, Image, Row } from 'react-bootstrap'
import '../InventoryListItem/InventoryListItem.css'
import Photos from './Photos'
import { Tooltip } from '@mui/material'

const ModalInventory = (props) => {
	const { inventory, open, handleModalClose } = props
	const [openTips, setOpenTips] = React.useState(false)
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

	return (
		<Modal
			show={open}
			onHide={handleModalClose}
			className="modalSingle"
			size="xl"
		>
			<Row>
				<Box className="d-flex justify-content-end">
					<ImCross
						size={20}
						onClick={handleModalClose}
						className="crossClose"
					/>
				</Box>
			</Row>
			<Row style={{ marginBottom: '30px' }}>
				<Typography align="center">
					{inventory.id_rental.id_property.title}
				</Typography>
				<Typography align="center" style={{ fontSize: '13px' }}>
					Ref: {inventory.id_rental.id_property.propertyRef}
				</Typography>
			</Row>
			<Row sx={{ width: '100%' }} className="content">
				<Col xs={4}>
					{inventory.id_rental.id_property.imageUrl ? (
						<Photos
							data={inventory.id_rental.id_property.imageUrl}
						/>
					) : (
						<Photos data={null} />
					)}
				</Col>
				<Col xs={3}>
					{inventory.lst_roomDetails.map((roomDetail, index) => {
						return (
							<Box sx={{ width: '100%' }}>
								<Typography
									style={{ textTransform: 'capitalize' }}
									align="center"
								>
									{roomDetail.name}
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
										title={
											condtionsArrayName[
												roomDetail.condition
											]
										}
									>
										<Box
											className={`pointerBarre ${
												condtionsArray[
													roomDetail.condition
												]
											}`}
										></Box>
									</Tooltip>
								</Box>
							</Box>
						)
					})}
				</Col>
				<Col xs={5}>
					<Row>
						<Col className="divider">
							<Typography
								align="center"
								style={{
									fontSize: '15px',
									display: 'flex',
									justifyContent: 'space-between'
								}}
							>
								<RiAdminFill size={30} />
								{inventory.id_agent.firstname}{' '}
								{inventory.id_agent.lastname}
							</Typography>
							<Typography
								align="center"
								style={{
									fontSize: '15px',
									display: 'flex',
									justifyContent: 'space-between'
								}}
							>
								<RiKey2Fill size={30} />
								{inventory.keyNumber}
							</Typography>
							<Typography
								align="center"
								style={{
									fontSize: '15px',
									display: 'flex',
									justifyContent: 'space-between'
								}}
							>
								<RiDoorOpenFill size={30} />
								{inventory.inOut
									? "EDL d'Entrée"
									: 'EDL de Sortie'}
							</Typography>
						</Col>
						<Col>
							{inventory.lst_statsMeters.map((meters) => {
								let icon = ''
								let unity = ''
								switch (meters.name) {
									case 'electric':
										icon = <GiElectric size={30} />
										unity = 'Kwh'
										break
									case 'gaz':
										icon = <IoFlame size={30} />
										unity = 'm3'

										break
									case 'water':
										icon = <GiWaterDrop size={30} />
										unity = 'm3'

										break
									default:
										break
								}
								return (
									<Typography
										align="center"
										style={{
											fontSize: '15px',
											display: 'flex',
											justifyContent: 'space-between'
										}}
									>
										<Box>{icon}:</Box>
										{meters.value} {unity}
									</Typography>
								)
							})}
						</Col>
					</Row>
				</Col>
			</Row>
		</Modal>
	)
}

export default ModalInventory
