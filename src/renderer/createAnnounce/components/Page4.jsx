import { Box } from '@mui/material'
import FormNavigation from './FormNavigation'
import { Controller } from 'react-hook-form'
import { REGNUM, REGID } from '../../../utils/regex'
import Select from 'react-select'

const Page4 = ({ visiblePage, control, errors, handleNavigation }) => {
	// Déclaration options selects Stuffs:
	const stuffs = [
		{ value: 1, label: 'Sonnerie' },
		{ value: 2, label: 'Interphone' },
		{ value: 3, label: 'Alarme' },
		{ value: 4, label: 'Cave' },
		{ value: 5, label: 'Parking / Boxe / Garage' },
		{ value: 6, label: 'Jardin' },
		{ value: 7, label: 'Balcon / Terrasse' },
		{ value: 8, label: 'Boite aux lettres' }
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
			<Controller
				name="list_equipments"
				control={control}
				rules={{
					pattern: {
						value: REGNUM.value,
						message: REGNUM.message
					}
				}}
				render={({ field }) => (
					<Select
						className="my-3"
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

			{/* HeatingType Form part */}
			<Controller
				name="heatingType"
				control={control}
				rules={{
					pattern: {
						value: REGID.value,
						message: REGID.message
					}
				}}
				render={({ field }) => (
					<Select
						className="my-3"
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

			{/* HotWaterType Form part */}
			<Controller
				name="hotWaterType"
				control={control}
				rules={{
					pattern: {
						value: REGID.value,
						message: REGID.message
					}
				}}
				render={({ field }) => (
					<Select
						className="my-3"
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

			<FormNavigation
				visiblePage={visiblePage}
				handleNavigation={handleNavigation}
			/>
		</Box>
	)
}

export default Page4
