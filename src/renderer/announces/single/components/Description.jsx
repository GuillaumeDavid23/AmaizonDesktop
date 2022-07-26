import { Box } from '@mui/material'
import { Col, Row } from 'react-bootstrap'
import { BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import BtnGeneral from '../../../globalComponents/BtnGeneral/BtnGeneral'

const Description = (props) => {
	const { data } = props
	let navigate = useNavigate()

	return (
		<div className="description mt-5 mb-5">
			<Row className="justify-content-between">
				<Col xs={12} md={8} lg={6}>
					<h2 className="d-flex align-items-center">
						{data.title} de {data.surface} m²
					</h2>
				</Col>
				<Col xs={12} md={8} lg={6}>
					{data.isToSell ? (
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
