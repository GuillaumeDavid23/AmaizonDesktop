import React from 'react'

import PropTypes from 'prop-types'

import { Alert as MuiAlert, Slide, Snackbar } from '@mui/material'

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const SlideTransition = (props) => {
	return <Slide {...props} direction="up" />
}

const useSlideSnack = (props) => {
	const { message, time, severity } = props

	const [visible, setVisible] = React.useState(false)

	const handleOpen = React.useCallback(() => {
		setVisible(true)
	}, [])

	const handleClose = React.useCallback(() => {
		setVisible(false)
	}, [])

	const renderSnack = (
		<Snackbar
			open={visible}
			onClose={handleClose}
			autoHideDuration={time}
			TransitionComponent={SlideTransition}
			key={Slide.name}
		>
			<Alert
				onClose={handleClose}
				severity={severity}
				sx={{ width: '100%' }}
			>
				{message}
			</Alert>
		</Snackbar>
	)

	return { handleOpen, handleClose, renderSnack }
}

useSlideSnack.propsTypes = {
	message: PropTypes.string,
	time: PropTypes.number,
	severity: PropTypes.string
}

useSlideSnack.defaultValue = {
	message: 'I love snacks!',
	time: 6000,
	severity: 'info'
}

export default useSlideSnack
