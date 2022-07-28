import { Box } from '@mui/material'
import { useState, useEffect } from 'react'
import { getAgents } from '../../../../services/Agent'

const AgentPart = ({ register, errors }) => {
	// Récupération initiale des agents:
	const [agents, setAgents] = useState([])
	useEffect(() => {
		getAgents()
			.then((res) => {
				setAgents(res.datas)
			})
			.catch((err) => {
				console.log(err)
			})
	}, [])

	const [agentShown, setAgentShown] = useState()
	const handleAgentPick = (agentId) => {
		let agentToShown = agents.filter((agent) => agent._id === agentId)
		setAgentShown(agentToShown[0])
	}

	return (
		<>
			<Box className="appointmentFormPart">
				<h2>Ajouter un agent</h2>
				<select
					className="form-select"
					{...register('agent', {
						required: 'Vous devez indiquer un Agent..'
					})}
					onChange={(e) => handleAgentPick(e.target.value)}
				>
					<option value="">Sélectionner un agent</option>
					{agents.map((agent) => {
						let { _id, lastname, firstname } = agent
						return (
							<option key={_id} value={_id}>
								{lastname} {firstname}
							</option>
						)
					})}
				</select>
				{errors?.agent && (
					<span className="invalid-feedback fw-bold text-center">
						{errors.agent.message}
					</span>
				)}

				{agentShown && (
					<Box
						key={agentShown._id}
						className="appointmentFormBox bg-light"
					>
						<img
							alt={`Avatar de ${agentShown.lastname} ${agentShown.firstname}`}
						/>
						<span className="fw-bold">
							{agentShown.lastname} {agentShown.firstname}
						</span>
					</Box>
				)}
			</Box>
		</>
	)
}

export default AgentPart
