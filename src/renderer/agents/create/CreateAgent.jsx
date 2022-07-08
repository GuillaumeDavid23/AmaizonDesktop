import { useState, useEffect } from 'react'
import { useSlideSnack } from '../../hooks'
import { AnimatedPage } from '../../globalComponents'
import { Box } from '@mui/material'
import { Title } from '../../globalComponents'
import './CreateAgent.css'
import { OutlinedInput } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { REGSTRING, REGEMAIL, REGPASSWORD, REGTEL } from '../../../utils/regex'
import BtnGeneral from '../../globalComponents/BtnGeneral/BtnGeneral'
import {
	createAgent as addAgent,
	pushAgentAvatar,
	getAgent,
	updateAgent
} from '../../services/Agent'
import { useNavigate, useLocation } from 'react-router-dom'

const CreateAgent = () => {
	// Déclaration navigation:
	const navigate = useNavigate()

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

	// Récupération du token:
	const token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_AMAIZON'))

	// Destructuring HookForm hook
	const {
		register,
		control,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm({
		mode: 'onChange',
		shouldFocusError: true,
		defaultValues: {
			lastname: 'Mancheron',
			firstname: 'Vincent',
			email: 'vmancheron@yahoo.fr',
			password: 'Ve7smdpm6',
			phonePro: '0642505142'
		}
	})

	// Gestion de l'update:
	let { state } = useLocation()
	useEffect(() => {
		if (state) {
			getAgent(state.id, token)
				.then((res) => {
					let { lastname, firstname, email, agent } = res.data
					setValue('lastname', lastname)
					setValue('firstname', firstname)
					setValue('email', email)
					setValue('phonePro', agent.phonePro)
				})
				.catch((error) => {
					console.log(error)
					setSnackParams({ message: 'Erreur', severity: 'error' })
				})
		}
	}, [])

	const onSubmit = async (data) => {
		// Séparation de la photo pour le 2ème appel:
		let photo = data.photo[0]
		delete data.photo

		// Constitution des datas Agent:
		data.roles = 'agent'
		data.agent = { phonePro: data.phonePro }
		delete data.phonePro

		try {
			// Création/Modification de l'agent:
			let response = !state
				? await addAgent(token, data)
				: await updateAgent(state.id, token, data)

			if (response) {
				// Push de la photo:
				let photoBody = new FormData()
				photoBody.append('_id', !state ? response.user._id : state.id)
				photoBody.append('photo', photo)
				await pushAgentAvatar(token, photoBody)

				// Redirection:
				navigate('/agents', {
					state: {
						snackParams: {
							message: `Agent ${!state ? 'crée' : 'modifié'} !`,
							severity: 'success'
						}
					}
				})
			} else {
				setSnackParams({ message: 'Erreur', severity: 'error' })
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<AnimatedPage className="h-100">
			<Title text="Créer un Agent" />
			<Box className="d-flex justify-content-center align-items-center h-75">
				<form
					className="form w-50 px-5"
					onSubmit={handleSubmit(onSubmit)}
				>
					{/* Lastname Form part */}
					<Box className="my-3">
						<Controller
							name="lastname"
							control={control}
							rules={{
								required: 'Nom de famille requis.',
								pattern: {
									value: REGSTRING.value,
									message: REGSTRING.message
								}
							}}
							render={({ field }) => (
								<OutlinedInput
									className={`ps-2 form-control ${
										errors.lastname ? 'is-invalid' : ''
									}`}
									variant="filled"
									placeholder="Nom de famille"
									{...field}
								/>
							)}
						/>
						{errors?.lastname && (
							<span className="invalid-feedback fw-bold text-center">
								{errors.lastname.message}
							</span>
						)}
					</Box>

					{/* Firstname Form part */}
					<Box className="my-3">
						<Controller
							name="firstname"
							control={control}
							rules={{
								required: 'Prénom requis.',
								pattern: {
									value: REGSTRING.value,
									message: REGSTRING.message
								}
							}}
							render={({ field }) => (
								<OutlinedInput
									className={`ps-2 form-control ${
										errors.firstname ? 'is-invalid' : ''
									}`}
									variant="filled"
									placeholder="Prénom"
									{...field}
								/>
							)}
						/>
						{errors?.firstname && (
							<span className="invalid-feedback fw-bold text-center">
								{errors.firstname.message}
							</span>
						)}
					</Box>

					{/* Email Form part */}
					<Box className="my-3">
						<Controller
							name="email"
							control={control}
							rules={{
								required: 'Email requis.',
								pattern: {
									value: REGEMAIL.value,
									message: REGEMAIL.message
								}
							}}
							render={({ field }) => (
								<OutlinedInput
									className={`ps-2 form-control ${
										errors.email ? 'is-invalid' : ''
									}`}
									variant="filled"
									placeholder="Email"
									{...field}
								/>
							)}
						/>
						{errors?.email && (
							<span className="invalid-feedback fw-bold text-center">
								{errors.email.message}
							</span>
						)}
					</Box>

					{/* Password Form part */}
					{!state && (
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
					)}

					{/* PhonePro Form part */}
					<Box className="my-3">
						<Controller
							name="phonePro"
							control={control}
							rules={{
								required: 'Téléphone professionnel requis.',
								pattern: {
									value: REGTEL.value,
									message: REGTEL.message
								}
							}}
							render={({ field }) => (
								<OutlinedInput
									className={`ps-2 form-control ${
										errors.phonePro ? 'is-invalid' : ''
									}`}
									variant="filled"
									placeholder="Téléphone pro."
									{...field}
								/>
							)}
						/>
						{errors?.phonePro && (
							<span className="invalid-feedback fw-bold text-center">
								{errors.phonePro.message}
							</span>
						)}
					</Box>

					{/* Photo Form part */}
					<Box className="my-3">
						<label
							htmlFor="photo"
							className={`d-flex justify-content-around${
								errors.photo ? ' is-invalid' : ''
							}`}
						>
							<span>Photo de l'agent:</span>
							<input
								id="photo"
								type="file"
								{...register('photo', {
									required: 'Vous devez ajouter une photo.'
								})}
							/>
						</label>
						{errors?.photo && (
							<span className="invalid-feedback fw-bold text-center">
								{errors.photo.message}
							</span>
						)}
					</Box>

					{state && (
						<Box className="d-flex justify-content-around mb-3">
							<span>Photo actuelle:</span>
							<img
								className="w-25"
								src={`${window.electron.url}/avatar/${state.id}.png`}
								alt="Avatar"
							/>
						</Box>
					)}

					<Box className="d-flex justify-content-center my-3">
						<BtnGeneral
							text={!state ? "Créer l'agent" : "Modifier l'agent"}
						/>
					</Box>
				</form>
			</Box>
			{/* Snackbar */}
			{renderSnack}
		</AnimatedPage>
	)
}

export default CreateAgent
