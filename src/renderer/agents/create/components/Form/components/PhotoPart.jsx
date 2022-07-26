import { Box } from '@mui/material'
import { strRandom } from '../../../../../../utils/funcs'

const PhotoPart = ({ state, register, errors }) => {
	return (
		<>
			<Box className="my-3">
				<label
					htmlFor="photo"
					className={`d-flex justify-content-around${
						errors.photo ? ' is-invalid' : ''
					}`}
				>
					<span>Photo de l'agent:</span>
					<input
						id="photo"
						type="file"
						{...register('photo', {
							required: !state
								? 'Vous devez ajouter une photo.'
								: false
						})}
					/>
				</label>
				{errors?.photo && (
					<span className="invalid-feedback fw-bold text-center">
						{errors.photo.message}
					</span>
				)}
			</Box>
			{state && (
				<Box className="d-flex justify-content-around mb-3">
					<span>Photo actuelle:</span>
					<img
						className="w-25"
						src={`${window.electron.url}/avatar/${
							state.id
						}.png?v=${strRandom(10)}`}
						alt="Avatar"
					/>
				</Box>
			)}
		</>
	)
}

export default PhotoPart
