// React import
import React from 'react'

// Navigation import
import { useNavigate } from 'react-router-dom'

// HookForm imports
import { useForm, Controller } from 'react-hook-form'

// Layouts imports
import Box from '@mui/material/Box'
import { Container, Image, Row, Col } from 'react-bootstrap'

// Design imports
import LoadingButton from '@mui/lab/LoadingButton'

// Input imports
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'

// Icon imports
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

// Custom hook import
import { useSlideSnack, useAuth } from '../../hooks'

// Custom function import
import { sleep } from '../../../utils/funcs'

// Image imports
import AmaizonLogo from '../../../assets/brand/Amaizon_logo.png'
import Amaizon from '../../../assets/brand/Amaizon_full.png'

// CSS styles import
import './ConnectForm.css'

// Component initial states
const initialStates = {
	isPasswordVisible: false,
	isFetching: false,
	snackParams: {
		snackMessage: '',
		snackSeverity: 'info'
	}
}

// Component reducer actions
const actions = {
	SET_PASSWORDVISIBLE: 'SET_PASSWORDVIBLE',
	SET_FETCHING: 'SET_FETCHING',
	SET_SNACKMESSAGE: 'SET_SNACKMESSAGE',
	SET_SNACKSEVERITY: 'SET_SNACKSEVERITY',
	RESET_FETCH: 'RESET_FETCH'
}

// Component reducer
const CFReducer = (states, action) => {
	switch (action.type) {
		case actions.SET_PASSWORDVISIBLE:
			return { ...states, isPasswordVisible: action.payload }
		case actions.SET_FETCHING:
			return { ...states, isFetching: action.payload }
		case actions.SET_SNACKMESSAGE:
			return {
				...states,
				snackParams: {
					...states.snackParams,
					snackMessage: action.payload
				}
			}
		case actions.SET_SNACKSEVERITY:
			return {
				...states,
				snackParams: {
					...states.snackParams,
					snackSeverity: action.payload
				}
			}
		case actions.RESET_FETCH:
			return {
				...states,
				isFetching: initialStates.isFetching,
				snackParams: { ...initialStates.snackParams }
			}

		default:
			return { ...states }
	}
}

