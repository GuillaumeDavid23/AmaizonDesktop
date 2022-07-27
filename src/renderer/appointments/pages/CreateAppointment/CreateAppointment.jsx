import React from 'react'
import { Box } from '@mui/material'
import { Title } from '../../../globalComponents'
import { AgentPart, ClientPart, DateTimePart, PropertyPart } from './components'
import { useForm } from 'react-hook-form'
import { BtnGeneral } from '../../../globalComponents'

const CreateAppointment = ({ state }) => {
	// Récupération du token:
	const token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_AMAIZON'))

	// Destructuring HookForm hook:
	const {
		register,
		control,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm({
		mode: 'onChange',
		shouldFocusError: true
		// defaultValues: {
		// 	title: '',
		// 	propertyType: '',
		// 	description: '',
		// 	location: '',
		// 	postalCode: '',
		// 	city: '',
		// 	country: '',
		// 	surface: '',
		// 	roomNumber: '',
		// 	electricMeterRef: '',
		// 	gasMeterRef: '',
		// 	transactionType: { value: '', label: '' },
		// 	amount: ''
		// }
		// defaultValues: {
		// 	title: 'Chouette Maison',
		// 	propertyType: { value: 1, label: 'Maison' },
		// 	location: "441 rue d'abbeville",
		// 	postalCode: '80000',
		// 	city: 'Amiens',
		// 	country: 'France',
		// 	surface: '250',
		// 	roomNumber: '5',
		// 	transactionType: { value: 1, label: 'Achat' },
		// 	amount: '200000'
		// }
	})

	const onSubmit = (data) => {
		alert(JSON.stringify(data))
	}

	return (
		<Box>
			<Title text={`${!state ? 'Créer' : 'Modifier'} un rendez-vous`} />
			<Box className="d-flex justify-content-center mt-3">
				<form id="appointmentForm" onSubmit={handleSubmit(onSubmit)}>
					<Box className="d-flex">
						<ClientPart
							token={token}
							register={register}
							errors={errors}
						/>
						<AgentPart />
						<PropertyPart />
					</Box>
					<Box className="d-flex flex-column align-items-center mt-3">
						<DateTimePart />
						<BtnGeneral
							text="Créer le rendez-vous"
							className="w-auto mt-4"
						/>
					</Box>
				</form>
			</Box>
		</Box>
	)
}

export default CreateAppointment
