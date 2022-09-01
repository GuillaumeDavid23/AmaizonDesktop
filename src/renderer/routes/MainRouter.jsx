// Auth import
import AuthProvider from '../services/AuthProvider'

// Nav imports
import { Routes, Route } from 'react-router-dom'
import PrivateRoute from '../routes/PrivateRoutes'
import PrivateMultiWindowRoutes from '../routes/PrivateMultiWindowRoutes'

// View imports
import Login from '../login/Login'
import Home from '../home/Home'
import Customers from '../customers/Customers'
import Announces from '../announces/Announces'
import Agents from '../agents/Agents'
import CreateAgent from '../agents/create/CreateAgent'
import CreateAnnounce from '../createAnnounce/CreateAnnounce'
import SingleAnnounce from '../announces/single/SingleAnnounce'
import CustomerAdd from '../customerAdd/CustomerAdd'
import { CustomerDetails } from '../customers/components'
import CustomerPreference from '../customerPreference/CustomerPreference'
import Inventory from '../inventory/Inventory'
import Appointments from '../appointments/Appointments'
import CreateAppointment from '../appointments/pages/CreateAppointment/CreateAppointment'
import AgentDetails from '../agents/components/agentDetails/AgentDetails'

const MainRouter = () => {
	return (
		<AuthProvider>
			<Routes>
				{/* Initial Private Route = Home */}
				<Route
					index
					element={
						<PrivateRoute>
							<Home />
						</PrivateRoute>
					}
				/>

				{/* Public Route Login  */}
				<Route path="/login" element={<Login />} />

				{/* Private Route Home*/}
				<Route
					path="/home"
					element={
						<PrivateRoute>
							<Home />
						</PrivateRoute>
					}
				/>

				{/* Private Route Customers*/}
				<Route
					path="/customers"
					element={
						<PrivateRoute>
							<Customers />
						</PrivateRoute>
					}
				/>

				{/* Private Route Customers Single*/}
				<Route
					path="/customers/:id"
					element={
						<PrivateMultiWindowRoutes>
							<CustomerDetails />
						</PrivateMultiWindowRoutes>
					}
				/>

				{/* Private Route Add customer*/}
				<Route
					path="/customerAdd"
					element={
						<PrivateRoute>
							<CustomerAdd />
						</PrivateRoute>
					}
				/>

				{/* Private Route Announces*/}
				<Route
					path="/announces"
					element={
						<PrivateRoute>
							<Announces />
						</PrivateRoute>
					}
				/>

				{/* Private Route Create announce*/}
				<Route
					path="/createAnnounce"
					element={
						<PrivateRoute>
							<CreateAnnounce />
						</PrivateRoute>
					}
				/>

				{/* Private Route Single announce*/}
				<Route
					path="/singleAnnounce"
					element={
						<PrivateRoute>
							<SingleAnnounce />
						</PrivateRoute>
					}
				/>

				{/* Private Route Agents*/}
				<Route
					path="/agents"
					element={
						<PrivateRoute>
							<Agents />
						</PrivateRoute>
					}
				/>

				{/* Private Route Agents Single*/}
				<Route
					path="/agent/:id"
					element={
						<PrivateMultiWindowRoutes>
							<AgentDetails />
						</PrivateMultiWindowRoutes>
					}
				/>

				{/* Private Route Create agent*/}
				<Route
					path="/createAgent"
					element={
						<PrivateRoute>
							<CreateAgent />
						</PrivateRoute>
					}
				/>

				{/* Private Route add preference client*/}
				<Route
					path="/customerPreference"
					element={
						<PrivateRoute>
							<CustomerPreference />
						</PrivateRoute>
					}
				/>
				<Route
					path="/appointments"
					element={
						<PrivateRoute>
							<Appointments />
						</PrivateRoute>
					}
				/>

				{/* Private Route list inventory*/}
				<Route
					path="/inventory"
					element={
						<PrivateRoute>
							<Inventory />
						</PrivateRoute>
					}
				/>
				<Route
					path="/createAppointment"
					element={
						<PrivateRoute>
							<CreateAppointment />
						</PrivateRoute>
					}
				/>
			</Routes>
		</AuthProvider>
	)
}

export default MainRouter
