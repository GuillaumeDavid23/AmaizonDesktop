// Agent:
import {
	getAgent,
	getAgents,
	updateAgent,
	createAgent,
	pushAgentAvatar,
	getAgentAvailabilities
} from './Agent'

// Appointment:
import {
	createAppointment,
	getAppointment,
	getAppointments,
	updateAppointment,
	getAllAppointmentsForAnAgent
} from './Appointment'

// AuthProvider:
import AuthProvider from './AuthProvider'

// Client:
import {
	getClient,
	updateClient,
	createClient,
	searchClient,
	createSeller,
	getSellerForOneProperty
} from './Client'

// Property:
import {
	getAllProperties,
	getOneProperty,
	createProperty,
	updateProperty
} from './Property'

export {
	getAgent,
	getAgents,
	updateAgent,
	createAgent,
	pushAgentAvatar,
	getAgentAvailabilities,
	createAppointment,
	getAppointment,
	getAppointments,
	updateAppointment,
	getAllAppointmentsForAnAgent,
	AuthProvider,
	getClient,
	updateClient,
	createClient,
	searchClient,
	createSeller,
	getSellerForOneProperty,
	getAllProperties,
	getOneProperty,
	createProperty,
	updateProperty
}
