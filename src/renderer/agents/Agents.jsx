import { AnimatedPage } from '../globalComponents'
import { Box } from '@mui/material'
import { useState, useEffect } from 'react'
import { getAgents } from '../services/Agent'

const Agents = () => {
	// Récupération des agents:
	const [agents, setAgents] = useState([])
	useEffect(() => {
		getAgents().then((res) => {
			setAgents(res.datas)
		})
	}, [])

	return (
		<AnimatedPage>
			<Box className="d-flex justify-content-center align-items-center h-100">
				<ul>
					{agents.map((agent) => {
						return (
							<li key={agent._id}>
								{agent.lastname} {agent.firstname}
							</li>
						)
					})}
				</ul>
			</Box>
		</AnimatedPage>
	)
}

export default Agents
