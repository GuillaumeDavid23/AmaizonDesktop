import React from 'react'

import { useAuth } from '../../hooks'
import { useNavigate } from 'react-router-dom'

import { TextField, IconButton, Box, Button } from '@mui/material'
import { Image } from 'react-bootstrap'
import LogoFull from '../../../assets/images/LogoFull.png'
import {
	ProSidebar,
	Menu,
	MenuItem,
	SubMenu,
	SidebarHeader,
	SidebarContent,
	SidebarFooter
} from 'react-pro-sidebar'
import {
	FaGem,
	FaUserAlt,
	FaBuilding,
	FaPhoneSquareAlt,
	FaDoorOpen
} from 'react-icons/fa'
import { IoHome, IoBook, IoMenu } from 'react-icons/io5'
import './Navigation.scss'

const Navigation = (props) => {
	const [collapsed, isCollapsed] = React.useState(false)

	const { handleLogout } = useAuth()
	const navigate = useNavigate()

	return (
		<ProSidebar collapsed={collapsed}>
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
			<SidebarContent>
				<Menu iconShape="circle">
					<MenuItem
						icon={<IoHome />}
						onClick={() => navigate('/home')}
					>
						Accueil
					</MenuItem>
					<SubMenu title="Clients" icon={<FaUserAlt />}>
						<MenuItem onClick={() => navigate('/customers')}>
							Liste des clients
						</MenuItem>
						<MenuItem>Ajouter un client</MenuItem>
					</SubMenu>
					<SubMenu title="Annonces" icon={<FaBuilding />}>
						<MenuItem onClick={() => navigate('/announces')}>
							Liste des annonces
						</MenuItem>
						<MenuItem onClick={() => navigate('/createAnnounce')}>
							Ajouter une annonce
						</MenuItem>
						<MenuItem>Faire une transaction</MenuItem>
					</SubMenu>
					<MenuItem icon={<FaPhoneSquareAlt />}>Annuaire</MenuItem>
					<SubMenu title="Etat des lieux" icon={<IoBook />}>
						<MenuItem>Liste des EDL</MenuItem>
						<MenuItem>Ajouter un EDL</MenuItem>
					</SubMenu>
					<MenuItem icon={<FaGem />}>Statistiques</MenuItem>
				</Menu>
			</SidebarContent>
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
		</ProSidebar>
	)
}

export default Navigation
