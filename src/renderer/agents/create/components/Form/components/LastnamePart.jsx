import { Box, OutlinedInput } from '@mui/material'
import { Controller } from 'react-hook-form'
import { REGSTRING } from '../../../../../../utils/regex'

const LastnamePart = ({ control, errors }) => {
	return (
		<Box className="my-3">
			<Controller
				name="lastname"
				control={control}
				rules={{
					required: 'Nom de famille requis.',
					pattern: {
						value: REGSTRING.value,
						message: REGSTRING.message
					}
				}}
				render={({ field }) => (
					<OutlinedInput
						className={`ps-2 form-control ${
							errors.lastname ? 'is-invalid' : ''
						}`}
						variant="filled"
						placeholder="Nom de famille"
						{...field}
					/>
				)}
			/>
			{errors?.lastname && (
				<span className="invalid-feedback fw-bold text-center">
					{errors.lastname.message}
				</span>
			)}
		</Box>
	)
}

export default LastnamePart
