// React import
import React from 'react'

// PropTypes validation import
import PropTypes from 'prop-types'

// MUI Design imports
import { Box } from '@mui/material'
// import {Box, Typography} from '@mui/material'

// Bootstrap Design imports
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'

const CustomerDetails = ({ user, handleModalClose }) => {
	return (
		<>
			{/* <Modal.Header closeButton>
				<Modal.Title>Informations Utilisateur</Modal.Title>
			</Modal.Header> */}
			<Modal.Body style={{ height: '700px' }}>
				<Container>
					<Row>
						{/* Espace 1: PP + ActionButton "Modifier"/"RDV" */}
						<Col
							style={{
								display: 'flex',
								justifyContent: 'center'
							}}
						>
							<Container
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between'
								}}
							>
								<Row>
									<Col
										style={{
											display: 'flex',
											justifyContent: 'center'
										}}
									>
										<Box
											style={{
												height: '50px',
												width: '50px',
												backgroundColor: 'blue'
											}}
										></Box>
									</Col>
								</Row>
								<Row>
									<Col>
										<Button>ActionButton</Button>
									</Col>
									<Col>
										<Button>ActionButton</Button>
									</Col>
								</Row>
							</Container>
						</Col>
						<Col
							style={{
								display: 'flex',
								justifyContent: 'center'
							}}
						>
							Espace 2
						</Col>
						<Col
							style={{
								display: 'flex',
								justifyContent: 'center'
							}}
						>
							Espace 3
						</Col>
					</Row>
				</Container>
			</Modal.Body>
			{/* <Modal.Footer>
				<Button variant="secondary" onClick={handleModalClose}>
					Close
				</Button>
				<Button variant="primary" onClick={handleModalClose}>
					Save Changes
				</Button>
			</Modal.Footer> */}
		</>
	)
}

CustomerDetails.propTypes = {
	user: PropTypes.object.isRequired,
	handleModalClose: PropTypes.func
}

CustomerDetails.defaultProps = {
	user: { name: 'John Doe' },
	handleModalClose: () => console.error('handleModalClose callback not set!')
}

export default CustomerDetails
