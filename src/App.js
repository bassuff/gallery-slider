import React from 'react';
import GallerySlider from './GallerySlider/GallerySlider.js';

import './App.css';

const galleryList = [
	{url: 'eugene-golovesov--eOGjaog7h0-unsplash.jpg', altText: '1'},
	{url: 'eugene-golovesov-3o72hSvigbk-unsplash.jpg', altText: '2'},
	{url: 'juan-carlos-frias-brito--uKRelOEcXw-unsplash.jpg', altText: '3'},
	{url: 'mike-houser-ASOGZQvLKt0-unsplash.jpg', altText: '4'}
];

function App() {
	return (
		<div className="container text-center">
			<div className="row">
				<div className="col-lg-6 col-md-8 mx-auto">
					<GallerySlider slides={galleryList} />
				</div>
			</div>
		</div>
	);
}

export default App;
