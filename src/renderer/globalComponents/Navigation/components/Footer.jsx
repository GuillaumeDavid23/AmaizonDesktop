import { IconButton, Button, Tooltip } from '@mui/material'
import { SidebarFooter } from 'react-pro-sidebar'
import { FaDoorOpen, FaQuestion } from 'react-icons/fa'
import { useAuth } from '../../../hooks'

const Footer = ({ collapsed, navigate }) => {
	const { handleLogout } = useAuth()

	return (
		<SidebarFooter className="text-center d-flex flex-column p-3 justify-content-center align-items-center">
			<Tooltip title="Aide" placement="right">
				<IconButton
					sx={{ color: '#2e3a43' }}
					aria-label="help button"
					component="span"
					className="mb-3"
					onClick={() => navigate('/helps')}
				>
					<FaQuestion />
				</IconButton>
			</Tooltip>
			<Button
				variant="outlined"
				className="logout"
				hidden={collapsed}
				onClick={handleLogout}
				style={{ width: '75%' }}
			>
				DECONNEXION
			</Button>
			<IconButton
				sx={{ color: '#2e3a43' }}
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
