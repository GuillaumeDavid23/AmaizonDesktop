import { Button } from 'react-bootstrap'
import './BtnGeneral.css'
//This components is for create search forms
const BtnGeneral = (props) => {
	return (
		<Button
			type={props.type}
			className={`btn-general ${props.className}`}
			variant="primary"
			disabled={props.disabled}
			onClick={props.onClick}
		>
			{props.text}
		</Button>
	)
}

export default BtnGeneral
