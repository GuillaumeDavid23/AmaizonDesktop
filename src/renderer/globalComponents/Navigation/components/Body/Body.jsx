import { Menu, SidebarContent } from 'react-pro-sidebar'
import {
	AgentPart,
	AnnouncePart,
	AppointmentPart,
	ClientPart,
	HomePart,
	InventoryPart,
	PhoneBookPart,
	StatsPart
} from './components'

const Body = ({ navigate }) => {
	return (
		<SidebarContent>
			<Menu iconShape="circle">
				<HomePart navigate={navigate} />
				<AgentPart navigate={navigate} />
				<ClientPart navigate={navigate} />
				<AnnouncePart navigate={navigate} />
				<PhoneBookPart navigate={navigate} />
				<AppointmentPart navigate={navigate} />
				<InventoryPart navigate={navigate} />
				<StatsPart navigate={navigate} />
			</Menu>
		</SidebarContent>
	)
}

export default Body
