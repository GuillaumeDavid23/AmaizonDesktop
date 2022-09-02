import { Box, Typography } from '@mui/material'
import Moment from 'react-moment'
import moment from 'moment'
import './ListAppoint.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { FaCarSide, FaHome } from 'react-icons/fa'

const ListAppoint = ({ data, title, date }) => {
	let navigate = useNavigate()
	// let location = useLocation()

	function List({ list }) {
		let listItems = []
		for (let index = 8; index <= 17; index++) {
			let findAppoint1 = false,
				findAppoint2 = false
			list.forEach((appoint) => {
				if (
					moment(appoint.dateBegin).format('DD-MM-YYYY') ===
					date.format('DD-MM-YYYY')
				) {
					if (
						index.toString() ===
							moment(appoint.dateBegin).format('HH') &&
						moment(appoint.dateBegin).format('mm') !== '30'
					) {
						let html = (
							<div
								className="appointItem"
								style={{ cursor: 'pointer' }}
								key={appoint._id}
								onClick={() =>
									navigate('/createAppointment', {
										state: { id: appoint._id }
									})
								}
							>
								<div className="appointTime">
									<Moment format="HH">
										{appoint.dateBegin}
									</Moment>
									h
								</div>
								<div className="appointDesc d-flex justify-content-around align-items-center">
									<div>
										<div>Rendez vous avec :</div>
										<div>
											{appoint.buyer.lastname}{' '}
											{appoint.buyer.firstname}
										</div>
									</div>
									{appoint.outdoor ? (
										<FaCarSide size={25} />
									) : (
										<FaHome size={25} />
									)}
								</div>
							</div>
						)
						findAppoint1 = true
						listItems.push(html)
						return
					} else if (
						index.toString() + ':30' ===
						moment(appoint.dateBegin).format('HH:mm')
					) {
						let html = (
							<div
								className="appointItem"
								style={{ cursor: 'pointer' }}
								key={appoint._id}
								onClick={() =>
									navigate('/createAppointment', {
										state: { id: appoint._id }
									})
								}
							>
								<div className="appointTime">
									<Moment format="HH:mm">
										{appoint.dateBegin}
									</Moment>
								</div>
								<div className="appointDesc">
									<div>Rendez vous avec :</div>
									<div>
										{appoint.buyer.lastname}{' '}
										{appoint.buyer.firstname}
									</div>
								</div>
							</div>
						)
						findAppoint2 = true
						listItems.push(html)
						return
					}
				}
			})
			if (!findAppoint1 || !findAppoint2) {
				let html
				if (!findAppoint1 && !findAppoint2) {
					html = (
						<>
							<div
								className="appointItem"
								key={index * Math.random()}
							>
								<div className="appointTime">{index}h</div>
								<div className="appointDesc"></div>
							</div>
							<div
								className="appointItem"
								key={index * Math.random()}
							>
								<div className="appointTime">{index}:30</div>
								<div className="appointDesc"></div>
							</div>
						</>
					)
				} else if (findAppoint1 && !findAppoint2) {
					html = (
						<div
							className="appointItem"
							key={index * Math.random()}
						>
							<div className="appointTime">{index}:30</div>
							<div className="appointDesc"></div>
						</div>
					)
				} else {
					html = (
						<div
							className="appointItem"
							key={index * Math.random()}
						>
							<div className="appointTime">{index}h</div>
							<div className="appointDesc"></div>
						</div>
					)
				}
				listItems.push(html)
			}
		}
		return listItems
	}
	return (
		<Box className="appointBox">
			<Box className="appointBoxTitle">
				<Typography variant="h5" component="div" className="">
					{title}
				</Typography>
			</Box>
			<Box className="appointBoxList">
				<List list={data} />
			</Box>
		</Box>
	)
}

export default ListAppoint
