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
		propertyRef,
		isToSell
	} = props.propertyDatas
	const navigate = useNavigate()

	return (
		<Card className="w-100" id={_id} style={{height: 'fit-content'}}>
			<Card.Body className="d-flex flex-column">
				<Card.Title style={{textAlign: 'center'}}>{title}</Card.Title>
				<Row>
					<Col
						xs={12}
						className="d-flex justify-content-center"
					>
						Ref: {propertyRef}
					</Col>
				</Row>
				<Row className="align-items-center mt-3">
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
							style={{padding: '10px'}}
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
