const getClient = async (id, token) => {
	return fetch(`${window.electron.url}/api/user/${id}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `bearer ${token}`
		}
	})
		.then((response) => {
			return response.json()
		})
		.catch((errors) => console.log(errors))
}

const updateClient = async (id, token, data) => {
	return fetch(`${window.electron.url}/api/user/${id}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `bearer ${token}`
		},
		body: JSON.stringify(data)
	})
		.then((response) => {
			return response.json()
		})
		.catch((errors) => console.log(errors))
}

const createClient = async (token, data) => {
	return fetch(`${window.electron.url}/api/user`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `bearer ${token}`
		},
		body: JSON.stringify(data)
	})
		.then((response) => {
			return response.json()
		})
		.catch((errors) => console.log(errors))
}

const searchClient = async (token, lastname) => {
	return fetch(`${window.electron.url}/api/user/searchClient/${lastname}`, {
		method: 'GET',
		headers: { Authorization: `bearer ${token}` }
	})
		.then((response) => {
			if (response.ok) {
				return response.json()
			}
		})
		.catch((errors) => console.log(errors))
}

const createSeller = async (userId, propertyId, token) => {
	// Returning new Promise
	return new Promise((resolve, reject) => {
		// Fetching API
		fetch(
			`${window.electron.url}/api/user/createSeller/${userId}/${propertyId}`,
			{
				method: 'PUT',
				headers: { Authorization: `bearer ${token}` }
			}
		)
			.then((response) => {
				// If response 2xx
				if (response.ok) {
					// Returning User info
					return resolve(response.json())
				}
				// Else: Returning Error info
				return reject(response.json())
			})
			.catch((err) => {
				// Handling Fetch problems
				return reject({
					message: "L'API ne semble pas être disponible"
				})
			})
	})
}

const getSellerForOneProperty = async (userId, propertyId, token) => {
	// Returning new Promise
	return new Promise((resolve, reject) => {
		// Fetching API
		fetch(
			`${window.electron.url}/api/user/getSellerForOneProperty/${propertyId}`,
			{
				method: 'GET',
				headers: { Authorization: `bearer ${token}` }
			}
		)
			.then((response) => {
				// If response 2xx
				if (response.ok) {
					// Returning User info
					return resolve(response.json())
				}
				// Else: Returning Error info
				return reject(response.json())
			})
			.catch((err) => {
				// Handling Fetch problems
				return reject({
					message: "L'API ne semble pas être disponible"
				})
			})
	})
}

const pushUserAvatar = async (token, data) => {
	return fetch(`${window.electron.url}/api/user/pushUserAvatar`, {
		method: 'POST',
		headers: {
			// Accept: 'application/json',
			// 'Content-Type': 'application/json',
			Authorization: `bearer ${token}`
		},
		// body: JSON.stringify(data)
		body: data
	})
		.then((response) => {
			if (response.ok) {
				return response.json()
			}
		})
		.catch((errors) => console.log(errors))
}

export {
	getClient,
	updateClient,
	createClient,
	searchClient,
	createSeller,
	getSellerForOneProperty,
	pushUserAvatar
}
