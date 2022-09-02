import { Box } from '@mui/material'
import { BtnGeneral } from '../../../../globalComponents'
import { REGSTRING } from '../../../../../utils/regex'

const AddressPart = ({
	register,
	setValue,
	errors,
	showAddressInput,
	setShowAddressInput
}) => {
	const handleShowAddress = () => {
		if (showAddressInput) {
			setValue('address', '')
		}
		setShowAddressInput(!showAddressInput)
	}

	return (
		<Box>
			<BtnGeneral
				type="button"
				text={`Rdv en ${!showAddressInput ? 'extérieur' : 'intérieur'}`}
				onClick={handleShowAddress}
				className="w-auto mt-3"
			/>
			{showAddressInput && (
				<input
					className={`form-control mt-2${
						errors.address ? ' is-invalid' : ''
					}`}
					placeholder="Adresse"
					{...register('address', {
						required: 'Vous devez indiquer une adresse..',
						pattern: {
							value: REGSTRING.value,
							message: REGSTRING.message
						}
					})}
				/>
			)}
			{errors?.address && (
				<span className="invalid-feedback fw-bold text-center">
					{errors.address.message}
				</span>
			)}
		</Box>
	)
}

export default AddressPart
