const sleep = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

const strRandom = (o) => {
	var a = 10,
		b = 'abcdefghijklmnopqrstuvwxyz',
		c = '',
		d = 0,
		e = '' + b
	if (o) {
		if (o.startsWithLowerCase) {
			c = b[Math.floor(Math.random() * b.length)]
			d = 1
		}
		if (o.length) {
			a = o.length
		}
		if (o.includeUpperCase) {
			e += b.toUpperCase()
		}
		if (o.includeNumbers) {
			e += '1234567890'
		}
	}
	for (; d < a; d++) {
		c += e[Math.floor(Math.random() * e.length)]
	}
	return c
}

const catchError = async (err) => {
	err = await err
	console.log('errCatch:', err)
	if (err._W) {
		err = err._W
	}
	// Handling rejected Promise
	if (typeof err === 'object') {
		let { message } = err
		// Handling Validation error:
		if (err.status_code === 422) {
			err.errors.forEach((error) => {
				Object.keys(error).forEach((key) => {
					message += '\n-' + error[key]
				})
			})
			return {
				message,
				severity: 'error'
			}
		} else {
			// Handling Classic error:
			return {
				message,
				severity: 'error'
			}
		}
	} else {
		return {
			message: err,
			severity: 'error'
		}
	}
}

export { sleep, strRandom, catchError }
