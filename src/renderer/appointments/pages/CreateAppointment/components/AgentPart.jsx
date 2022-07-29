import { Box } from '@mui/material'
import { useState, useEffect } from 'react'
import { getAgents } from '../../../../services'
import { strRandom } from '../../../../../utils/funcs'

const AgentPart = ({
	register,
	errors,
	setValue,
	schedule,
	getAgentSchedule
}) => {
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
		setValue('agent', agentId)
		// Affichage de l'agent:
		let agentToShown = agents.filter((agent) => agent._id === agentId)
		setAgentShown(agentToShown[0])

		getAgentSchedule()
	}

	let availableArray = [
		'09h00',
		'09h30',
		'10h00',
		'10h30',
		'11h00',
		'11h30',
		'12h00',
		'12h30',
		'13h00',
		'13h30',
		'14h00',
		'14h30',
		'15h00',
		'15h30',
		'16h00',
		'16h30',
		'17h00',
		'17h30',
		'18h00',
		'18h30'
	]

	return (
		<Box className="appointmentFormPart flex-column justify-content-around">
			<Box>
				<h2>Ajouter un agent</h2>
				<select
					className="form-select"
					{...register('agent', {
						required: 'Vous devez indiquer un Agent..'
					})}
					style={{ height: '60px' }}
					onChange={(e) => {
						handleAgentPick(e.target.value)
					}}
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
			</Box>
			{agentShown && (
				<Box
					key={agentShown._id}
					className="appointmentFormBox bg-light"
				>
					<img
						src={`${window.electron.url}/avatar/${
							agentShown._id
						}.png?v=${strRandom(10)}`}
						alt={`Avatar de ${agentShown.lastname} ${agentShown.firstname}`}
						className="w-25 me-3"
					/>
					<span className="fw-bold">
						{agentShown.lastname} {agentShown.firstname}
					</span>
				</Box>
			)}
			{schedule && (
				<Box id="agentSchedule" className="d-flex">
					{availableArray.map((hour) => {
						return (
							<Box
								key={hour}
								className={`border border-black ${
									schedule.includes(hour)
										? 'bg-info'
										: 'bg-danger'
								}`}
							>
								{hour}
							</Box>
						)
					})}
				</Box>
			)}
		</Box>
	)
}

export default AgentPart
