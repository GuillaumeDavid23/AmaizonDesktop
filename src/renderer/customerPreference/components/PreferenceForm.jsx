import React from 'react'

import Box from '@mui/material/Box'
import { useForm, Controller } from 'react-hook-form'
import { MenuItem, TextField } from '@mui/material'
import { Col, Row } from 'react-bootstrap'
import BtnGeneral from '../../globalComponents/BtnGeneral/BtnGeneral'
import { updateClient } from '../../services/Client'
import { useSlideSnack } from '../../hooks'
const PreferenceForm = () => {
	// Destructuring Snackbar from custom hook
	const { handleOpen, renderSnack } = useSlideSnack({
		message: 'PROUT',
		time: 2000,
		severity: 'success'
	})
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
			propertyType: 'Maison',
			type: 'Achat'
		}
	})

	const id = '62de6307a49053b222916570'

	const onSubmit = (data) => {
		let token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_AMAIZON'))
		data = {
			buyer: {
				...data
			}
		}
		updateClient(id, token, data).then((response) => console.log(response))
	}
	return (
		<Box
			component="form"
			className="m-5 p-5 boxForm"
			onSubmit={handleSubmit(onSubmit)}
		>
			{renderSnack}
			<Row className="justify-content-center align-items-center">
				{/* budget minimum input */}
				<Col
					xs="10"
					lg="6"
					className="d-flex justify-content-center align-items-center flex-column mb-3"
				>
					<Controller
						name={'budgetMin'}
						control={control}
						render={({ field }) => (
							<TextField
								variant="outlined"
								required
								label="Budget minimum"
								className={
									!errors.budgetMin
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
					{errors?.budgetMin && (
						<span className="invalid-feedback fw-bold text-center">
							{errors.budgetMin.message}
						</span>
					)}
				</Col>

				{/* budget max input */}
				<Col
					xs="10"
					lg="6"
					className="d-flex justify-content-center align-items-center flex-column mb-3"
				>
					<Controller
						name={'budgetMax'}
						control={control}
						render={({ field }) => (
							<TextField
								variant="outlined"
								required
								label="Budget maximum"
								className={
									!errors.budgetMax
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
					{errors?.budgetMax && (
						<span className="invalid-feedback fw-bold text-center">
							{errors.budgetMax.message}
						</span>
					)}
				</Col>

				{/* City input */}
				<Col
					xs="10"
					lg="6"
					className="d-flex justify-content-center align-items-center flex-column mb-3"
				>
					<Controller
						name={'city'}
						control={control}
						render={({ field }) => (
							<TextField
								variant="outlined"
								required
								label="Ville"
								className={
									!errors.city
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
					{errors?.city && (
						<span className="invalid-feedback fw-bold text-center">
							{errors.city.message}
						</span>
					)}
				</Col>

				{/* Surface mini input */}
				<Col
					xs="10"
					lg="6"
					className="d-flex justify-content-center align-items-center flex-column mb-3"
				>
					<Controller
						name={'surfaceMin'}
						control={control}
						render={({ field }) => (
							<TextField
								variant="outlined"
								required
								label="Surface minimum"
								className={
									!errors.surfaceMin
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
					{errors?.surfaceMin && (
						<span className="invalid-feedback fw-bold text-center">
							{errors.surfaceMin.message}
						</span>
					)}
				</Col>

				{/* Surface Max input */}
				<Col
					xs="10"
					lg="6"
					className="d-flex justify-content-center align-items-center flex-column mb-3"
				>
					<Controller
						name={'surfaceMax'}
						control={control}
						render={({ field }) => (
							<TextField
								variant="outlined"
								required
								label="Surface maximum"
								className={
									!errors.surfaceMax
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
					{errors?.surfaceMax && (
						<span className="invalid-feedback fw-bold text-center">
							{errors.surfaceMax.message}
						</span>
					)}
				</Col>

				{/* rooms input */}
				<Col
					xs="10"
					lg="6"
					className="d-flex justify-content-center align-items-center flex-column mb-3"
				>
					<Controller
						name={'rooms'}
						control={control}
						render={({ field }) => (
							<TextField
								variant="outlined"
								required
								label="Nombre de chambre mini"
								className={
									!errors.rooms
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
					{errors?.rooms && (
						<span className="invalid-feedback fw-bold text-center">
							{errors.rooms.message}
						</span>
					)}
				</Col>

				{/* Property type input */}
				<Col
					xs="10"
					lg="6"
					className="d-flex justify-content-center align-items-center flex-column"
				>
					<Controller
						name={'propertyType'}
						control={control}
						render={({ field }) => (
							<TextField
								select
								required
								variant="outlined"
								className="bg-white w-100 rounded"
								id="propertyType"
								label="Type de propriété"
								{...field}
								value={field.value || ''}
							>
								<MenuItem value="">Aucune</MenuItem>

								<MenuItem value="Maison">Maison</MenuItem>
								<MenuItem value="Appartement">
									Appartement
								</MenuItem>
							</TextField>
						)}
						rules={{
							required: 'Ce champs est obligatoire.'
						}}
					/>
					{errors?.propertyType && (
						<span className="invalid-feedback fw-bold text-center">
							{errors.propertyType.message}
						</span>
					)}
				</Col>

				{/* Type input */}
				<Col
					xs="10"
					lg="6"
					className="d-flex justify-content-center align-items-center flex-column"
				>
					<Controller
						name={'type'}
						control={control}
						render={({ field }) => (
							<TextField
								select
								required
								variant="outlined"
								className="bg-white w-100 rounded"
								id="type"
								label="Type de transaction"
								{...field}
								value={field.value || 'Achat'}
							>
								<MenuItem value="Achat">Achat</MenuItem>
								<MenuItem value="Location">Location</MenuItem>
							</TextField>
						)}
						rules={{
							required: 'Ce champs est obligatoire.'
						}}
					/>
					{errors?.type && (
						<span className="invalid-feedback fw-bold text-center">
							{errors.type.message}
						</span>
					)}
				</Col>
			</Row>
			<Row className="mt-5">
				<Col className="justify-content-center d-flex">
					<BtnGeneral
						text="Créer la préférence"
						style={{ width: 'fit-content' }}
						onClick={handleSubmit}
					/>
				</Col>
			</Row>
		</Box>
	)
}

export default PreferenceForm
