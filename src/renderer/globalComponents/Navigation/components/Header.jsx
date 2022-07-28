import { SidebarHeader } from 'react-pro-sidebar'
import { Box, IconButton, TextField } from '@mui/material'
import { Image } from 'react-bootstrap'
import LogoFull from '../../../../assets/images/LogoFull.png'
import { IoMenu } from 'react-icons/io5'

const Header = ({ collapsed, isCollapsed }) => {
	return (
		<SidebarHeader className="text-center pt-3 d-flex flex-column align-items-center">
			<Box
				className={`${
					collapsed ? '' : 'd-flex'
				} justify-content-center align-items-center`}
			>
				<Image src={LogoFull} className="w-75 mb-3" />
				<IconButton
					sx={{ color: '#2e3a43', alignSelf: 'baseline' }}
					aria-label="upload picture"
					component="span"
					onClick={() => isCollapsed(!collapsed)}
				>
					<IoMenu size={30} />
				</IconButton>
			</Box>
			<TextField
				label="Rechercher une annonce"
				variant="outlined"
				className="w-75 mt-3 mb-2 bg-white"
				hidden={collapsed}
			/>
		</SidebarHeader>
	)
}

export default Header
