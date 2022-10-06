import { useState, useEffect } from 'react'
import { useSlideSnack } from '../../hooks'
import { AnimatedPage } from '../../globalComponents'
import { Box } from '@mui/material'
import { Title } from '../../globalComponents'
import './CreateAgent.css'
import { useForm } from 'react-hook-form'
import {
	createAgent as addAgent,
	pushAgentAvatar,
	getAgent,
	updateAgent
} from '../../services/Agent'
import { useNavigate, useLocation } from 'react-router-dom'
import { Form } from './components'

const CreateAgent = () => {
	// Déclaration navigation:
	const navigate = useNavigate()
	const [file, setFile] = useState({})

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
	// useEffect(() => {
	// 	if (snackParams.message) {
	// 		handleOpen()
	// 	}
	// }, [snackParams])

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
			<Title text={!state ? 'Créer un Agent' : 'Modifier un Agent'} />
			<Box className="d-flex justify-content-center align-items-center h-75">
				<Form
					state={state}
					handleSubmit={handleSubmit}
					onSubmit={onSubmit}
					control={control}
					register={register}
					errors={errors}
					setFile={setFile}
					file={file}
				/>
			</Box>
			{/* Snackbar */}
			{renderSnack}
		</AnimatedPage>
	)
}

export default CreateAgent
