import { Box } from '@mui/material'
import { REGID } from '../../../../../utils/regex'

const DateTimePart = ({ register, setValue, getAgentSchedule, errors }) => {
	return (
		<Box className="mt-3">
			<Box className="mb-2">
				<span className="fw-bold me-3">Date</span>
				<input
					type="number"
					className={`dateTimeAppointmentInput text-center${
						errors.day ? ' is-invalid' : ''
					}`}
					{...register('day', {
						required: 'Vous devez indiquer le jour..',
						pattern: {
							value: REGID.value,
							message: REGID.message
						}
					})}
					onChange={(e) => {
						setValue('day', e.target.value)
						getAgentSchedule()
					}}
				/>
				{errors?.day && (
					<span className="invalid-feedback fw-bold text-center">
						{errors.day.message}
					</span>
				)}
				<span className="mx-2">/</span>
				<input
					type="number"
					className={`dateTimeAppointmentInput text-center${
						errors.month ? ' is-invalid' : ''
					}`}
					{...register('month', {
						required: 'Vous devez indiquer le mois..',
						pattern: {
							value: REGID.value,
							message: REGID.message
						}
					})}
					onChange={(e) => {
						setValue('month', e.target.value)
						getAgentSchedule()
					}}
				/>
				{errors?.month && (
					<span className="invalid-feedback fw-bold text-center">
						{errors.month.message}
					</span>
				)}
				<span className="mx-2">/</span>
				<input
					type="number"
					className={`dateTimeAppointmentInput text-center${
						errors.year ? ' is-invalid' : ''
					}`}
					style={{ width: '70px' }}
					{...register('year', {
						required: "Vous devez indiquer l'année..",
						pattern: {
							value: REGID.value,
							message: REGID.message
						}
					})}
					onChange={(e) => {
						setValue('year', e.target.value)
						getAgentSchedule()
					}}
				/>
				{errors?.year && (
					<span className="invalid-feedback fw-bold text-center">
						{errors.year.message}
					</span>
				)}
			</Box>
			<Box>
				<span className="fw-bold me-3">Créneaux</span>
				<input
					type="number"
					className={`dateTimeAppointmentInput text-center${
						errors.hour ? ' is-invalid' : ''
					}`}
					{...register('hour', {
						required: "Vous devez indiquer l'heure..",
						pattern: {
							value: REGID.value,
							message: REGID.message
						}
					})}
				/>
				{errors?.hour && (
					<span className="invalid-feedback fw-bold text-center">
						{errors.hour.message}
					</span>
				)}
				<span className="mx-2">:</span>
				<input
					type="number"
					className={`dateTimeAppointmentInput text-center${
						errors.minute ? ' is-invalid' : ''
					}`}
					{...register('minute', {
						required: 'Vous devez indiquer les minutes..',
						pattern: {
							value: REGID.value,
							message: REGID.message
						}
					})}
				/>
				{errors?.minute && (
					<span className="invalid-feedback fw-bold text-center">
						{errors.minute.message}
					</span>
				)}
			</Box>
		</Box>
	)
}

export default DateTimePart
