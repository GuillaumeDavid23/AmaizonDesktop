import { Box, OutlinedInput } from '@mui/material'
import { Controller } from 'react-hook-form'
import { REGTEL } from '../../../../../../utils/regex'

const PhoneProPart = ({ control, errors }) => {
	return (
		<Box className="my-3">
			<Controller
				name="phonePro"
				control={control}
				rules={{
					required: 'Téléphone professionnel requis.',
					pattern: {
						value: REGTEL.value,
						message: REGTEL.message
					}
				}}
				render={({ field }) => (
					<OutlinedInput
						className={`ps-2 form-control ${
							errors.phonePro ? 'is-invalid' : ''
						}`}
						variant="filled"
						placeholder="Téléphone pro."
						{...field}
					/>
				)}
			/>
			{errors?.phonePro && (
				<span className="invalid-feedback fw-bold text-center">
					{errors.phonePro.message}
				</span>
			)}
		</Box>
	)
}

export default PhoneProPart
