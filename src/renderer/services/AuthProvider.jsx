import { useNavigate, useLocation } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'
import { sleep } from '../../utils/funcs'

const AuthProvider = ({ children }) => {
	const navigate = useNavigate()
	const location = useLocation()

	const handleLogin = async (body) => {
		try {
			// Set fetching to true
			// dispatch({ type: actions.SET_FETCHING, payload: true });

			// Wait a little second
			await sleep(1000)

			// Do Fetch
			fetch(`${window.electron.url}/api/user/login`, {
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
						if (response.refreshToken) {
							localStorage.setItem(
								'REACT_REFRESH_TOKEN_AUTH_AMAIZON',
								JSON.stringify(response.refreshToken)
							)
						}

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
		localStorage.clear()
		navigate('/login')
		console.log('Vous avez été déconnecté.')
	}

	const value = {
		handleLogin,
		handleLogout
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
