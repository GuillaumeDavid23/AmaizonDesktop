import { Box } from '@mui/material'
import FormNavigation from './FormNavigation'
import { Controller } from 'react-hook-form'
import { REGNUM, REGSTRING } from '../../../utils/regex'
import OutlinedInput from '@mui/material/OutlinedInput'

const Page3 = ({ visiblePage, control, errors, handleNavigation }) => {
	return (
		<Box className={`form-part ${visiblePage !== 3 ? 'd-none' : ''}`}>
			<h1>Etape 3 - Infos Principales 2:</h1>

			{/* Surface Form part */}
			<Box className="my-3">
				<Controller
					name="surface"
					control={control}
					rules={{
						required: 'Surface requise.',
						pattern: {
							value: REGNUM.value,
							message: REGNUM.message
						}
					}}
					render={({ field }) => (
						<OutlinedInput
							className={`ps-2 form-control ${
								errors.surface ? 'is-invalid' : ''
							}`}
							variant="filled"
							placeholder="Surface"
							{...field}
						/>
					)}
				/>
				{errors?.surface && (
					<span className="invalid-feedback fw-bold text-center">
						{errors.surface.message}
					</span>
				)}
			</Box>

			{/* RoomNumber Form part */}
			<Box className="my-3">
				<Controller
					name="roomNumber"
					control={control}
					rules={{
						required: 'Nombre de chambres requis.',
						pattern: {
							value: REGNUM.value,
							message: REGNUM.message
						}
					}}
					render={({ field }) => (
						<OutlinedInput
							className={`ps-2 form-control ${
								errors.roomNumber ? 'is-invalid' : ''
							}`}
							variant="filled"
							placeholder="Nombre de chambres"
							{...field}
						/>
					)}
				/>
				{errors?.roomNumber && (
					<span className="invalid-feedback fw-bold text-center">
						{errors.roomNumber.message}
					</span>
				)}
			</Box>

			{/* ElectricMeterRef Form part */}
			<Box className="my-3">
				<Controller
					name="electricMeterRef"
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
								errors.electricMeterRef ? 'is-invalid' : ''
							}`}
							variant="filled"
							placeholder="Référence compteur électrique"
							{...field}
						/>
					)}
				/>
				{errors?.electricMeterRef && (
					<span className="invalid-feedback fw-bold text-center">
						{errors.electricMeterRef.message}
					</span>
				)}
			</Box>

			{/* GasMeterRef Form part */}
			<Box className="my-3">
				<Controller
					name="gasMeterRef"
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
								errors.gasMeterRef ? 'is-invalid' : ''
							}`}
							variant="filled"
							placeholder="Référence compteur de gaz"
							{...field}
						/>
					)}
				/>
				{errors?.gasMeterRef && (
					<span className="invalid-feedback fw-bold text-center">
						{errors.gasMeterRef.message}
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

export default Page3
