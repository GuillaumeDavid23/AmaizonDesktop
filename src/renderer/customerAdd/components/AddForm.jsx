import React from 'react'

import Box from '@mui/material/Box'
import { useForm, Controller } from 'react-hook-form'
import { TextField } from '@mui/material'
import { Col, Row } from 'react-bootstrap'
import BtnGeneral from '../../globalComponents/BtnGeneral/BtnGeneral'
import { createClient, getClient, pushUserAvatar, updateClient } from '../../services/Client'
import { useSlideSnack } from '../../hooks'
import PhotoPart from '../../globalComponents/PhotoPart/PhotoPart'
import {
	useLocation,
	useNavigate,
	useSearchParams
} from 'react-router-dom'

import { useAuth } from '../../hooks'

const AddForm = () => {
	const { authToken } = useAuth()

	const [searchParams, setSearchParams] = useSearchParams()
	const [user, setUser] = React.useState({})
	const userID = searchParams.get('id')
	const [messageSnack, setMessageSnack] = React.useState('Rien')
	const [severity, setSeverity] = React.useState('success')
	const [file, setFile] = React.useState({})
	
	React.useEffect(() => {
		if(userID){
			getClient(userID, authToken)
				.then((res) => {
					if (res) {
						setUser(res.data)
						setValue('lastname', res.data.lastname)
						setValue('firstname', res.data.firstname)
						setValue('email', res.data.email)
						setValue('phone', res.data.phone)
					}
				})
				.catch((error) => {
					console.log(error)
				})
		}
	}, [authToken, userID])

	const shuffle = function (chain) {
		var a = chain.split(''),
			n = a.length

		for (var i = n - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1))
			var tmp = a[i]
			a[i] = a[j]
			a[j] = tmp
		}
		let shuffled = a.join('')
		shuffled = shuffled.slice(0, 12)
		return shuffled
	}
	let mdp = shuffle(
		'AZERTYUIOPQSDFGHJKLMWXCVBNazertyuiopqsdfghjklmwxcvbn0123456789!$&@#?'
	)
	const navigate = useNavigate()

	// Destructuring Hook Form
	const {
		register,
		handleSubmit,
		control,
		setValue,
		formState: { errors }
	} = useForm({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		shouldFocusError: true,
	})
	let { state } = useLocation()
	

	// Destructuring Snackbar from custom hook
	const { handleOpen, renderSnack } = useSlideSnack({
		message: messageSnack,
		time: 2000,
		severity: severity
	})

	const onSubmit = (data) => {
		// Séparation de la photo pour le 2ème appel:
		let photo = data.photo[0]
		delete data.photo
		if (userID) {
			data = { ...data,
			password: user.password}
			let photoBody = new FormData()
			photoBody.append('_id', !state ? user._id : state.id)
			photoBody.append('photo', file)
			
			updateClient(userID, authToken, data).then((resp) => {
				setMessageSnack(resp.message)
				setSeverity(resp.status_code === 201 ? 'success' : 'error')
				if(resp.status_code === 201){
					pushUserAvatar(authToken, photoBody).then((resp) => {
						handleOpen()
					})
				}
			})
		}else{
			data = { ...data, password: mdp }
			createClient(authToken, data)
				.then((response) => {
					setMessageSnack(response.message)
					setSeverity(response.status_code === 201 ? 'success' : 'error')
					handleOpen()
					if (response.status_code === 201) {
						// Push de la photo:
						let photoBody = new FormData()
						photoBody.append(
							'_id',
							!state ? response.user._id : state.id
						)
						photoBody.append('photo', file)
						pushUserAvatar(authToken, photoBody).then((response) => {
							// Redirection:
							navigate('/customers', {
								state: {
									snackParams: {
										message: `Agent ${
											!state ? 'crée' : 'modifié'
										} !`,
										severity: 'success'
									}
								}
							})
						})
					} else {
						setMessageSnack('ERREUR')
					}
				})
				.catch((error) => {
					setMessageSnack('Une erreur est survenue ! ')
					handleOpen()
				})
		}

		
	}
	return (
		<Box
			component="form"
			className="m-5 p-5 boxForm"
			onSubmit={handleSubmit(onSubmit)}
		>
			{renderSnack}
			<Row className="justify-content-center align-items-center">
				{/* Lastname input */}
				<Col
					xs="10"
					lg="6"
					className="d-flex justify-content-center align-items-center flex-column mb-3"
				>
					<Controller
						name={'lastname'}
						control={control}
						render={({ field }) => (
							<TextField
								variant="outlined"
								required
								label="Nom de famille"
								className={
									!errors.lastname
										? 'form-control'
										: 'form-control is-invalid'
								}
								{...field}
								value={field.value || ''}
							/>
						)}
						rules={{
							required: 'Ce champs est obligatoire.'
						}}
					/>
					{errors?.lastname && (
						<span className="invalid-feedback fw-bold text-center">
							{errors.lastname.message}
						</span>
					)}
				</Col>

				{/* Firstname input */}
				<Col
					xs="10"
					lg="6"
					className="d-flex justify-content-center align-items-center flex-column mb-3"
				>
					<Controller
						name={'firstname'}
						control={control}
						render={({ field }) => (
							<TextField
								variant="outlined"
								required
								label="Prénom"
								className={
									!errors.firstname
										? 'form-control'
										: 'form-control is-invalid'
								}
								{...field}
								value={field.value || ''}
							/>
						)}
						rules={{
							required: 'Ce champs est obligatoire.'
						}}
					/>
					{errors?.firstname && (
						<span className="invalid-feedback fw-bold text-center">
							{errors.firstname.message}
						</span>
					)}
				</Col>

				{/* Email input */}
				<Col
					xs="10"
					lg="6"
					className="d-flex justify-content-center align-items-center flex-column"
				>
					<Controller
						name={'email'}
						control={control}
						render={({ field }) => (
							<TextField
								variant="outlined"
								required
								label="Email"
								className={
									!errors.email
										? 'form-control'
										: 'form-control is-invalid'
								}
								{...field}
								value={field.value || ''}
							/>
						)}
						rules={{
							required: 'Ce champs est obligatoire.'
						}}
					/>
					{errors?.email && (
						<span className="invalid-feedback fw-bold text-center">
							{errors.email.message}
						</span>
					)}
				</Col>

				{/* Phone input */}
				<Col
					xs="10"
					lg="6"
					className="d-flex justify-content-center align-items-center flex-column"
				>
					<Controller
						name={'phone'}
						control={control}
						render={({ field }) => (
							<TextField
								variant="outlined"
								required
								label="Téléphone"
								className={
									!errors.phone
										? 'form-control'
										: 'form-control is-invalid'
								}
								{...field}
								value={field.value || ''}
							/>
						)}
						rules={{
							required: 'Ce champs est obligatoire.'
						}}
					/>
					{errors?.phone && (
						<span className="invalid-feedback fw-bold text-center">
							{errors.phone.message}
						</span>
					)}
				</Col>

				{/* Photo Form part */}
				<PhotoPart
					state={state}
					register={register}
					errors={errors}
					update={userID ? true : false}
					setFile={setFile}
					file={file}
				/>
			</Row>
			<Row className="mt-5">
				<Col className="justify-content-center d-flex">
					<BtnGeneral
						text="Créer le client"
						style={{ width: 'fit-content' }}
						onPress={handleSubmit}
					/>
				</Col>
			</Row>
		</Box>
	)
}

export default AddForm
