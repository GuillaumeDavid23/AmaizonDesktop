import { Box } from '@mui/material'
import FormNavigation from './FormNavigation'
import { useState, useEffect } from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
// import { useAuth } from '../../hooks'
import { searchClient, getClient } from '../../services/Client'
// import Checkbox from '../../globalComponents/Checkbox'

const Page6 = ({
	visiblePage,
	handleNavigation,
	errors,
	token,
	checked,
	setChecked
}) => {
	// Recherche du Seller:
	const [searchSeller, setSearchSeller] = useState('')
	const [sellers, setSellers] = useState([])
	useEffect(() => {
		if (searchSeller.length > 0) {
			searchClient(token, searchSeller)
				.then((res) => {
					setSellers(res.datas)
				})
				.catch((err) => {
					console.log(err)
				})
		} else {
			setSellers([])
		}
		//Get ALL des vendeurs et affichage A FAIRE !!
	}, [searchSeller, token])

	// Récupération du vendeur à l'update:
	useEffect(() => {
		if (checked && !searchSeller) {
			getClient(checked, token).then((res) => {
				setSearchSeller(res.data.lastname)
			})
		}
	}, [checked, searchSeller, token])
	
	return (
		<Box className={`form-part ${visiblePage !== 6 ? 'd-none' : ''}`}>
			<h1>Etape 6 - Nom du vendeur:</h1>

			<OutlinedInput
				className={`ps-2 my-3 form-control ${
					errors.amount ? 'is-invalid' : ''
				}`}
				variant="filled"
				placeholder="Rechercher un vendeur"
				value={searchSeller}
				onChange={(e) => setSearchSeller(e.target.value)}
				// style={{
				// 	height: 30,
				// 	border: '1px solid grey',
				// 	backgroundColor: 'white'
				// }}
			/>

			<Box className="mb-3">
				{sellers.map((seller) => {
					return (
						<Box key={seller._id} className="d-flex">
							<span className="w-75 text-center">
								{seller.lastname} {seller.firstname}
							</span>
							<Box className="w-25">
								<input
									type="checkbox"
									checked={checked === seller._id}
									onChange={() =>
										setChecked(
											checked !== seller._id
												? seller._id
												: null
										)
									}
								/>
								{/* <Checkbox
							status={
								checked === seller._id ? 'checked' : 'unchecked'
							}
							onPress={() => {
								setChecked(
									checked !== seller._id ? seller._id : null
								)
							}}
						/> */}
							</Box>
						</Box>
					)
				})}
			</Box>

			<FormNavigation
				visiblePage={visiblePage}
				handleNavigation={handleNavigation}
			/>
		</Box>
	)
}

export default Page6
