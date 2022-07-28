import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import { AnimatedPage } from '../globalComponents'
import Filters from './components/Filters'
import HomeCards from './components/HomeCards/HomeCards'

const Announces = () => {
	const [properties, setProperties] = React.useState([])

	return (
		<AnimatedPage>
			<Container className="h-100">
				<Filters
					setProperties={setProperties}
					properties={properties}
				/>
				<Row
					className="justify-content-center justify-content-lg-center overflow-auto"
				>
					{properties.map((property) => {
						return (
							<Col
								xs="12"
								md="7"
								lg="3"
								key={property._id}
								className="d-flex justify-content-center mb-4"
							>
								<HomeCards propertyDatas={property} />
							</Col>
						)
					})}
				</Row>
			</Container>
		</AnimatedPage>
	)
}

export default Announces
