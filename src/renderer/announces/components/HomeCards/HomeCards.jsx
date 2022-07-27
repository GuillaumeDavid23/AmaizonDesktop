import { useNavigate } from 'react-router-dom'
import { BsBorderAll, BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs'
import { MdLocationSearching, MdArchitecture } from 'react-icons/md'
import BtnGeneral from '../../../globalComponents/BtnGeneral/BtnGeneral'
import { Card, Col, Row } from 'react-bootstrap'
import './HomeCards.css'
import { Box } from '@mui/material'

const HomeCards = (props) => {
	const {
		_id,
		imageUrl,
		title,
		amount,
		surface,
		roomNumber,
		location,
		transactionType,
		isToSell
	} = props.propertyDatas
	const navigate = useNavigate()

	return (
		<Card className="mb-5 w-75" id={_id}>
			<Card.Img
				variant="top"
				src={window.electron.url + '/' + imageUrl?.photo1}
				alt={'Super photo 1'}
				className="h-100"
			/>
			<Card.Body className="d-flex flex-column">
				<Card.Title>{title}</Card.Title>
				<Row className="d-flex justify-content-evenly mt-2">
					<Col className="d-flex flex-column align-items-center fw-bold">
						<BsBorderAll size={20} />
						{roomNumber} pièce(s)
					</Col>
					<Col className="d-flex flex-column align-items-center fw-bold">
						<MdLocationSearching size={20} />
						{location}
					</Col>
					<Col className="d-flex flex-column align-items-center fw-bold">
						<MdArchitecture size={20} />
						{surface} m²
					</Col>
				</Row>
				<Row>
					<Col
						xs={12}
						className="price d-flex justify-content-center"
					>
						{amount?.toLocaleString('FR')} €{' '}
						<small className="location text-secondary ms-1 align-self-end">
							{transactionType === 'Location' ? '/ Mois' : ''}
						</small>
					</Col>
				</Row>
				<Row className="align-items-center">
					<Col xs={12} md={8} lg={6}>
						{isToSell ? (
							<Box className="d-flex justify-content-center align-items-center">
								<BsCheckCircleFill color="#65A14B" />{' '}
								<strong
									className="ms-2"
									style={{ color: '#65A14B' }}
								>
									Dispo
								</strong>{' '}
							</Box>
						) : (
							<Box className="d-flex justify-content-center align-items-center">
								<BsXCircleFill color="red" />{' '}
								<strong className="ms-2">Non dispo</strong>{' '}
							</Box>
						)}
					</Col>
					<Col xs={12} md={8} lg={6}>
						<BtnGeneral
							onClick={() =>
								navigate('/singleAnnounce', {
									state: { property: props.propertyDatas }
								})
							}
							className="w-100"
							text="Voir l'annonce"
						/>
					</Col>
				</Row>
			</Card.Body>
		</Card>
	)
}

export default HomeCards
