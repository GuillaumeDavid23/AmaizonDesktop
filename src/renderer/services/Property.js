/**
 * Will retrieve all existing property
 * @param {String} userToken User API Access Token
 * @returns {Promise}
 */
const getAllProperties = async (token) => {
	return fetch(`${window.electron.url}/api/property`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: 'bearer ' + token
		}
	})
		.then((response) => {
			// If 2xx
			if (response.ok) {
				// Return Promise to handle
				return response.json()
			}

			// Return Promise Rejection
			return Promise.reject(`Erreur - Code ${response.status}`)
		})
		.catch((error) => {
			// If error is a Promise
			if (typeof (error, Promise)) {
				// Propagate Promise rejection
				throw error
			}

			// return new Promise Rejection
			return Promise.reject("L'API ne semble pas être disponible")
		})
}

/**
 * Will retrieve one existing property
 * @param {String} userToken User API Access Token
 * @returns {Promise}
 */
const getOneProperty = async (userToken, propertyId) => {
	return fetch(`${window.electron.url}/api/property/${propertyId}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${userToken}`,
			Accept: 'application/json',
			'Content-Type': 'application/json'
		}
	})
		.then((response) => {
			// If 2xx
			if (response.ok) {
				// Return Promise to handle
				return response.json()
			}

			// Return Promise Rejection
			return Promise.reject(`Erreur - Code ${response.status}`)
		})
		.catch((error) => {
			// If error is a Promise
			if (typeof (error, Promise)) {
				// Propagate Promise rejection
				throw error
			}

			// return new Promise Rejection
			return Promise.reject("L'API ne semble pas être disponible")
		})
}

const createProperty = async (data, userToken) => {
	// Returning new Promise
	return new Promise((resolve, reject) => {
		// Fetching API
		fetch(`${window.electron.url}/api/property`, {
			method: 'POST',
			headers: {
				// Accept: 'multipart/form-data',
				// 'Content-Type': 'multipart/form-data',
				Authorization: 'bearer ' + userToken
			},
			body: data
		})
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

const updateProperty = async (data, userToken, propertyId) => {
	// Returning new Promise
	return new Promise((resolve, reject) => {
		// Fetching API
		fetch(`${window.electron.url}/api/property/${propertyId}`, {
			method: 'PUT',
			headers: {
				// Accept: 'multipart/form-data',
				// 'Content-Type': 'multipart/form-data',
				Authorization: 'bearer ' + userToken
			},
			body: data
		})
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

const searchProperties = async (data, authToken) => {
	// Returning new Promise
	return new Promise((resolve, reject) => {
		// Fetching API
		fetch(`${window.electron.url}/api/property/searchProperties`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				Authorization: 'bearer ' + authToken
			},
			body: JSON.stringify(data)
		})
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

const changeDispo = (propertyId, userToken) => {
	// Returning new Promise
	return new Promise((resolve, reject) => {
		// Fetching API
		fetch(`${window.electron.url}/api/property/dispo/${propertyId}`, {
			method: 'PATCH',
			headers: {
				// Accept: 'multipart/form-data',
				// 'Content-Type': 'multipart/form-data',
				Authorization: 'bearer ' + userToken
			}
		})
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

export {
	getAllProperties,
	getOneProperty,
	createProperty,
	updateProperty,
	searchProperties,
	changeDispo,
}
