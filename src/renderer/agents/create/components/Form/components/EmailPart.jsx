import { Box, OutlinedInput } from '@mui/material'
import { Controller } from 'react-hook-form'
import { REGEMAIL } from '../../../../../../utils/regex'

const EmailPart = ({ control, errors }) => {
	return (
		<Box className="my-3">
			<Controller
				name="email"
				control={control}
				rules={{
					required: 'Email requis.',
					pattern: {
						value: REGEMAIL.value,
						message: REGEMAIL.message
					}
				}}
				render={({ field }) => (
					<OutlinedInput
						className={`ps-2 form-control ${
							errors.email ? 'is-invalid' : ''
						}`}
						variant="filled"
						placeholder="Email"
						{...field}
					/>
				)}
			/>
			{errors?.email && (
				<span className="invalid-feedback fw-bold text-center">
					{errors.email.message}
				</span>
			)}
		</Box>
	)
}

export default EmailPart
