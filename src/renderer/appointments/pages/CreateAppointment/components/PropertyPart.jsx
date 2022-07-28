import { Box } from '@mui/material'
import { FormControl } from 'react-bootstrap'
import { BtnGeneral } from '../../../../globalComponents'
import { useState } from 'react'
import { searchProperties } from '../../../../services/Property'

const PropertyPart = ({ register, errors, setValue }) => {
	const [propertiesShown, setPropertiesShown] = useState([])
	const [propertySelected, setPropertySelected] = useState()

	const handlePropertySearch = () => {
		searchProperties({
			search: document.querySelector('#propertySearch').value,
			transactionType: '',
			propertyType: '',
			location: '',
			minPrice: '',
			maxPrice: '',
			roomNumberMin: '',
			roomNumberMax: '',
			surfaceMin: '',
			surfaceMax: '',
			isToSell: ''
		})
			.then((res) => {
				let propertySelectedInList = false
				res.data.forEach((property) => {
					if (property._id === propertySelected) {
						propertySelectedInList = true
					}
				})
				if (!propertySelectedInList) {
					setPropertySelected()
				}
				setPropertiesShown(res.data)
			})
			.catch((err) => {
				console.log(err)
			})
	}

	const handlePropertyPick = (propertyId) => {
		setPropertySelected(propertyId)
		setValue('property', propertyId)
	}

	return (
		<>
			<Box className="appointmentFormPart">
				<h2>Ajouter une propriété</h2>
				<Box className="d-flex">
					<FormControl id="propertySearch" placeholder="Rechercher" />
					<BtnGeneral
						type="button"
						text="RECHERCHER"
						className="w-auto"
						onClick={handlePropertySearch}
					/>
				</Box>
				{propertiesShown.map((property) => {
					return (
						<Box
							key={property._id}
							className={`appointmentFormBox${
								propertySelected === property._id
									? ' bg-light'
									: ''
							}`}
							onClick={() => handlePropertyPick(property._id)}
						>
							<img alt={`${property.title}`} />
							<span className="fw-bold">{property.title}</span>
						</Box>
					)
				})}
				<input
					defaultValue={''}
					className={`d-none${errors.property ? ' is-invalid' : ''}`}
					{...register('property', {
						required: 'Vous devez indiquer une Propriété..'
					})}
				/>
				{errors?.property && (
					<span className="invalid-feedback fw-bold text-center">
						{errors.property.message}
					</span>
				)}
			</Box>
		</>
	)
}

export default PropertyPart