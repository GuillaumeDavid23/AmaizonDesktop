import { MenuItem, SubMenu } from 'react-pro-sidebar'
import { FaUserAlt } from 'react-icons/fa'

const ClientPart = ({ navigate }) => {
	return (
		<SubMenu title="Clients" icon={<FaUserAlt />}>
			<MenuItem onClick={() => navigate('/customers')}>
				Liste des clients
			</MenuItem>
			<MenuItem onClick={() => navigate('/customerAdd')}>
				Ajouter un client
			</MenuItem>
		</SubMenu>
	)
}

export default ClientPart
