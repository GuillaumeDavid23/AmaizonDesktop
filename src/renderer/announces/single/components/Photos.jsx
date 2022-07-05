import { Carousel } from 'react-bootstrap'

const Photos = (props) => {
	if (props.data === null) {
		return (
			<Carousel>
				<Carousel.Item>
					<img
						className="w-100"
						src={require('../../../../assets/images/announceDefault.png')}
						alt="Default slide"
					/>
				</Carousel.Item>
			</Carousel>
		)
	} else {
		return (
			<Carousel >
				{Object.keys(props.data).map((keyImage) => {
					return (
                        <Carousel.Item key={keyImage}>
                            <img
                                className="imgCaroussel"
                                src={
                                    window.electron.url + '/' +
                                    props.data[keyImage]
                                }
                                alt="slide"
                            />
                        </Carousel.Item>
                    );
				})}
			</Carousel>
		)
	}
}

export default Photos
