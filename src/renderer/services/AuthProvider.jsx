import { useNavigate, useLocation } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'
import { sleep } from '../../utils/funcs'
import React from 'react'
import { checkBearer, checkRefreshToken } from './Client'

const AuthProvider = ({ children }) => {
	const navigate = useNavigate()
	const location = useLocation()
	const [authToken, setAuthToken] = React.useState(
		localStorage.getItem('REACT_TOKEN_AUTH_AMAIZON')
			? JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_AMAIZON'))
			: null
	)

	const handleLogin = async (body) => {
		try {
			// Set fetching to true
			// dispatch({ type: actions.SET_FETCHING, payload: true });

			// Wait a little second
			await sleep(1000)

			// Do Fetch
			fetch(`${window.electron.url}/api/user/loginAgent`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				},
				body
			})
				.then((response) => {
					return response.json()
				})
				.then((response) => {
					if (response.status_code === 200) {
						localStorage.setItem(
							'REACT_TOKEN_AUTH_AMAIZON',
							JSON.stringify(response.token)
						)
						setAuthToken(response.token)
						localStorage.setItem(
							'REMEMBER_ME',
							JSON.stringify(response.data.email)
						)

						if (response.message === 'Utilisateur connecté !') {
							const to = location.state?.from?.pathname || '/home'
							navigate(to)
						}
					} else {
						// Set error
					}
				})
		} catch (error) {
			console.log(error)
		}
	}

	const handleLogout = () => {
		localStorage.removeItem('REACT_TOKEN_AUTH_AMAIZON')
		navigate('/login')
		console.log('Vous avez été déconnecté.')
	}

	const verifyToken = async () => {
		try {
			const responseCheckAuth = await checkBearer(authToken)
			
			if (responseCheckAuth.status_code !== 200 ) {
				localStorage.removeItem('REACT_TOKEN_AUTH_AMAIZON')
				setAuthToken(null)
			} 
		} catch (error) {
			localStorage.removeItem('REACT_TOKEN_AUTH_AMAIZON')
			setAuthToken(null)
		}
	}

	const value = {
		handleLogin,
		handleLogout,
		authToken,
		verifyToken
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
