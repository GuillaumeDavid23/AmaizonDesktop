import React from 'react'
import { Image } from 'react-bootstrap'
import './InputFile.css'
//This components is for create search forms
const InputFile = ({register, state}) => {

	const [drag, setDrag] = React.useState(false)
	const [filePath, setFilePath] = React.useState({})
	const [file, setFile] = React.useState({})

	const reader = new FileReader()

	function previewFile(event) {
		setFile(event.target.files[0])
		reader.addEventListener('load', () => {
			setFilePath(reader.result)
		})
		if (event.target.files[0]) {
			reader.readAsDataURL(event.target.files[0])
		}
	}

	return (
		<div className={`file-drop-area ${drag ? 'is-active' : ''}`}>
			<span className="fake-btn">Choix photo du client</span>
			<span className="file-msg">
				{file?.name ? file.name : 'ou glissez içi'}
			</span>
			<input
				className="file-input"
				type="file"
				{...register('photo', {
					required: !state ? 'Vous devez ajouter une photo.' : false
				})}
				onDragEnter={() => setDrag(true)}
				onClick={() => setDrag(true)}
				onFocus={() => setDrag(true)}
				onDragLeave={() => setDrag(false)}
				onBlur={() => setDrag(false)}
				onDrop={() => setDrag(false)}
				onChange={(e) => previewFile(e)}
			/>
			<div className="file-img">
				<Image fluid src={filePath} />
			</div>
		</div>
	)
}

export default InputFile