const ConnectForm = () => {
	const auth = useAuth()

	// setting up component reducer
	const [states, dispatch] = React.useReducer(CFReducer, initialStates)

	// Destructuring snackParams
	const {
		snackParams: { snackMessage, snackSeverity }
	} = states

	const navigate = useNavigate()

	// Destructuring Snackbar from custom hook
	const { handleOpen, renderSnack } = useSlideSnack({
		message: snackMessage,
		time: 2000,
		severity: snackSeverity
	})

	// Prevent default mouseDown behavior
	const handleMouseDownPassword = (event) => {
		event.preventDefault()
	}

	// Password Visibility handler
	const handlePasswordChange = () => {
		dispatch({
			type: actions.SET_PASSWORDVISIBLE,
			payload: !states.isPasswordVisible
		})
	}

	// Destructuring Hook Form
	const {
		handleSubmit,
		control,
		formState: { errors, isValid }
	} = useForm({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		shouldFocusError: true,
		defaultValues: {
			email: 'mgarnier@amaizon.com',
			password: 'Jesuispas1garnier!'
		}
	})

	const onSubmit = async (data) => {
		// Stringify the data
		const body = JSON.stringify({ ...data })

		try {
			// Set fetching to true
			dispatch({ type: actions.SET_FETCHING, payload: true })

			// Wait a little second
			await sleep(1000)

			// Do Fetch
			fetch(`${window.electron.url}/api/user/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				},
				body
			})
				.then((response) => {
					return response.json()
				})
				.then((response) => {
					if (response.status_code === 200) {
						localStorage.setItem(
							'REACT_TOKEN_AUTH_AMAIZON',
							JSON.stringify(response.token)
						)
						if (response.refreshToken) {
							localStorage.setItem(
								'REACT_REFRESH_TOKEN_AUTH_AMAIZON',
								JSON.stringify(response.refreshToken)
							)
						}
						// Set success snackParams
						dispatch({
							type: actions.SET_SNACKMESSAGE,
							payload: response.message
						})
						dispatch({
							type: actions.SET_SNACKSEVERITY,
							payload: 'success'
						})

						if (response.message === 'Utilisateur connecté !') {
							navigate('/home', { state: { oui: 4 } })
						}
					} else {
						// Set error snackParams
						dispatch({
							type: actions.SET_SNACKMESSAGE,
							payload: response.error
						})
						dispatch({
							type: actions.SET_SNACKSEVERITY,
							payload: 'error'
						})
					}
					// Show Snackbar
					handleOpen()
				})
		} catch (error) {
			console.log(error)
		} finally {
			// Finally, set fetching to false
			dispatch({ type: actions.SET_FETCHING, payload: false })
		}
	}

	return (
		<Container fluid className="connectBlock">
			{/* Snackbar */}
			<Box className="d-flex justify-content-end">{renderSnack}</Box>

			{/* Logos */}
			<Box className="d-flex flex-column align-items-center">
				<Image src={AmaizonLogo} style={{ width: '15%' }} />
				<Image src={Amaizon} style={{ width: '25%' }} />
			</Box>

			{/* Form and stuffs */}
			<Box
				component="form"
				onSubmit={handleSubmit(onSubmit)}
				noValidate
				sx={{
					display: 'grid',
					gap: 2
				}}
			>
				{/* Title */}
				<Row>
					<h1 style={{ textAlign: 'center' }}>Connexion</h1>
				</Row>
				{/* Actual Form */}
				<Row className="flex-column align-items-center">
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
								<OutlinedInput
									className={
										!errors.email
											? 'form-control'
											: 'form-control is-invalid'
									}
									variant="filled"
									placeholder="Adresse email"
									{...field}
									value={field.value || ''}
									sx={{ width: '50%' }}
								/>
							)}
							rules={{
								required: 'Vous devez indiquer votre email.',
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
									message: 'Entrer une email valide'
								}
							}}
						/>
						{errors?.email && (
							<span className="invalid-feedback fw-bold text-center">
								{errors.email.message}
							</span>
						)}
					</Col>
					{/* Password input */}
					<Col
						xs="10"
						lg="6"
						className="d-flex justify-content-center align-items-center flex-column mt-4"
					>
						<Controller
							name={'password'}
							control={control}
							render={({ field }) => (
								<OutlinedInput
									id="OutlinedConnectPassword"
									label="a"
									className={
										!errors.password
											? 'form-control'
											: 'form-control is-invalid'
									}
									variant="filled"
									{...field}
									value={field.value || ''}
									placeholder="Mot de passe"
									type={
										states.isPasswordVisible
											? 'text'
											: 'password'
									}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={handlePasswordChange}
												onMouseDown={
													handleMouseDownPassword
												}
												edge="end"
											>
												{states.isPasswordVisible ? (
													<VisibilityOff />
												) : (
													<Visibility />
												)}
											</IconButton>
										</InputAdornment>
									}
									sx={{ width: '50%' }}
								/>
							)}
							rules={{
								required:
									'Vous devez remplir votre mot de passe'
							}}
						/>
						{errors?.password && (
							<span className="invalid-feedback fw-bold text-center">
								{errors.password.message}
							</span>
						)}
					</Col>
				</Row>
				{/* Remember Me */}
				<Row
					xs="10"
					lg="6"
					className="justify-content-center"
					style={{ width: '100%', margin: 'auto' }}
				>
					<div className="d-flex justify-content-center align-items-center">
						<label className="switch">
							<Controller
								name={'rememberMe'}
								control={control}
								render={({ field }) => (
									<input
										type="checkbox"
										{...field}
										value={field.value}
									/>
								)}
							/>
							<span className="slider round"></span>
						</label>
						<label
							htmlFor="rememberMe"
							className="form-check-label ms-2"
						>
							Se souvenir de moi
						</label>
					</div>
				</Row>
				{/* Submit Button */}
				<Row
					xs="10"
					lg="6"
					className="d-flex justify-content-center mb-3"
					style={{ width: '50%', margin: 'auto' }}
				>
					<LoadingButton
						type="submit"
						loading={states.isFetching}
						disabled={!isValid}
						variant="contained"
						sx={{ backgroundColor: '#647f94' }}
					>
						CONNEXION
					</LoadingButton>
				</Row>
			</Box>
		</Container>
	)
}

export default ConnectForm
