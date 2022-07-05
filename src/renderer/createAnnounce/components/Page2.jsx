import { Box } from '@mui/material'
import FormNavigation from './FormNavigation'
import OutlinedInput from '@mui/material/OutlinedInput'
import { Controller } from 'react-hook-form'
import { REGSTRING, REGID } from '../../../utils/regex'

const Page2 = ({ visiblePage, control, errors, handleNavigation }) => {
	return (
		<Box className={`form-part ${visiblePage !== 2 ? 'd-none' : ''}`}>
			<h1>Etape 2 - Infos Géographiques:</h1>

			{/* Location Form part */}
			<Controller
				name="location"
				control={control}
				rules={{
					required: {
						value: true,
						message: 'Numéro et nom requis.'
					},
					pattern: {
						value: REGSTRING.value,
						message: REGSTRING.message
					}
				}}
				render={({ field }) => (
					<OutlinedInput
						className={`ps-2 my-3 form-control ${
							errors.location ? 'is-invalid' : ''
						}`}
						variant="filled"
						placeholder="Numéro et nom de rue"
						{...field}
					/>
				)}
			/>
			{errors?.location && (
				<span className="invalid-feedback fw-bold text-center">
					{errors.location.message}
				</span>
			)}

			{/* PostalCode Form part */}
			<Controller
				name="postalCode"
				control={control}
				rules={{
					required: {
						value: true,
						message: 'Code postal requis.'
					},
					pattern: {
						value: REGID.value,
						message: REGID.message
					}
				}}
				render={({ field }) => (
					<OutlinedInput
						type="number"
						className={`ps-2 my-3 form-control ${
							errors.postalCode ? 'is-invalid' : ''
						}`}
						variant="filled"
						placeholder="Code postal"
						{...field}
					/>
				)}
			/>
			{errors?.postalCode && (
				<span className="invalid-feedback fw-bold text-center">
					{errors.postalCode.message}
				</span>
			)}

			{/* City Form part */}
			<Controller
				name="city"
				control={control}
				rules={{
					required: {
						value: true,
						message: 'Ville requise.'
					},
					pattern: {
						value: REGSTRING.value,
						message: REGSTRING.message
					}
				}}
				render={({ field }) => (
					<OutlinedInput
						className={`ps-2 my-3 form-control ${
							errors.city ? 'is-invalid' : ''
						}`}
						variant="filled"
						placeholder="Ville"
						{...field}
					/>
				)}
			/>
			{errors?.city && (
				<span className="invalid-feedback fw-bold text-center">
					{errors.city.message}
				</span>
			)}

			{/* Country Form part */}
			<Controller
				control={control}
				rules={{
					required: {
						value: true,
						message: 'Pays requis.'
					},
					pattern: {
						value: REGSTRING.value,
						message: REGSTRING.message
					}
				}}
				render={({ field }) => (
					<OutlinedInput
						className={`ps-2 my-3 form-control ${
							errors.country ? 'is-invalid' : ''
						}`}
						variant="filled"
						placeholder="Pays"
						{...field}
					/>
				)}
				name="country"
			/>
			{errors?.country && (
				<span className="invalid-feedback fw-bold text-center">
					{errors.country.message}
				</span>
			)}

			<FormNavigation
				visiblePage={visiblePage}
				handleNavigation={handleNavigation}
			/>
		</Box>
	)
}

export default Page2
