import { Box } from '@mui/material'
import React from 'react'
import { Image } from 'react-bootstrap'
import { strRandom } from '../../../utils/funcs'
import InputFile from './components/InputFile'
import './PhotoPart.css'
const PhotoPart = ({ state, register, errors, update, setFile, file }) => {
	return (
		<>
			<Box className="my-3">
				<label
					htmlFor="photo"
					className={`d-flex justify-content-around${
						errors.photo ? ' is-invalid' : ''
					}`}
				>
					<InputFile
						register={register}
						state={state}
						update={update}
						setFile={setFile}
						file={file}
					/>
				</label>
				{errors?.photo && (
					<span className="invalid-feedback fw-bold text-center">
						{errors.photo.message}
					</span>
				)}
			</Box>
			{state && (
				<Box className="d-flex flex-column align-items-center mb-3">
					<span>Avatar actuel:</span>
					<Image
						style={{ borderRadius: '10px', width: '30%' }}
						fluid
						src={
							window.electron.url +
							'/avatar/' +
							state.id +
							'.jpg'
						}
						onError={({ currentTarget }) => {
							currentTarget.onerror = null // prevents looping
							currentTarget.src = require('../../../assets/images/blank_profile.png')
						}}
					/>
				</Box>
			)}
		</>
	)
}

export default PhotoPart
