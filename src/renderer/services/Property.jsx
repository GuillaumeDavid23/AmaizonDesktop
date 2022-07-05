/**
 * Will retrieve all existing property
 * @param {String} userToken User API Access Token
 * @returns {Promise}
 */
const getAllProperties = async (userToken) => {
	return fetch(`${window.electron.url}/api/property`, {
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

export { getAllProperties, createProperty }
