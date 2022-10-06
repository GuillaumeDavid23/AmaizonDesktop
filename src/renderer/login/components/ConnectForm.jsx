// React import
import React from 'react'

// Navigation import
import { useLocation } from 'react-router-dom'

// HookForm imports
import { useForm, Controller } from 'react-hook-form'

// Layouts imports
import Box from '@mui/material/Box'
import { Container, Image, Row, Col } from 'react-bootstrap'

// Design imports
import LoadingButton from '@mui/lab/LoadingButton'

// Input imports
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'

// Icon imports
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

// Custom hook import
import { useSlideSnack, useAuth } from '../../hooks'

// Image imports
import AmaizonLogo from '../../../assets/brand/Amaizon_logo.png'
import Amaizon from '../../../assets/brand/Amaizon_full.png'

// CSS styles import
import './ConnectForm.css'
import { TextField } from '@mui/material'

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
	const { handleLogin } = useAuth()
	// setting up component reducer
	const [states, dispatch] = React.useReducer(CFReducer, initialStates)

	// Destructuring snackParams
	const {
		snackParams: { snackMessage, snackSeverity }
	} = states

	let { state } = useLocation()
	// Destructuring Snackbar from custom hook
	const { handleOpen, renderSnack } = useSlideSnack({
		message: snackMessage,
		time: 2000,
		severity: snackSeverity
	})

	React.useEffect(() => {
		if (state && state.snackParams) {
			let { message, severity } = state.snackParams
			dispatch({ type: actions.SET_SNACKMESSAGE, payload: message })
			dispatch({ type: actions.SET_SNACKSEVERITY, payload: severity })
		}

		if (snackMessage) {
			handleOpen()
		}
	}, [snackMessage, handleOpen, state])
	

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
			email: localStorage.getItem('REMEMBER_ME')
				? JSON.parse(localStorage.getItem('REMEMBER_ME'))
				: '',
			password: 'JszAL55j6BFb7FpH'
		}
	})

	const onSubmit = async (data) => {
		// Stringify the data
		const body = JSON.stringify({ ...data })

		try {
			// Set fetching to true
			dispatch({ type: actions.SET_FETCHING, payload: true })
			await handleLogin(body)
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
			<Row className="align-items-center h-100">
				<Col xs={6} className="d-flex flex-column align-items-center">
					<Image src={AmaizonLogo} style={{ width: '35%' }} />
					<Image src={Amaizon} style={{ width: '55%' }} />
				</Col>
				<Col xs={6}>
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
										required:
											'Vous devez indiquer votre email.',
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
										<TextField
											id="OutlinedConnectPassword"
											variant="outlined"
											label="Mot de passe"
											className={
												!errors.password
													? 'form-control'
													: 'form-control is-invalid'
											}
											{...field}
											value={field.value || ''}
											type={
												states.isPasswordVisible
													? 'text'
													: 'password'
											}
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														<IconButton
															aria-label="toggle password visibility"
															onClick={
																handlePasswordChange
															}
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
												)
											}}
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
						{/* <Row
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
						</Row> */}
						{/* Submit Button */}
						<Row
							xs="10"
							lg="6"
							className="d-flex justify-content-center mb-3"
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
				</Col>
			</Row>
		</Container>
	)
}

export default ConnectForm
