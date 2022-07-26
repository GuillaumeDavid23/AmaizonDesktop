import { BtnGeneral } from '../../../../../globalComponents'
import { Box } from '@mui/material'

const ValidationButton = ({ state }) => {
	return (
		<Box className="d-flex justify-content-center my-3">
			<BtnGeneral text={!state ? "Créer l'agent" : "Modifier l'agent"} />
		</Box>
	)
}

export default ValidationButton
