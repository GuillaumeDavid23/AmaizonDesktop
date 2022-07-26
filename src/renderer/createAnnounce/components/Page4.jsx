import { Box } from '@mui/material'
import FormNavigation from './FormNavigation'
import { Controller } from 'react-hook-form'
import { REGSTRING } from '../../../utils/regex'
import Select from 'react-select'

const Page4 = ({ visiblePage, control, errors, handleNavigation }) => {
	// Déclaration options selects Stuffs:
	const stuffs = [
		{ value: 'Sonnerie', label: 'Sonnerie' },
		{ value: 'Interphone', label: 'Interphone' },
		{ value: 'Alarme', label: 'Alarme' },
		{ value: 'Cave', label: 'Cave' },
		{ value: 'Parking / Boxe / Garage', label: 'Parking / Boxe / Garage' },
		{ value: 'Jardin', label: 'Jardin' },
		{ value: 'Balcon / Terrasse', label: 'Balcon / Terrasse' },
		{ value: 'Boite aux lettres', label: 'Boite aux lettres' }
	]

	// Déclaration options selects Heat:
	const heatTypes = [
		{ value: 1, label: 'Collectif' },
		{ value: 2, label: 'Gaz' },
		{ value: 3, label: 'Elec' },
		{ value: 4, label: 'Autre' }
	]

	return (
		<Box className={`form-part ${visiblePage !== 4 ? 'd-none' : ''}`}>
			<h1>Etape 4 - Infos techniques:</h1>

			{/* List_Equipments Form part */}
			<Box className="my-3">
				<Controller
					name="list_equipments"
					control={control}
					rules={{
						pattern: {
							value: REGSTRING.value,
							message: REGSTRING.message
						}
					}}
					render={({ field }) => (
						<Select
							className={
								errors.list_equipments ? 'is-invalid' : ''
							}
							options={stuffs}
							placeholder={'Liste équipements'}
							{...field}
							isMulti
						/>
					)}
				/>
				{errors?.list_equipments && (
					<span className="invalid-feedback fw-bold text-center">
						{errors.list_equipments.message}
					</span>
				)}
			</Box>

			{/* HeatingType Form part */}
			<Box className="my-3">
				<Controller
					name="heatingType"
					control={control}
					rules={{
						pattern: {
							value: REGSTRING.value,
							message: REGSTRING.message
						}
					}}
					render={({ field }) => (
						<Select
							className={errors.heatingType ? 'is-invalid' : ''}
							options={heatTypes}
							placeholder={'Type de chauffage'}
							{...field}
						/>
					)}
				/>
				{errors?.heatingType && (
					<span className="invalid-feedback fw-bold text-center">
						{errors.heatingType.message}
					</span>
				)}
			</Box>

			{/* HotWaterType Form part */}
			<Box className="my-3">
				<Controller
					name="hotWaterType"
					control={control}
					rules={{
						pattern: {
							value: REGSTRING.value,
							message: REGSTRING.message
						}
					}}
					render={({ field }) => (
						<Select
							className={errors.hotWaterType ? 'is-invalid' : ''}
							options={heatTypes}
							placeholder={"Type de chauffage d'eau chaude"}
							{...field}
						/>
					)}
				/>
				{errors?.hotWaterType && (
					<span className="invalid-feedback fw-bold text-center">
						{errors.hotWaterType.message}
					</span>
				)}
			</Box>

			<FormNavigation
				visiblePage={visiblePage}
				handleNavigation={handleNavigation}
			/>
		</Box>
	)
}

export default Page4
