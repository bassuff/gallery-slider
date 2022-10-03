import React from 'react';
import GallerySlider from './GallerySlider/GallerySlider.js';
import Magnifier from './Magnifier/Magnifier.js';

import './App.css';

function App() {
	const galleryList = [
		{url: 'pexels-maria-loznevaya-13828059.jpeg', altText: '13828059'},
		{url: 'pexels-maria-loznevaya-13816113.jpeg', altText: '13816113'},
		{url: 'pexels-maria-loznevaya-13815029.jpeg', altText: '13815029'}
	];
	const options = {img: '1.jpg', width: 300, height: 450, zoomWidth: 500, offset: {vertical: 0, horizontal: 10}};

	return (
		<div className="container text-center">
			<div className="row">
				<div className="col-lg-6 col-md-8 mx-auto">
					<GallerySlider slides={galleryList} />
					{/*<ReactMagnifier options={options} />*/}
				</div>
			</div>
		</div>
	);
}

export default App;
