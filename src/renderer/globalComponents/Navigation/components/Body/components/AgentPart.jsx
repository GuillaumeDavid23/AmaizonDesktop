import { MenuItem, SubMenu } from 'react-pro-sidebar'
import { FaUserAlt } from 'react-icons/fa'

const AgentPart = ({ navigate }) => {
	return (
		<SubMenu title="Agents" icon={<FaUserAlt />}>
			<MenuItem onClick={() => navigate('/agents')}>
				Liste des agents
			</MenuItem>
			<MenuItem onClick={() => navigate('/createAgent')}>
				Ajouter un agent
			</MenuItem>
		</SubMenu>
	)
}

export default AgentPart
