import { Box, OutlinedInput } from '@mui/material'
import { Controller } from 'react-hook-form'
import { REGSTRING } from '../../../../../../utils/regex'

const FirstnamePart = ({ control, errors }) => {
	return (
		<Box className="my-3">
			<Controller
				name="firstname"
				control={control}
				rules={{
					required: 'Prénom requis.',
					pattern: {
						value: REGSTRING.value,
						message: REGSTRING.message
					}
				}}
				render={({ field }) => (
					<OutlinedInput
						className={`ps-2 form-control ${
							errors.firstname ? 'is-invalid' : ''
						}`}
						variant="filled"
						placeholder="Prénom"
						{...field}
					/>
				)}
			/>
			{errors?.firstname && (
				<span className="invalid-feedback fw-bold text-center">
					{errors.firstname.message}
				</span>
			)}
		</Box>
	)
}

export default FirstnamePart
