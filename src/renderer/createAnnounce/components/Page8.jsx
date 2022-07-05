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
	return (
		<Box className={`form-part ${visiblePage !== 8 ? 'd-none' : ''}`}>
			<h1>Récapitulatif:</h1>
			{datasToDisplay && (
				<table>
					<tbody>
						{Object.keys(datasToDisplay).map((key) => {
							return (
								<tr key={key}>
									<td>{key}</td>
									<td
										style={{
											flex: 1,
											justifyContent: 'center'
										}}
									>
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
												'[object Object]' && (
												<span>
													{datasToDisplay[key]}
												</span>
											)}
										{/* Photos non-prises: */}
										{datasToDisplay[key] ===
											'[object Object]' && (
											<span>Photo non prise</span>
										)}
										{/* Booleans true: */}
										{typeof datasToDisplay[key] ===
											'boolean' &&
											datasToDisplay[key] && (
												<span>Oui</span>
											)}
										{/* Booleans false: */}
										{typeof datasToDisplay[key] ===
											'boolean' &&
											!datasToDisplay[key] && (
												<span>Non</span>
											)}
									</td>
								</tr>
							)
						})}
						<tr>
							<td>
								<span>Client</span>
							</td>
							<td>
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
