import { Box } from '@mui/material'

const DateTimePart = ({ register }) => {
	return (
		<Box className="mt-3">
			<Box className="mb-2">
				<span className="fw-bold me-3">Date</span>
				<input
					type="number"
					className="dateTimeAppointmentInput text-center"
					{...register('day')}
				/>
				<span className="mx-2">/</span>
				<input
					type="number"
					className="dateTimeAppointmentInput text-center"
					{...register('month')}
				/>
				<span className="mx-2">/</span>
				<input
					type="number"
					className="dateTimeAppointmentInput text-center"
					{...register('year')}
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
