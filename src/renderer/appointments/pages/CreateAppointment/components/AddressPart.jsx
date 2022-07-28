import { useState } from 'react'
import { Box } from '@mui/material'
import { BtnGeneral } from '../../../../globalComponents'

const AddressPart = ({ register }) => {
	const [showAddressInput, setShowAddressInput] = useState(false)

	return (
		<Box>
			<BtnGeneral
				type="button"
				text="Rdv en extérieur ?"
				onClick={() => setShowAddressInput(true)}
				className="w-auto mt-3"
			/>
			{showAddressInput && (
				<input
					className="form-control mt-2"
					placeholder="Adresse"
					{...register('address')}
				/>
			)}
		</Box>
	)
}

export default AddressPart
