const ChartsNbAndTypeOfProperty = async (token) => {
	return new Promise((resolve, reject) => {
		 fetch(window.electron.url + '/api/property/charts', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
					authorization: `bearer ${token}`
				}
			})
			.then((response) => {
				if (response.ok) {
					return resolve(response.json())
				}
				return reject(response.json())
			})
			.catch((err) => {
				return reject({
					message: err.response.message
				})
			})
	})
}


export { ChartsNbAndTypeOfProperty }
