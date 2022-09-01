import { Box } from '@mui/material'
import React from 'react'
import { strRandom } from '../../../utils/funcs'
import InputFile from '../../globalComponents/inputFile/InputFile'
import '../CustomerAdd.css'
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
					<InputFile register={register} state={state} />
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
