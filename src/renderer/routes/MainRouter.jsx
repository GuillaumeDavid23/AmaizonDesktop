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
import CreateAnnounce from '../createAnnounce/CreateAnnounce'
import SingleAnnounce from '../announces/single/SingleAnnounce'
import CustomerAdd from "../customerAdd/CustomerAdd";

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
			</Routes>
		</AuthProvider>
	)
}

export default MainRouter
