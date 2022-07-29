import { Box } from '@mui/material'

const DateTimePart = ({ register, setValue, getAgentSchedule }) => {
	return (
		<Box className="mt-3">
			<Box className="mb-2">
				<span className="fw-bold me-3">Date</span>
				<input
					type="number"
					className="dateTimeAppointmentInput text-center"
					{...register('day')}
					onChange={(e) => {
						setValue('day', e.target.value)
						getAgentSchedule()
					}}
				/>
				<span className="mx-2">/</span>
				<input
					type="number"
					className="dateTimeAppointmentInput text-center"
					{...register('month')}
					onChange={(e) => {
						setValue('month', e.target.value)
						getAgentSchedule()
					}}
				/>
				<span className="mx-2">/</span>
				<input
					type="number"
					className="dateTimeAppointmentInput text-center"
					{...register('year')}
					onChange={(e) => {
						setValue('year', e.target.value)
						getAgentSchedule()
					}}
				/>
			</Box>
			<Box>
				<span className="fw-bold me-3">Créneaux</span>
				<input
					type="number"
					className="dateTimeAppointmentInput text-center"
					{...register('hour')}
				/>
				<span className="mx-2">:</span>
				<input
					type="number"
					className="dateTimeAppointmentInput text-center"
					{...register('minute')}
				/>
			</Box>
		</Box>
	)
}

export default DateTimePart
