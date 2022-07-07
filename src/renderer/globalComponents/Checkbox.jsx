const CheckBox = ({ id, value, className, onChange }) => {
	return (
		<label className={'switch ' + (className ? className : '')}>
			<input
				type="checkbox"
				checked={value}
				id={id}
				onChange={onChange}
			/>
			<span className="slider round"></span>
		</label>
	)
}

export default CheckBox
