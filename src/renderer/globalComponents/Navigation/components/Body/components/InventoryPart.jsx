import { MenuItem, SubMenu } from 'react-pro-sidebar'
import { IoBook } from 'react-icons/io5'

const InventoryPart = ({ navigate }) => {
	return (
		<SubMenu title="Etat des lieux" icon={<IoBook />}>
			<MenuItem onClick={() => navigate('/inventory')}>Liste des états des lieux</MenuItem>
		</SubMenu>
	)
}

export default InventoryPart
