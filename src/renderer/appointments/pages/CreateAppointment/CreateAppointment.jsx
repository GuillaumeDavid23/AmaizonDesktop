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
import {
	createAppointment,
	getAppointment,
	getAgentAvailabilities,
	updateAppointment,
	getOneProperty,
	getClient
} from '../../../services'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { catchError } from '../../../../utils/funcs'
import { useSlideSnack } from '../../../hooks'
import moment from 'moment'
import 'moment/locale/fr.js'
moment.locale('fr')

const CreateAppointment = () => {
	// Récupération du token:
	const token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_AMAIZON'))

	// Gestion de la snack Params:
	const [snackParams, setSnackParams] = useState({
		message: '',
		severity: 'error'
	})
	const { handleOpen, renderSnack } = useSlideSnack({
		message: snackParams.message,
		time: 2000,
		severity: snackParams.severity
	})
	useEffect(() => {
		if (snackParams.message) {
			handleOpen()
		}
	}, [snackParams])

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
	})

	// Gestion de l'update:
	const getValuesForUpdate = async () => {
		try {
			let response1 = await getAppointment(state.id, token)
			let { dateBegin, id_buyer, id_property, address, id_agent } =
				response1.appointment

			let response2 = await getClient(id_buyer, token),
				response3 = await getOneProperty(token, id_property)

			let { lastname } = response2.data,
				{ title } = response3.property

			return {
				dateBegin,
				address,
				id_agent,
				buyer: {
					id: id_buyer,
					lastname
				},
				property: {
					id: id_property,
					title
				}
			}
		} catch (error) {
			setSnackParams(await catchError(error))
		}
	}

	let { state } = useLocation()
	const [appointment, setAppointment] = useState()
	const [showAddressInput, setShowAddressInput] = useState(false)
	useEffect(() => {
		if (state) {
			getValuesForUpdate()
				.then(async (res) => {
					console.log(res)
					// Client:
					document.querySelector('#clientSearch').value =
						res.buyer.lastname
					document.querySelector('#clientSearchBtn').click()

					// Agent:
					let agentSearch = document.querySelector('#agentSearch')
					agentSearch.value = res.id_agent
					agentSearch.dispatchEvent(
						new Event('change', { bubbles: true })
					)

					// Property:
					document.querySelector('#propertySearch').value =
						res.property.title
					document.querySelector('#propertySearchBtn').click()

					// Address:
					if (res.address !== 'En agence') {
						setValue('address', res.address)
						setShowAddressInput(true)
					}

					// Date:
					let dateBegin = moment(res.dateBegin).format()
					setValue('day', dateBegin.substring(8, 10))
					setValue('month', dateBegin.substring(5, 7))
					setValue('year', dateBegin.substring(0, 4))
					setValue('hour', dateBegin.substring(11, 13))
					setValue('minute', dateBegin.substring(14, 16))

					setAppointment(res)
				})
				.catch(async (err) => {
					setSnackParams(await catchError(err))
					// navigate('/appointments', {
					// 	state: {
					// 		snackParams: await catchError(err)
					// 	}
					// })
				})
		}
	}, [])

	// Trigger utile pour l'update:
	useEffect(() => {
		if (state && appointment) {
			setTimeout(() => {
				document.querySelector('#buyer-' + appointment.buyer.id).click()
				document
					.querySelector('#property-' + appointment.property.id)
					.click()
				getAgentSchedule()
			}, 500)
		}
	}, [appointment])

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
					setSchedule(res.Availabilities)
				})
				.catch(async (err) => {
					setSnackParams(await catchError(err))
				})
		}
	}

	const onSubmit = async (data) => {
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

		// Création du body:
		let body = {
			dateBegin,
			dateEnd,
			address: data.address ? data.address : 'En agence',
			outdoor: data.address ? true : false,
			id_buyer: data.client,
			id_agent: data.agent,
			id_property: data.property,
			fromDesktop: true
		}

		try {
			// Exécution:
			let response = !state
				? await createAppointment(token, body)
				: await updateAppointment(state.id, token, body)

			// Redirection
			navigate('/appointments', {
				state: {
					snackParams: {
						message: response.message,
						severity: 'success'
					}
				}
			})
		} catch (error) {
			setSnackParams(await catchError(error))
		}
	}

	return (
		<>
			<Box>
				<Title
					text={`${!state ? 'Créer' : 'Modifier'} un rendez-vous`}
				/>
				<Box className="d-flex justify-content-center mt-3">
					<form
						id="appointmentForm"
						onSubmit={handleSubmit(onSubmit)}
					>
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
								schedule={schedule}
								setSnackParams={setSnackParams}
								getAgentSchedule={getAgentSchedule}
								setValue={setValue}
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
								errors={errors}
								setValue={setValue}
								getAgentSchedule={getAgentSchedule}
							/>
							<AddressPart
								register={register}
								errors={errors}
								setValue={setValue}
								showAddressInput={showAddressInput}
								setShowAddressInput={setShowAddressInput}
							/>
						</Box>
						<Box className="d-flex justify-content-center mt-4">
							<BtnGeneral
								onClick={() => navigate('/appointments')}
								text="Retour"
								className="me-2"
							/>
							<BtnGeneral
								text={`${
									!state ? 'Créer' : 'Modifier'
								} le rendez-vous`}
								className="w-auto ms-2"
							/>
						</Box>
					</form>
				</Box>
			</Box>
			{renderSnack}
		</>
	)
}

export default CreateAppointment
