const createAppointment = async (token, data) => {
	return new Promise((resolve, reject) => {
		fetch(`${window.electron.url}/api/appointment`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `bearer ${token}`
			},
			body: JSON.stringify(data)
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

const getAppointment = async (id, token) => {
	return new Promise((resolve, reject) => {
		fetch(`${window.electron.url}/api/appointment/${id}`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `bearer ${token}`
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

const getAppointments = async (token) => {
	return fetch(`${window.electron.url}/api/appointment`, {
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

const updateAppointment = async (id, token, data) => {
	return new Promise((resolve, reject) => {
		fetch(`${window.electron.url}/api/appointment/${id}`, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `bearer ${token}`
			},
			body: JSON.stringify(data)
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

export { createAppointment, getAppointment, getAppointments, updateAppointment }
