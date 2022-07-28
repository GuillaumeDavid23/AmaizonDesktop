import { IconButton, Button } from '@mui/material'
import { SidebarFooter } from 'react-pro-sidebar'
import { FaDoorOpen } from 'react-icons/fa'
import { useAuth } from '../../../hooks'

const Footer = ({ collapsed }) => {
	const { handleLogout } = useAuth()

	return (
		<SidebarFooter className="text-center pb-4 pt-4">
			<Button
				variant="outlined"
				className="logout"
				hidden={collapsed}
				onClick={handleLogout}
			>
				DECONNEXION
			</Button>
			<IconButton
				sx={{ color: '#2e3a43', alignSelf: 'baseline' }}
				aria-label="disconnect button"
				component="span"
				hidden={!collapsed}
			>
				<FaDoorOpen />
			</IconButton>
		</SidebarFooter>
	)
}

export default Footer
