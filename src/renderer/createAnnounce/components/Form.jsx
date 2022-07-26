// Pages imports:
import Page1 from './Page1'
import Page2 from './Page2'
import Page3 from './Page3'
import Page4 from './Page4'
import Page5 from './Page5'
import Page6 from './Page6'
import Page7 from './Page7'
import Page8 from './Page8'

const Form = ({
	handleSubmit,
	onSubmit,
	visiblePage,
	control,
	errors,
	handleNavigation,
	token,
	checked,
	setChecked,
	register,
	datasToDisplay,
	seller,
	datasToValidate,
	handleValidation
}) => {
	return (
		<form
			className={`d-flex justify-content-center mt-5${
				visiblePage !== 8 ? '' : ' h-75'
			}`}
			onSubmit={handleSubmit(onSubmit)}
		>
			<Page1
				visiblePage={visiblePage}
				control={control}
				errors={errors}
				handleNavigation={handleNavigation}
			/>
			<Page2
				visiblePage={visiblePage}
				control={control}
				errors={errors}
				handleNavigation={handleNavigation}
			/>
			<Page3
				visiblePage={visiblePage}
				control={control}
				errors={errors}
				handleNavigation={handleNavigation}
			/>
			<Page4
				visiblePage={visiblePage}
				control={control}
				errors={errors}
				handleNavigation={handleNavigation}
			/>
			<Page5
				visiblePage={visiblePage}
				control={control}
				errors={errors}
				handleNavigation={handleNavigation}
			/>
			<Page6
				visiblePage={visiblePage}
				handleNavigation={handleNavigation}
				errors={errors}
				token={token}
				checked={checked}
				setChecked={setChecked}
			/>
			<Page7
				visiblePage={visiblePage}
				handleNavigation={handleNavigation}
				register={register}
				errors={errors}
			/>
			<Page8
				visiblePage={visiblePage}
				handleNavigation={handleNavigation}
				datasToDisplay={datasToDisplay}
				seller={seller}
				datasToValidate={datasToValidate}
				handleValidation={handleValidation}
			/>
		</form>
	)
}

export default Form
