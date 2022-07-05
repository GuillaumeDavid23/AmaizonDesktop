import BtnGeneral from '../../globalComponents/BtnGeneral/BtnGeneral'

const FormNavigation = ({ visiblePage, handleNavigation }) => {
	return (
		<div className="d-flex justify-content-around">
			{visiblePage !== 1 && (
				<BtnGeneral
					type="button"
					text={'Précédent'}
					onClick={() => handleNavigation('previous')}
				/>
			)}
			{visiblePage < 7 && (
				<BtnGeneral
					type="button"
					text={'Suivant'}
					onClick={() => handleNavigation('next')}
				/>
			)}
		</div>
	)
}

export default FormNavigation
