import { Box } from '@mui/material'
import FormNavigation from './FormNavigation'
import BtnGeneral from '../../globalComponents/BtnGeneral/BtnGeneral'

const Page7 = ({ visiblePage, handleNavigation, register, errors }) => {
	const photosLabel = ['photo1', 'photo2', 'photo3', 'photo4', 'photo5']

	return (
		<Box className={`form-part ${visiblePage !== 7 ? 'd-none' : ''}`}>
			<h1>Etape 7 - Ajout de photos:</h1>

			<Box>
				{photosLabel.map((label) => {
					return (
						<Box key={label} className="my-3">
							<label className="d-flex justify-content-center align-items-center my-3">
								Photo {label.substring(5, 6)}:
								<input
									type="file"
									className="ms-3"
									{...register(label)}
								/>
							</label>
							{errors[label] && (
								<span className="invalid-feedback fw-bold text-center">
									{errors[label].message}
								</span>
							)}
						</Box>
					)
				})}
			</Box>

			<Box className={'d-flex justify-content-around'}>
				<FormNavigation
					visiblePage={visiblePage}
					handleNavigation={handleNavigation}
				/>
				{/* Submit Button */}
				<BtnGeneral text={'Ajouter'} />
			</Box>
		</Box>
	)
}

export default Page7
