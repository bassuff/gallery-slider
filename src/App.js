import React from 'react';
import GallerySlider from './GallerySlider/GallerySlider.js';
// import Magnifier from './Magnifier/Magnifier.js';

import './App.css';

function App() {
	const galleryList = [
		{url: 'eugene-golovesov--eOGjaog7h0-unsplash.jpg', altText: '1'},
		{url: 'eugene-golovesov-3o72hSvigbk-unsplash.jpg', altText: '2'},
		{url: 'juan-carlos-frias-brito--uKRelOEcXw-unsplash.jpg', altText: '3'},
		{url: 'mike-houser-ASOGZQvLKt0-unsplash.jpg', altText: '4'}
	];
	// const options = {img: 'eugene-golovesov--eOGjaog7h0-unsplash.jpg', width: 300, height: 450, zoomWidth: 500, offset: {vertical: 0, horizontal: 10}};

	return (
		<div className="container text-center">
			<div className="row">
				<div className="col-lg-6 col-md-8 mx-auto">
					<GallerySlider slides={galleryList} />
					{/*<Magnifier options={options} />*/}
				</div>
			</div>
		</div>
	);
}

export default App;
