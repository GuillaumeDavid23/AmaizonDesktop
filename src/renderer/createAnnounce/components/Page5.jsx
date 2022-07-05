import { Box } from '@mui/material'
import FormNavigation from './FormNavigation'
import { Controller } from 'react-hook-form'
import { REGNUM, REGSTRING, REGID } from '../../../utils/regex'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select from 'react-select'
import Checkbox from '../../globalComponents/Checkbox'

const Page5 = ({ visiblePage, control, errors, handleNavigation }) => {
	// Déclaration options selects transactionTypes:
	const transactionTypes = [
		{ value: 1, label: 'Achat' },
		{ value: 2, label: 'Location' }
	]

	return (
		<Box className={`form-part ${visiblePage !== 5 ? 'd-none' : ''}`}>
			<h1>Etape 5 - Infos financières:</h1>

			{/* TransactionType Form part */}
			<Controller
				name="transactionType"
				control={control}
				rules={{
					required: {
						value: true,
						message: 'Type de transaction requis.'
					},
					pattern: {
						value: REGSTRING.value,
						message: REGSTRING.message
					}
				}}
				render={({ field }) => (
					<Select
						options={transactionTypes}
						placeholder={'Type de transaction'}
						{...field}
					/>
				)}
			/>
			{errors?.transactionType && (
				<span className="invalid-feedback fw-bold text-center">
					{errors.transactionType.message}
				</span>
			)}

			{/* Amount Form part */}
			<Controller
				name="amount"
				control={control}
				rules={{
					required: {
						value: true,
						message: 'Montant requis.'
					},
					pattern: {
						value: REGNUM.value,
						message: REGNUM.message
					}
				}}
				render={({ field }) => (
					<OutlinedInput
						className={`ps-2 my-3 form-control ${
							errors.amount ? 'is-invalid' : ''
						}`}
						variant="filled"
						placeholder="Montant"
						{...field}
					/>
				)}
			/>
			{errors?.amount && (
				<span className="invalid-feedback fw-bold text-center">
					{errors.amount.message}
				</span>
			)}

			{/* IsToSell Form part */}
			<span>Cette propriété est à vendre/louer dès maintenant:</span>
			<Box
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'center'
				}}
			>
				<span>Non</span>
				<Controller
					name="isToSell"
					control={control}
					rules={{
						pattern: {
							value: REGID.value,
							message: REGID.message
						}
					}}
					render={({ field }) => <Checkbox {...field} />}
				/>
				<span>Oui</span>
			</Box>
			{errors?.isToSell && (
				<span className="invalid-feedback fw-bold text-center">
					{errors.isToSell.message}
				</span>
			)}

			<FormNavigation
				visiblePage={visiblePage}
				handleNavigation={handleNavigation}
			/>
		</Box>
	)
}

export default Page5
