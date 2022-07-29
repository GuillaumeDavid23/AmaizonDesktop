import { Box } from '@mui/material'
import { BtnGeneral, Title } from '../../../globalComponents'
import {
	AddressPart,
	AgentPart,
	ClientPart,
	DateTimePart,
	PropertyPart
} from './components'
import { useForm } from 'react-hook-form'
import { createAppointment, getAgentAvailabilities } from '../../../services'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const CreateAppointment = ({ state }) => {
	// Récupération du token:
	const token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_AMAIZON'))

	// Déclaration useNavigate:
	const navigate = useNavigate()

	// Destructuring HookForm hook:
	const {
		register,
		// control,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors }
	} = useForm({
		mode: 'onChange',
		shouldFocusError: true
		// defaultValues: {}
	})

	// Récupération de l'agenda de l'agent concerné pour checker si plage libre:
	const [schedule, setSchedule] = useState()
	const getAgentSchedule = () => {
		let { day, month, year, agent } = getValues()
		if (day === '' || month === '' || year === '' || agent === '') {
			setSchedule()
		} else {
			year = year.length === 2 ? '20' + year : year
			month = month.length === 2 ? month : '0' + month
			day = day.length === 2 ? day : '0' + day

			getAgentAvailabilities(token, {
				date: `${year}-${month}-${day}`,
				id_agent: agent
			})
				.then((res) => {
					console.log(res)
					setSchedule(res.Availabilities)
				})
				.catch((err) => {
					console.log(err)
				})
		}
	}

	const onSubmit = (data) => {
		// Reformattage préventif des datas date:
		data.year = data.year.length === 2 ? '20' + data.year : data.year
		data.month = data.month.length === 2 ? data.month : '0' + data.month
		data.day = data.day.length === 2 ? data.day : '0' + data.day
		data.hour = data.hour.length === 2 ? data.hour : '0' + data.hour
		data.minute = data.minute.length === 2 ? data.minute : '0' + data.minute
		let date = `${data.year}-${data.month}-${data.day}`,
			dateBegin = `${date} ${data.hour}:${data.minute}:00`,
			dateEnd = `${date} ${
				data.minute === '00'
					? `${data.hour}:30`
					: `${parseInt(data.hour) + 1}:00`
			}:00`

		// console.log({
		// 	dateBegin,
		// 	dateEnd,
		// 	address: data.address ?? null,
		// 	outdoor: data.address ? true : false,
		// 	id_buyer: data.client,
		// 	id_agent: data.agent,
		// 	id_property: data.property
		// })
		createAppointment(token, {
			dateBegin,
			dateEnd,
			address: data.address ?? 'En agence',
			outdoor: data.address ? true : false,
			id_buyer: data.client,
			id_agent: data.agent,
			id_property: data.property,
			fromDesktop: true
		})
			.then((res) => {
				navigate('/appointments', {
					state: {
						snackParams: {
							message: res.message,
							severity: 'success'
						}
					}
				})
			})
			.catch((err) => {
				console.log(err)
			})
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
							setValue={setValue}
						/>
						<AgentPart
							register={register}
							errors={errors}
							setValue={setValue}
							schedule={schedule}
							getAgentSchedule={getAgentSchedule}
						/>
						<PropertyPart
							register={register}
							errors={errors}
							setValue={setValue}
						/>
					</Box>
					<Box className="d-flex justify-content-around mt-3">
						<DateTimePart
							register={register}
							setValue={setValue}
							getAgentSchedule={getAgentSchedule}
						/>
						<AddressPart register={register} />
					</Box>
					<Box className="d-flex justify-content-center">
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
