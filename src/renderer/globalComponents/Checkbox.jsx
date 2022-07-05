const CheckBox = ({ id, className, onChange }) => {
	return (
		<label className={'switch ' + (className ? className : '')}>
			<input type="checkbox" id={id} onChange={onChange} />
			<span className="slider round"></span>
		</label>
	)
}

export default CheckBox
