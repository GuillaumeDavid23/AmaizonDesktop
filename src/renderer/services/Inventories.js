const getInventories = (userToken) => {
	// Returning new Promise
	return new Promise((resolve, reject) => {
		// Fetching API
		fetch(`${window.electron.url}/api/inventory`, {
			headers: {
				Authorization: `bearer ${userToken}`
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
	getInventories
}
