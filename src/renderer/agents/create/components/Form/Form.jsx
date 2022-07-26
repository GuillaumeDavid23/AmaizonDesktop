import { Box, OutlinedInput } from '@mui/material'
import { Controller } from 'react-hook-form'
import { REGSTRING, REGEMAIL } from '../../../../../utils/regex'
import {
	EmailPart,
	FirstnamePart,
	LastnamePart,
	PasswordPart,
	PhoneProPart,
	PhotoPart,
	ValidationButton
} from './components'

const Form = ({ state, handleSubmit, onSubmit, control, register, errors }) => {
	return (
		<form className="form w-50 px-5" onSubmit={handleSubmit(onSubmit)}>
			{/* Lastname Form part */}
			<LastnamePart control={control} errors={errors} />

			{/* Firstname Form part */}
			<FirstnamePart control={control} errors={errors} />

			{/* Email Form part */}
			<EmailPart control={control} errors={errors} />

			{/* Password Form part */}
			<PasswordPart state={state} control={control} errors={errors} />

			{/* PhonePro Form part */}
			<PhoneProPart control={control} errors={errors} />

			{/* Photo Form part */}
			<PhotoPart state={state} register={register} errors={errors} />

			<ValidationButton state={state} />
		</form>
	)
}

export default Form
