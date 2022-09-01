import { MenuItem } from 'react-pro-sidebar'
import { FaGem } from 'react-icons/fa'

const StatsPart = ({ navigate }) => {
	return (
		<MenuItem onClick={() => navigate('/stats')} icon={<FaGem />}>
			Statistiques
		</MenuItem>
	)
}

export default StatsPart
