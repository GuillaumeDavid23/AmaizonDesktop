import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks'
import MenuRoute from './MenuRoute'
const PrivateRoute = ({ children }) => {
	const { authToken, verifyToken } = useAuth()
	const location = useLocation()

	React.useEffect(() => {
		verifyToken()
	}, [location])

	return !authToken ? (
		<Navigate to="/login" state={{ from: location }} replace />
	) : (
		<MenuRoute>{children}</MenuRoute>
	)
}

export default PrivateRoute
