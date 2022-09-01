import { Box } from '@mui/material'
import { strRandom } from '../../../../../utils/funcs'
import { useState, useEffect } from 'react'
import { catchError } from '../../../../../utils/funcs'
import { getAgents } from '../../../../services'
import { REGSTRING } from '../../../../../utils/regex'

const AgentPart = ({
	register,
	errors,
	schedule,
	setSnackParams,
	getAgentSchedule,
	setValue
}) => {
	let availableArray = [
		[
			'09h00',
			'09h30',
			'10h00',
			'10h30',
			'11h00',
			'11h30',
			'12h00',
			'12h30',
			'13h00',
			'13h30'
		],
		[
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
	]

	// Gestion de la partie agent:
	const [agents, setAgents] = useState([])
	useEffect(() => {
		getAgents()
			.then((res) => {
				setAgents(res.datas)
			})
			.catch(async (err) => {
				setSnackParams(await catchError(err))
			})
	}, [setSnackParams])

	const [agentShown, setAgentShown] = useState()
	const handleAgentPick = (agentId) => {
		// Affichage de l'agent:
		setValue('agent', agentId)
		let agentToShown = agents.filter((agent) => agent._id === agentId)
		setAgentShown(agentToShown[0])

		// Récupération de l'agenda:
		getAgentSchedule()
	}

	return (
		<Box className="appointmentFormPart flex-column justify-content-around">
			<Box>
				<h2>Ajouter un agent</h2>
				<select
					id="agentSearch"
					className={`form-select${
						errors.agent ? ' is-invalid' : ''
					}`}
					{...register('agent', {
						required: 'Vous devez indiquer un Agent..',
						pattern: {
							value: REGSTRING.value,
							message: REGSTRING.message
						}
					})}
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
				<Box id="agentSchedule">
					<Box className="d-flex">
						{availableArray[0].map((hour) => {
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
					<Box className="d-flex justify-content-between">
						{availableArray[1].map((hour) => {
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
				</Box>
			)}
		</Box>
	)
}

export default AgentPart
