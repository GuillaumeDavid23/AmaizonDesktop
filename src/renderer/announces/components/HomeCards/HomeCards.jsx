import { Link } from 'react-router-dom'
import { useState } from 'react'
import { BsBorderAll } from 'react-icons/bs'
import { MdLocationSearching, MdArchitecture } from 'react-icons/md'
import BtnGeneral from '../../../globalComponents/BtnGeneral/BtnGeneral'
import { Card } from 'react-bootstrap'
import './HomeCards.css'

const HomeCards = (props) => {
	const {
		_id,
		imageUrl,
		title,
		description,
		amount,
		surface,
		roomNumber,
		location,
		transactionType
	} = props.propertyDatas

	return (
		<Card className="mb-5" id={_id}>
			<Card.Img
				variant="top"
				src={window.electron.url + '/' + imageUrl?.photo1}
				alt={'Super photo 1'}
				className="h-100"
			/>
			<Card.Body className="d-flex flex-column">
				<Card.Title>{title}</Card.Title>
				<div>
					<p className="card-text">{description}</p>
					<div className="text-center">
						<div className="price ">
							{amount?.toLocaleString('FR')} €{' '}
							<small className="location text-secondary">
								{transactionType === 'Location' ? '/ Mois' : ''}
							</small>
						</div>
						<div className="d-flex justify-content-evenly mt-2">
							<div className="d-flex flex-column align-items-center fw-bold">
								<BsBorderAll size={20} />
								{roomNumber} pièce(s)
							</div>
							<div className="d-flex flex-column align-items-center fw-bold">
								<MdLocationSearching size={20} />
								{location}
							</div>
							<div className="d-flex flex-column align-items-center fw-bold">
								<MdArchitecture size={20} />
								{surface} m²
							</div>
						</div>
					</div>
				</div>

				<div className="d-flex justify-content-center align-items-center">
					<Link
						to={`/home`}
						className="d-flex justify-content-center"
						style={{ textDecoration: 'none' }}
					>
						<BtnGeneral
							className="w-100 h-50"
							text="Voir l'annonce"
						/>
					</Link>
				</div>
			</Card.Body>
		</Card>
	)
}

export default HomeCards
