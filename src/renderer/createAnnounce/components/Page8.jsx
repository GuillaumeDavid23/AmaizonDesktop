import { Box } from '@mui/material'
import BtnGeneral from '../../globalComponents/BtnGeneral/BtnGeneral'
import FormNavigation from './FormNavigation'

const Page8 = ({
	visiblePage,
	handleNavigation,
	datasToDisplay,
	seller,
	datasToValidate,
	handleValidation
}) => {
	// Traduction anticipée des clés:
	const translatingObject = {
		title: 'Intitulé',
		propertyType: 'Type de propriété',
		location: 'Adresse',
		surface: 'Surface',
		roomNumber: 'Nombre de chambres',
		transactionType: 'Type de transaction',
		amount: 'Prix',
		list_equipments: 'Liste des équipements',
		isToSell: 'Est à vendre dès maintenant',
		photo1: 'Photo n°1',
		photo2: 'Photo n°2',
		photo3: 'Photo n°3',
		photo4: 'Photo n°4',
		photo5: 'Photo n°5',
		propertyRef: 'Référence de la propriété'
	}

	return (
		<Box className={`form-part ${visiblePage !== 8 ? 'd-none' : ''}`}>
			<h1>Récapitulatif:</h1>
			{datasToDisplay && (
				<table className="my-3">
					<tbody>
						{Object.keys(datasToDisplay).map((key) => {
							return (
								<tr
									className="border-bottom border-dark"
									key={key}
								>
									<td className="pe-2">
										{translatingObject[key]}:
									</td>
									<td className="ps-2">
										{/* Tableaux: */}
										{typeof datasToDisplay[key] ===
											'object' &&
											!datasToDisplay[key].name && (
												<span>
													{datasToDisplay[key].join(
														', '
													)}
												</span>
											)}

										{/* Photos prises: */}
										{typeof datasToDisplay[key] ===
											'object' &&
											datasToDisplay[key].name && (
												<span>Photo prise</span>
											)}

										{/* Strings: */}
										{typeof datasToDisplay[key] ===
											'string' &&
											datasToDisplay[key] !==
												'[object Object]' &&
											datasToDisplay[key] !== 'true' &&
											datasToDisplay[key] !== 'false' && (
												<span>
													{datasToDisplay[key]}
												</span>
											)}

										{/* Booleans true: */}
										{datasToDisplay[key] === 'true' && (
											<span>Oui</span>
										)}

										{/* Booleans false: */}
										{datasToDisplay[key] === 'false' && (
											<span>Non</span>
										)}
									</td>
								</tr>
							)
						})}
						<tr>
							<td className="pe-2">
								<span>Vendeur</span>
							</td>
							<td className="ps-2">
								<span>
									{seller.lastname} {seller.firstname}
								</span>
							</td>
						</tr>
					</tbody>
				</table>
			)}
			<Box className={'d-flex justify-content-around'}>
				<FormNavigation
					visiblePage={visiblePage}
					handleNavigation={handleNavigation}
				/>
				{/* Submit Button */}
				<BtnGeneral
					type="button"
					text={'Valider'}
					onClick={() => handleValidation(datasToValidate)}
				/>
			</Box>
		</Box>
	)
}

export default Page8
