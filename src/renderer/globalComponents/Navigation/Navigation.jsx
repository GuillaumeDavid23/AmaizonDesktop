import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProSidebar } from 'react-pro-sidebar'
import './Navigation.scss'
import { Body, Footer, Header } from './components'

const Navigation = () => {
	const [collapsed, isCollapsed] = useState(false)
	const navigate = useNavigate()

	return (
		<ProSidebar collapsed={collapsed}>
			<Header collapsed={collapsed} isCollapsed={isCollapsed} />
			<Body navigate={navigate} />
			<Footer collapsed={collapsed} navigate={navigate} />
		</ProSidebar>
	)
}

export default Navigation
