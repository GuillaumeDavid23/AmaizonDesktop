import { Box, OutlinedInput } from '@mui/material'
import { Col, Row } from 'react-bootstrap'
import { Controller } from 'react-hook-form'
import { REGSTRING, REGEMAIL } from '../../../../../utils/regex'
import PhotoPart from '../../../../globalComponents/PhotoPart/PhotoPart'
import {
	EmailPart,
	FirstnamePart,
	LastnamePart,
	PasswordPart,
	PhoneProPart,
	ValidationButton
} from './components'

const Form = ({ state, handleSubmit, onSubmit, control, register, errors, setFile, file }) => {
	return (
		<form className="form w-50 px-5" onSubmit={handleSubmit(onSubmit)}>
			<Row>
				<Col>
					{/* Lastname Form part */}
					<LastnamePart control={control} errors={errors} />

					{/* Firstname Form part */}
					<FirstnamePart control={control} errors={errors} />
				</Col>
				<Col>
					{/* Email Form part */}
					<EmailPart control={control} errors={errors} />

					{/* PhonePro Form part */}
					<PhoneProPart control={control} errors={errors} />
				</Col>
			</Row>
			{/* Password Form part */}
			<PasswordPart state={state} control={control} errors={errors} />
			
			{/* Photo Form part */}
			<PhotoPart
				state={state}
				register={register}
				errors={errors}
				update={state ? true : false}
				setFile={setFile}
				file={file}
			/>

			<ValidationButton state={state} />
		</form>
	)
}

export default Form
