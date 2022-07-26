import { FaBuilding } from 'react-icons/fa'
import { MenuItem, SubMenu } from 'react-pro-sidebar'

const AnnouncePart = ({ navigate }) => {
	return (
		<SubMenu title="Annonces" icon={<FaBuilding />}>
			<MenuItem onClick={() => navigate('/announces')}>
				Liste des annonces
			</MenuItem>
			<MenuItem onClick={() => navigate('/createAnnounce')}>
				Ajouter une annonce
			</MenuItem>
			<MenuItem>Faire une transaction</MenuItem>
		</SubMenu>
	)
}

export default AnnouncePart
