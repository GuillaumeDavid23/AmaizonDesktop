import { Controller } from 'react-hook-form'
import { REGPASSWORD } from '../../../../../../utils/regex'
import { Box, OutlinedInput } from '@mui/material'

const PasswordPart = ({ state, control, errors }) => {
	if (state) {
		return false
	} else {
		return (
			<Box className="my-3">
				<Controller
					name="password"
					control={control}
					rules={{
						required: 'Mot de passe requis.',
						pattern: {
							value: REGPASSWORD.value,
							message: REGPASSWORD.message
						}
					}}
					render={({ field }) => (
						<OutlinedInput
							className={`ps-2 form-control ${
								errors.password ? 'is-invalid' : ''
							}`}
							variant="filled"
							placeholder="Mot de passe"
							{...field}
						/>
					)}
				/>
				{errors?.password && (
					<span className="invalid-feedback fw-bold text-center">
						{errors.password.message}
					</span>
				)}
			</Box>
		)
	}
}

export default PasswordPart
