import { MenuItem, SubMenu } from 'react-pro-sidebar'
import { IoBook } from 'react-icons/io5'

const InventoryPart = ({ navigate }) => {
	return (
		<SubMenu title="Etat des lieux" icon={<IoBook />}>
			<MenuItem>Liste des EDL</MenuItem>
			<MenuItem>Ajouter un EDL</MenuItem>
		</SubMenu>
	)
}

export default InventoryPart
