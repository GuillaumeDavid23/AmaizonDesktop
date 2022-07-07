import { Box } from '@mui/material'
import FormNavigation from './FormNavigation'
import { Controller } from 'react-hook-form'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select from 'react-select'
import { REGSTRING } from '../../../utils/regex'

const Page1 = ({ visiblePage, control, errors, handleNavigation }) => {
	// Déclaration options selects propertyType:
	const propertyTypes = [
		{ value: 1, label: 'Maison' },
		{ value: 2, label: 'Appartement' }
	]

	return (
		<Box className={`form-part ${visiblePage !== 1 ? 'd-none' : ''}`}>
			<h1>Etape 1 - Infos principales:</h1>

			{/* Title Form part */}
			<Box className="my-3">
				<Controller
					name="title"
					control={control}
					rules={{
						required: 'Intitulé de la propriété requis.',
						pattern: {
							value: REGSTRING.value,
							message: REGSTRING.message
						}
					}}
					render={({ field }) => (
						<OutlinedInput
							className={`ps-2 form-control ${
								errors.title ? 'is-invalid' : ''
							}`}
							variant="filled"
							placeholder="Titre"
							{...field}
						/>
					)}
				/>
				{errors?.title && (
					<span className="invalid-feedback fw-bold text-center">
						{errors.title.message}
					</span>
				)}
			</Box>

			{/* PropertyType Form part */}
			<Box className="my-3">
				<Controller
					name="propertyType"
					control={control}
					rules={{
						required: 'Type de propriété requis.',
						pattern: {
							value: REGSTRING.value,
							message: REGSTRING.message
						}
					}}
					render={({ field }) => (
						<Select
							className={errors.propertyType ? 'is-invalid' : ''}
							options={propertyTypes}
							placeholder={'Type de propriété'}
							{...field}
						/>
					)}
				/>
				{errors?.propertyType && (
					<span className="invalid-feedback fw-bold text-center">
						{errors.propertyType.message}
					</span>
				)}
			</Box>

			{/* Description Form part */}
			<Box className="my-3">
				<Controller
					name="description"
					control={control}
					rules={{
						pattern: {
							value: REGSTRING.value,
							message: REGSTRING.message
						}
					}}
					render={({ field }) => (
						<OutlinedInput
							className={`ps-2 form-control ${
								errors.description ? 'is-invalid' : ''
							}`}
							style={{ width: '100%', height: 150 }}
							variant="filled"
							placeholder="Description"
							{...field}
						/>
					)}
				/>
				{errors?.description && (
					<span className="invalid-feedback fw-bold text-center">
						{errors.description.message}
					</span>
				)}
			</Box>

			<FormNavigation
				visiblePage={visiblePage}
				handleNavigation={handleNavigation}
			/>
		</Box>
	)
}

export default Page1
