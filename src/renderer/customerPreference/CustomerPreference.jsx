import React from "react";

import Box from "@mui/material/Box";
import { AnimatedPage } from "../globalComponents";
import Title from '../globalComponents/Title/Title'
import PreferenceForm from './components/PreferenceForm'
import './CustomerPreference.css'
const CustomerPreference = () => {
	return (
		<AnimatedPage>
			<Box
				className="w-100 d-flex align-items-center"
				style={{ height: '10%' }}
			>
				
				<Title text="Préférence client" variant="h5" />
			</Box>
			<Box className="w-100" style={{ height: '90%' }}>
				<PreferenceForm />
			</Box>
		</AnimatedPage>
	)
}

export default CustomerPreference
