import { FaCalendarCheck } from 'react-icons/fa'
import { MenuItem, SubMenu } from 'react-pro-sidebar'

const AppointmentPart = ({ navigate }) => {
	return (
		<SubMenu title="Rendez-vous" icon={<FaCalendarCheck />}>
			<MenuItem onClick={() => navigate('/appointments')}>
				Liste des rendez-vous
			</MenuItem>
			<MenuItem onClick={() => navigate('/createAppointment')}>
				Ajouter un rendez-vous
			</MenuItem>
		</SubMenu>
	)
}

export default AppointmentPart
