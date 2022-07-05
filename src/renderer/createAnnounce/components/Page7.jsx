import { Box } from '@mui/material'
import FormNavigation from './FormNavigation'
import BtnGeneral from '../../globalComponents/BtnGeneral/BtnGeneral'

const Page7 = ({ visiblePage, handleNavigation, register, errors }) => {
	const handlePhotos = async (photoNumber) => {
		// let result = await DocumentPicker.getDocumentAsync()
		// let photosListToState = photosList
		// switch (photoNumber) {
		// 	case 1:
		// 		photosListToState.photo1 = result.file
		// 		break
		// 	case 2:
		// 		photosListToState.photo2 = result.file
		// 		break
		// 	case 3:
		// 		photosListToState.photo3 = result.file
		// 		break
		// 	case 4:
		// 		photosListToState.photo4 = result.file
		// 		break
		// 	case 5:
		// 		photosListToState.photo5 = result.file
		// 		break
		// 	default:
		// }
		// setPhotosList(photosList)
	}

	return (
		<Box className={`form-part ${visiblePage !== 7 ? 'd-none' : ''}`}>
			<h1>Etape 7 - Ajout de photos:</h1>

			<Box>
				<label className="my-3">
					Photo 1:
					<input type="file" {...register('photo1')} />
				</label>
				{errors?.photo1 && (
					<span className="invalid-feedback fw-bold text-center">
						{errors.photo1.message}
					</span>
				)}

				<label className="my-3">
					Photo 2:
					<input type="file" {...register('photo2')} />
				</label>
				{errors?.photo2 && (
					<span className="invalid-feedback fw-bold text-center">
						{errors.photo2.message}
					</span>
				)}

				<label className="my-3">
					Photo 3:
					<input type="file" {...register('photo3')} />
				</label>
				{errors?.photo3 && (
					<span className="invalid-feedback fw-bold text-center">
						{errors.photo3.message}
					</span>
				)}

				<label className="my-3">
					Photo 4:
					<input type="file" {...register('photo4')} />
				</label>
				{errors?.photo4 && (
					<span className="invalid-feedback fw-bold text-center">
						{errors.photo4.message}
					</span>
				)}

				<label className="my-3">
					Photo 5:
					<input type="file" {...register('photo5')} />
				</label>
				{errors?.photo5 && (
					<span className="invalid-feedback fw-bold text-center">
						{errors.photo5.message}
					</span>
				)}
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
