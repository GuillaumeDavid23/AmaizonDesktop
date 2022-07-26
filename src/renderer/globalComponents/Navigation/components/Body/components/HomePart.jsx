import { MenuItem } from 'react-pro-sidebar'
import { IoHome } from 'react-icons/io5'

const HomePart = ({ navigate }) => {
	return (
		<MenuItem icon={<IoHome />} onClick={() => navigate('/home')}>
			Accueil
		</MenuItem>
	)
}

export default HomePart
