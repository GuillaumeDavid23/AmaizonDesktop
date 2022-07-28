import { useNavigate } from 'react-router-dom'
import { BsBorderAll, BsCheckCircleFill, BsEyeFill, BsXCircleFill } from 'react-icons/bs'
import { MdLocationSearching, MdArchitecture, MdEdit } from 'react-icons/md'
import BtnGeneral from '../../../globalComponents/BtnGeneral/BtnGeneral'
import { Card, Col, Row } from 'react-bootstrap'
import './HomeCards.css'
import { Box, IconButton } from '@mui/material'
import { PhotoCamera } from '@mui/icons-material'

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
		propertyRef,
		isToSell
	} = props.propertyDatas
	const navigate = useNavigate()

	return (
		<Card className="w-100" id={_id} style={{ height: 'fit-content' }}>
			<Card.Header>
				<Card.Title style={{ textAlign: 'center' }}>{title}</Card.Title>
			</Card.Header>
			<Card.Body className="d-flex flex-column">
				<Row className="align-items-center justify-content-center">
					<Col xs={12} className="d-flex justify-content-center">
						Ref: {propertyRef}
					</Col>
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
				</Row>
			</Card.Body>
			<Card.Footer>
				<Row className="align-items-center justify-content-center mt-2">
					<Col xs={12} md={8} lg={6}>
						<IconButton
							style={{ color: '#647f94' }}
							onClick={() =>
								navigate('/createAnnounce', {
									state: { id: props.propertyDatas._id }
								})
							}
						>
							<MdEdit size={25} />
						</IconButton>
					</Col>
					<Col
						xs={12}
						md={8}
						lg={6}
						className="d-flex justify-content-end"
					>
						<IconButton
							style={{ color: '#647f94' }}
							onClick={() =>
								navigate('/singleAnnounce', {
									state: { property: props.propertyDatas }
								})
							}
						>
							<BsEyeFill size={25} />
						</IconButton>
					</Col>
				</Row>
			</Card.Footer>
		</Card>
	)
}

export default HomeCards
