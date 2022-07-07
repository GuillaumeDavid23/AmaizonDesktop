// React imports:
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

// Components imports:
import Title from '../globalComponents/Title/Title'
import Form from './components/Form'
import { Row, Col } from 'react-bootstrap'

// CSS imports:
import './CreateAnnounce.css'

// Services imports:
import { getClient, createSeller } from '../services/Client'
import { createProperty } from '../services/Property'

// Utils imports:
import { strRandom } from '../../utils/funcs'

// Hooks imports:
import { useSlideSnack } from '../hooks'

const CreateAnnounce = () => {
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

	// Destructuring HookForm hook:
	const {
		register,
		control,
		handleSubmit,
		formState: { errors }
	} = useForm({
		mode: 'onChange',
		shouldFocusError: true
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

	// Gestion de la pagination:
	const [visiblePage, setVisiblePage] = useState(1)
	// const [progress, setProgress] = useState(0)
	const handleNavigation = (previousOrNext) => {
		let newVisiblePage = visiblePage
		if (previousOrNext === 'previous') {
			newVisiblePage--
		} else if (previousOrNext === 'next') {
			// On check si des erreurs on été générés sur la page actuelle et dans ce cas, on bloque l'accès à la page suivante.
			if (
				(visiblePage === 1 &&
					!(
						errors.title ||
						errors.propertyType ||
						errors.description
					)) ||
				(visiblePage === 2 &&
					!(
						errors.location ||
						errors.postalCode ||
						errors.city ||
						errors.country
					)) ||
				(visiblePage === 3 &&
					!(
						errors.surface ||
						errors.roomNumber ||
						errors.electricMeterRef ||
						errors.gasMeterRef
					)) ||
				(visiblePage === 4 &&
					!(
						errors.list_equipments ||
						errors.heatingType ||
						errors.hotWaterType
					)) ||
				(visiblePage === 5 &&
					!(
						errors.transactionType ||
						errors.amount ||
						errors.isToSell
					)) ||
				(visiblePage === 6 && checked) ||
				visiblePage === 7
			) {
				newVisiblePage++
			}
		}
		setVisiblePage(newVisiblePage)
		// switch (newVisiblePage) {
		// 	case 1:
		// 		setProgress(0)
		// 		break
		// 	case 2:
		// 		setProgress(0.15)
		// 		break
		// 	case 3:
		// 		setProgress(0.3)
		// 		break
		// 	case 4:
		// 		setProgress(0.45)
		// 		break
		// 	case 5:
		// 		setProgress(0.6)
		// 		break
		// 	case 6:
		// 		setProgress(0.75)
		// 		break
		// 	case 7:
		// 		setProgress(0.9)
		// 		break
		// 	case 8:
		// 		setProgress(1)
		// 		break
		// 	default:
		// }
	}

	// Récupération du vendeur sélectionné (Page 6):
	const [checked, setChecked] = useState()
	const [seller, setSeller] = useState()
	useEffect(() => {
		if (checked) {
			try {
				getClient(checked, token).then((res) => {
					setSeller(res.data)
				})
			} catch (error) {
				console.log(error)
			}
		}
	}, [checked])

	// Gestion de l'affichage des erreurs:
	if (Object.keys(errors).length > 0 && visiblePage === 7) {
		if (errors.title || errors.propertyType || errors.description) {
			setVisiblePage(1)
		} else if (
			errors.location ||
			errors.postalCode ||
			errors.city ||
			errors.country
		) {
			setVisiblePage(2)
		} else if (
			errors.surface ||
			errors.roomNumber ||
			errors.electricMeterRef ||
			errors.gasMeterRef
		) {
			setVisiblePage(3)
		} else if (
			errors.list_equipments ||
			errors.heatingType ||
			errors.hotWaterType
		) {
			setVisiblePage(4)
		} else if (errors.transactionType || errors.amount || errors.isToSell) {
			setVisiblePage(5)
		} else if (errors.transactionType || errors.amount || errors.isToSell) {
			setVisiblePage(5)
		} else if (!checked) {
			setVisiblePage(6)
		}
	}

	// Gestion de la pré-validation:
	const [datasToDisplay, setDatasToDisplay] = useState()
	const [datasToValidate, setDatasToValidate] = useState()
	const onSubmit = (data) => {
		// Hotfix isToSell:
		if (data.isToSell === undefined) {
			data.isToSell = true
		}

		// Temporaire, inclusion de propertyRef dans les datas:
		data['propertyRef'] = strRandom({
			includeUpperCase: true,
			includeNumbers: true,
			length: 10
		})

		// Récupération des valeurs dans le select list_equipments:
		if (data.list_equipments !== undefined) {
			let formattedSuffList = []
			data.list_equipments.forEach((equipment) => {
				formattedSuffList.push(equipment.label)
			})
			data.list_equipments = formattedSuffList
		}

		// Récupération des valeurs dans les select propertyType et transactionType:
		data.propertyType = data.propertyType.label
		data.transactionType = data.transactionType.label

		// Formattage et unification des datas de chauffage:
		if (data.heatingType !== undefined || data.hotWaterType !== undefined) {
			let list_heater = []
			if (data.heatingType !== undefined) {
				list_heater.push('Chauffage ' + data.heatingType.label)
				delete data.heatingType
			}
			if (data.heatingType !== undefined) {
				list_heater.push('Eau chaude ' + data.hotWaterType.label)
				delete data.hotWaterType
			}
			data['list_heater'] = list_heater
		}

		// Formattage de l'adresse:
		data.location = [
			data.location,
			data.postalCode,
			data.city,
			data.country
		]
		delete data.postalCode
		delete data.city
		delete data.country

		// Traitement des photos:
		for (let i = 1; i <= 5; i++) {
			let iteration = 'photo' + i
			if (data[iteration].length > 0) {
				data[iteration] = data[iteration][0]
			} else {
				delete data[iteration]
			}
		}

		// Génération et traitement du formData (retrait des datas undefined):
		var formData = new FormData()
		for (let key in data) {
			if (data[key] !== undefined && key.substring(0, 5) !== 'photo') {
				formData.append(key, data[key])
			}
		}
		for (let key in data) {
			if (data[key] !== undefined && key.substring(0, 5) === 'photo') {
				formData.append(key, data[key])
			}
		}

		// Formattage des datas to display
		let datasToDisplayToState = {}
		for (let pair of formData.entries()) {
			datasToDisplayToState[pair[0]] = pair[1]
		}
		setDatasToDisplay(datasToDisplayToState)
		setDatasToValidate(formData)
		handleNavigation('next')
	}

	// Gestion de la validation:
	const navigate = useNavigate()
	const handleValidation = (data) => {
		createProperty(data, token)
			// On Promise Successful
			.then((res) => {
				if (res !== undefined) {
					createSeller(checked, res.datas, token)
						.then((res2) => {
							if (res2 !== undefined) {
								navigate('/home', {
									state: {
										snackParams: {
											message: 'Annonce ajoutée !',
											severity: 'success'
										}
									}
								})
							} else {
								setSnackParams({
									message: 'Erreur serveur !',
									severity: 'error'
								})
							}
						})
						.catch(async (err) => {
							await err
							console.log('err2:', err)
						})
				} else {
					setSnackParams({
						message: 'Erreur serveur !',
						severity: 'error'
					})
				}
			})
			// On Promise Reject
			.catch(async (err) => {
				await err
				if (err._W) {
					err = err._W
				}
				// Handling rejected Promise
				if (typeof err === 'object') {
					let { message } = err
					// Handling Validation error:
					if (err.status_code === 422) {
						err.errors.forEach((error) => {
							Object.keys(error).forEach((key) => {
								message += '\n-' + error[key]
							})
						})
						setSnackParams({
							message,
							severity: 'error'
						})
					} else {
						// Handling Classic error:
						setSnackParams({
							message,
							severity: 'error'
						})
					}
				} else {
					setSnackParams({
						message: err,
						severity: 'error'
					})
				}
			})
	}

	return (
		<>
			<Title text="Créer" />
			<Row className="d-flex justify-content-center">
				<Col xs={10} md={8}>
					<Form
						handleSubmit={handleSubmit}
						onSubmit={onSubmit}
						visiblePage={visiblePage}
						control={control}
						errors={errors}
						handleNavigation={handleNavigation}
						token={token}
						checked={checked}
						setChecked={setChecked}
						register={register}
						datasToDisplay={datasToDisplay}
						seller={seller}
						datasToValidate={datasToValidate}
						handleValidation={handleValidation}
					/>
				</Col>
			</Row>
			{/* Snackbar */}
			{renderSnack}
		</>
	)
}

export default CreateAnnounce
