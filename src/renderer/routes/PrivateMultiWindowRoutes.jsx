import { Navigate, useLocation } from 'react-router-dom'

import Box from '@mui/material/Box'
import Container from 'react-bootstrap/Container'

const PrivateMultiWindowRoutes = ({ children }) => {
	const authTokens =
		JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_AMAIZON')) || null
	
	const location = useLocation()
	return !authTokens ? (
		<Navigate to="/login" state={{ from: location }} replace />
	) : (
		<Container
			fluid
			className="h-100 p-0"
			style={{ backgroundColor: 'white' }}
		>
			<Box className="h-100 d-flex">
				<Box className="w-100">{children}</Box>
			</Box>
		</Container>
	)
}

export default PrivateMultiWindowRoutes
