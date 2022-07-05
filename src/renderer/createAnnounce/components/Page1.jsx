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
			<Controller
				name="title"
				control={control}
				rules={{
					required: {
						value: true,
						message: 'Intitulé de la propriété requis.'
					},
					pattern: {
						value: REGSTRING.value,
						message: REGSTRING.message
					}
				}}
				render={({ field }) => (
					<OutlinedInput
						className={`my-3 ps-2 form-control ${
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

			{/* PropertyType Form part */}
			<Controller
				name="propertyType"
				control={control}
				rules={{
					required: {
						value: true,
						message: 'Type de propriété requis.'
					},
					pattern: {
						value: REGSTRING.value,
						message: REGSTRING.message
					}
				}}
				render={({ field }) => (
					<Select
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

			{/* Description Form part */}
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
						className={`my-3 ps-2 form-control ${
							errors.description ? 'is-invalid' : ''
						}`}
						style={{ width: 300, height: 150 }}
						variant="filled"
						placeholder="Titre"
						{...field}
					/>
				)}
			/>
			{errors?.description && (
				<span className="invalid-feedback fw-bold text-center">
					{errors.description.message}
				</span>
			)}

			<FormNavigation
				visiblePage={visiblePage}
				handleNavigation={handleNavigation}
			/>
		</Box>
	)
}

export default Page1
