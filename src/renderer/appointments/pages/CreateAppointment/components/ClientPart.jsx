import { Box } from '@mui/material'
import { FormControl } from 'react-bootstrap'
import { BtnGeneral } from '../../../../globalComponents'
import { useState } from 'react'
import { searchClient } from '../../../../services/Client'

const ClientPart = ({ token, register, errors, setValue }) => {
	const [clientsShown, setClientsShown] = useState([])
	const [clientSelected, setClientSelected] = useState()

	const handleClientSearch = () => {
		searchClient(token, document.querySelector('#clientSearch').value)
			.then((res) => {
				let clientSelectedInList = false
				res.datas.forEach((client) => {
					if (client._id === clientSelected) {
						clientSelectedInList = true
					}
				})
				if (!clientSelectedInList) {
					setClientSelected()
				}
				setClientsShown(res.datas)
			})
			.catch((err) => {
				console.log(err)
			})
	}

	const handleClientPick = (clientId) => {
		setClientSelected(clientId)
		setValue('client', clientId)
	}

	return (
		<>
			<Box className="appointmentFormPart">
				<h2>Ajouter un client</h2>
				<Box className="d-flex">
					<FormControl id="clientSearch" placeholder="Rechercher" />
					<BtnGeneral
						type="button"
						text="RECHERCHER"
						className="w-auto"
						onClick={handleClientSearch}
					/>
				</Box>
				{clientsShown.map((client) => {
					return (
						<Box
							key={client._id}
							className={`appointmentFormBox${
								clientSelected === client._id ? ' bg-light' : ''
							}`}
							onClick={() => handleClientPick(client._id)}
						>
							<img
								alt={`Avatar de ${client.lastname} ${client.firstname}`}
							/>
							<span className="fw-bold">
								{client.lastname} {client.firstname}
							</span>
						</Box>
					)
				})}
				<input
					defaultValue={''}
					className={`d-none${errors.client ? ' is-invalid' : ''}`}
					{...register('client', {
						required: 'Vous devez indiquer un Client..'
					})}
				/>
				{errors?.client && (
					<span className="invalid-feedback fw-bold text-center">
						{errors.client.message}
					</span>
				)}
			</Box>
		</>
	)
}

export default ClientPart