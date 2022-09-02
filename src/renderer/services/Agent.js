const getAgent = async (id, token) => {
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

const getAgents = async () => {
	return fetch(`${window.electron.url}/api/user/agents`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		}
	})
		.then((response) => {
			return response.json()
		})
		.catch((errors) => console.log(errors))
}

const updateAgent = async (id, token, data) => {
	return fetch(`${window.electron.url}/api/user/agent/${id}`, {
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
				return response.json()
			}
		})
		.catch((errors) => console.log(errors))
}

const createAgent = async (token, data) => {
	return fetch(`${window.electron.url}/api/user/agent`, {
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
				return response.json()
			}
		})
		.catch((errors) => console.log(errors))
}

const pushAgentAvatar = async (token, data) => {
	return fetch(`${window.electron.url}/api/user/pushAgentAvatar`, {
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

const getAgentAvailabilities = async (token, data) => {
	return fetch(`${window.electron.url}/api/user/agentAvailabilities`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `bearer ${token}`
		},
		body: JSON.stringify(data)
	})
		.then((response) => {
			if (response.ok) {
				return response.json()
			}
		})
		.catch((errors) => console.log(errors))
}

export {
	getAgent,
	getAgents,
	updateAgent,
	createAgent,
	pushAgentAvatar,
	getAgentAvailabilities
}
