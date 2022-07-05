// React imports:
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

// Components imports:
import Title from '../globalComponents/Title/Title'
import Form from './components/Form'

// CSS imports:
import './CreateAnnounce.css'

// Services imports:
import { getClient, createSeller } from '../services/Client'
import { createProperty } from '../services/Property'

// Utils imports:
import { strRandom } from '../../utils/funcs'

const CreateAnnounce = () => {
	// Récupération du token:
	const token =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFnZW50Ijp7InBvc2l0aW9uIjoiU2VjcsOpdGFpcmUiLCJwaG9uZVBybyI6IjA2NTQzNDQzMjEiLCJjdXN0b21lcnMiOlt7Il9pZCI6IjYyODc0OTZkZmY4NGFiNWVhYjEzMzI5ZiIsImZpcnN0bmFtZSI6Ik1pY2hvdSIsImxhc3RuYW1lIjoiTWljaE1pY2giLCJlbWFpbCI6Im1pY2hvdUB5YWhvby5mciIsInBob25lIjoiMDYzMDEyNDMwMiJ9LHsiX2lkIjoiNjI4NzUwZjQyMDcwYzVmYzQ1NDg5Mjc0IiwiZmlyc3RuYW1lIjoiSm9yZGFuIiwibGFzdG5hbWUiOiJNYW5jaGVyb28iLCJlbWFpbCI6ImdvZ29nb0Bnb2dvZy5mciIsInBob25lIjoiMDYyNDI0MDMyNCJ9XX0sIl9pZCI6IjYyNGQ0Y2FhZmIwNTExOTQ0Y2NlYWFmZiIsImZpcnN0bmFtZSI6IkphY3F1ZWxpbmUiLCJsYXN0bmFtZSI6IkR1cG9udCIsImVtYWlsIjoieWF5YUB5YXlhLmZyIiwicm9sZXMiOiJhZ2VudCIsInBhc3N3b3JkIjoiJDJhJDEyJDBLLkVjaElHUzM2dXZFb3V2aDVVMi5Gc1JJVnY3cmNYbkRWNk4uTGdNWXZKcXRGSnV1R2F1IiwibmV3c2xldHRlciI6ZmFsc2UsInN0YXR1cyI6dHJ1ZSwidXBkYXRlZEF0IjoiMjAyMi0wNS0yMFQwNjoyNzozMi41MzdaIiwiY3JlYXRlZEF0IjoiMjAyMi0wNC0wNlQwODoxOToxMC45NDFaIiwiX192IjowLCJ0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoxYzJWeVNXUWlPaUkyTWpSa05HTmhZV1ppTURVeE1UazBOR05qWldGaFptWWlMQ0pwWVhRaU9qRTJORGswTVRrMk16VXNJbVY0Y0NJNk1UWTBPVFF6TnpZek5YMC5rTGQ1V0J4em9yUWIzTzZSNUpzakFpTWhicjkxSE9MRWpKaTE5TThqSWFZIn0sImlhdCI6MTY1NzAxMjc2NywiZXhwIjoxNjU3MDMwNzY3fQ.YxzcosKWNZvkHCTi6QctFbPP7xOR3T-wTAyp0ZkTMrY'

	// Destructuring HookForm hook
	const {
		register,
		control,
		handleSubmit,
		formState: { errors }
	} = useForm({
		mode: 'onChange',
		shouldFocusError: true,
		defaultValues: {
			title: 'Chouette Maison',
			propertyType: { value: 1, label: 'Maison' },
			location: "441 rue d'abbeville",
			postalCode: '80000',
			city: 'Amiens',
			country: 'France',
			surface: '250',
			roomNumber: '5',
			transactionType: { value: 1, label: 'Achat' },
			amount: '200000'
		}
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
		for (const key in data) {
			if (data[key] !== undefined) {
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
								navigate('/')
							} else {
								// setSnackText('Erreur Serveur !')
								// setIsSnackVisible(true)
							}
						})
						.catch(async (err) => {
							await err
							console.log('err2:', err)
						})
				} else {
					// setSnackText('Erreur Serveur !')
					// setIsSnackVisible(true)
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
						// setSnackText(message)
					} else {
						// // Handling Classic error:
						// setSnackText(message)
					}
				} else {
					// setSnackText(err)
				}

				// setIsSnackVisible(true)
			})
	}

	return (
		<>
			<Title text="Créer" />
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
		</>
	)
}

export default CreateAnnounce