import { Box } from '@mui/material'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import BtnGeneral from '../../../globalComponents/BtnGeneral/BtnGeneral'
import { useAuth, useSlideSnack } from '../../../hooks'
import { changeDispo } from '../../../services/Property'

const Description = (props) => {
	const { data } = props
	const [isToSell, setIsToSell] = React.useState(data.isToSell)

	const { authToken } = useAuth()
	let navigate = useNavigate()
	// Gestion de la snack Params:
	const [snackParams, setSnackParams] = React.useState({
		message: '',
		severity: 'error'
	})
	
	const { handleOpen, renderSnack } = useSlideSnack({
		message: snackParams.message,
		time: 2000,
		severity: snackParams.severity
	})
	React.useEffect(() => {
		if (snackParams.message) {
			handleOpen()
		}
	}, [snackParams, handleOpen])
	
	const handleDispo = (dispo) => {
		changeDispo(data._id, authToken).then((response) => {
			setIsToSell(!isToSell)
			setSnackParams({message: response.message, severity: 'success'})
		})
	}
	
	return (
		<div className="description mt-5 mb-5">
			{renderSnack}
			<Row className="justify-content-between">
				<Col xs={12} md={8} lg={6}>
					<h2 className="d-flex align-items-center">
						{data.title} de {data.surface} m²
					</h2>
				</Col>
				<Col xs={12} md={8} lg={6}>
					{isToSell ? (
						<Box className="d-flex justify-content-end align-items-center">
							<BsCheckCircleFill color="green" size={20} />{' '}
							<strong
								className="ms-2"
								style={{ fontSize: '20px' }}
							>
								Dispo
							</strong>{' '}
						</Box>
					) : (
						<Box className="d-flex justify-content-end align-items-center">
							<BsXCircleFill color="red" size={20} />{' '}
							<strong
								className="ms-2"
								style={{ fontSize: '20px' }}
							>
								Non dispo
							</strong>
						</Box>
					)}
				</Col>
			</Row>
			<small>Ref : {data.propertyRef}</small>
			<h4>Description :</h4>
			<p>{data.description}</p>
			<div className="d-flex justify-content-between align-items-center">
				<h3>Prix : {data.amount?.toLocaleString('FR')} €</h3>
				<Box>
					<BtnGeneral
						text={`Rendre ${
							isToSell ? 'indisponible' : 'disponible'
						}`}
						className={`me-3 btnDispo ${
							isToSell ? 'btnIndispo' : 'btnDispo'
						}
						`}
						onClick={() => handleDispo(isToSell ? false : true)}
					/>
					<BtnGeneral
						text="Modifier"
						className="btnRdv me-3"
						onClick={() =>
							navigate('/createAnnounce', {
								state: { id: data._id }
							})
						}
					/>
					<Link to={`/takeAppointment/${data._id}`}>
						<BtnGeneral text="Prendre RDV" className="btnRdv" />
					</Link>
				</Box>
			</div>
		</div>
	)
}

export default Description
