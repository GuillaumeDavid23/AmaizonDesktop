// React import
import React from 'react'

// Bootstrap Design imports
import { Row, Col } from 'react-bootstrap'

// React Router import

// CSS import
import '../AgentDetails.css'
import { FaUser } from 'react-icons/fa'
import { BtnGeneral } from '../../../../globalComponents'

const CustomerItem = ({customer}) => {

	const callNewWindowForCustomer = React.useCallback((customerId) => {
		window.electron.send('showCustomerDetailWindow', customerId)
	}, [])

	return (
		<Row
			style={{
				backgroundColor: '#143642',
				marginBottom: '20px',
				height: '70px',
				borderRadius: '20px',
				alignItems: 'center',
				paddingRight: '10px',
				color: 'white'
			}}
		>
			<Col>
				<FaUser />
			</Col>
			<Col>
				{customer.firstname} {customer.lastname}
			</Col>
			<Col>
				<BtnGeneral
					text="Voir la fiche"
					onClick={() => callNewWindowForCustomer(customer._id)}
				/>
			</Col>
		</Row>
	)
}

export default CustomerItem
