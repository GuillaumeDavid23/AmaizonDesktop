import { AnimatedPage } from '../../globalComponents'
import { Box } from '@mui/material'
import { Title } from '../../globalComponents'
import './CreateAgent.css'
import { OutlinedInput } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { REGSTRING, REGEMAIL, REGTEL } from '../../../utils/regex'
import BtnGeneral from '../../globalComponents/BtnGeneral/BtnGeneral'

const CreateAgent = () => {
	// Destructuring HookForm hook
	const {
		register,
		control,
		handleSubmit,
		formState: { errors }
	} = useForm({
		mode: 'onChange',
		shouldFocusError: true
	})

	const onSubmit = () => {
		alert('submit')
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
							className="d-flex justify-content-around"
						>
							<span>Photo de l'agent:</span>
							<input
								className={errors.photo ? 'is-invalid' : ''}
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

					<Box className="d-flex justify-content-center my-3">
						<BtnGeneral text={'Valider'} />
					</Box>
				</form>
			</Box>
		</AnimatedPage>
	)
}

export default CreateAgent
