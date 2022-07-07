// React import
import React from 'react'

// Auth import
import AuthProvider from '../services/AuthProvider'

// Nav imports
import { Routes, Route } from 'react-router-dom'
import PrivateRoute from '../routes/PrivateRoutes'
import MenuRoute from '../routes/MenuRoute'

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

				{/* Private Route Create agent*/}
				<Route
					path="/createAgent"
					element={
						<PrivateRoute>
							<CreateAgent />
						</PrivateRoute>
					}
				/>
			</Routes>
		</AuthProvider>
	)
}

export default MainRouter
