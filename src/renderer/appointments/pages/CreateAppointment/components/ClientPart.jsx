import { Box } from '@mui/material'
import { FormControl } from 'react-bootstrap'
import { BtnGeneral } from '../../../../globalComponents'
import { useState } from 'react'
import { searchClient } from '../../../../services/Client'

const ClientPart = ({ token, register, errors }) => {
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
							className={`d-flex border border-dark p-3 my-2${
								clientSelected === client._id && ' bg-light'
							}`}
							onClick={() => setClientSelected(client._id)}
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
				{errors?.client && (
					<span className="invalid-feedback fw-bold text-center">
						{errors.client.message}
					</span>
				)}
			</Box>
			<input
				value={clientSelected ?? ''}
				className="d-none"
				{...register('client', {
					required: 'Vous devez indiquer un Client..'
				})}
			/>
		</>
	)
}

export default ClientPart
