import React from 'react'

const RevImage = ({images}) => {
	let num = 0
	return (
		<div className={'revimager'} >
			<div className="image">
				<img src={images[num]} alt=""/>
			</div>
			<div className="directioners">
				<img src="images/arrow-icon.png" alt=""/>
			</div>
			<div className="directioners">
				<img src="images/arrow-icon.png" alt=""/>
			</div>
		</div>
	)
}

export default RevImage