import React from 'react'

import Box from '@mui/material/Box'
import { useForm, Controller } from 'react-hook-form'
import { OutlinedInput, TextField } from '@mui/material'
import { Col, Row } from 'react-bootstrap'
const AddForm = () => {
	// Destructuring Hook Form
	const {
		handleSubmit,
		control,
		formState: { errors, isValid }
	} = useForm({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		shouldFocusError: true
	})
	return (
		<Box component="form">
			<Row>
				{/* Email input */}
				<Col
					xs="10"
					lg="6"
					className="d-flex justify-content-center align-items-center flex-column"
				>
					<Controller
						name={'lastname'}
						control={control}
						render={({ field }) => (
							<TextField
								variant="outlined"
								required
								label="Nom de famille"
								className={
									!errors.email
										? 'form-control'
										: 'form-control is-invalid'
								}
								{...field}
								value={field.value || ''}
							/>
						)}
						rules={{
							required: 'Vous devez indiquer votre email.',
						}}
					/>
					{errors?.lastname && (
						<span className="invalid-feedback fw-bold text-center">
							{errors.email.message}
						</span>
					)}
				</Col>
			</Row>
		</Box>
	)
}

export default AddForm
