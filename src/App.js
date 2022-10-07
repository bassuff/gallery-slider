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
    const handleChange = event => {
        console.log(event.target);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={handleChange} />
                        <label className="form-check-label" htmlFor="flexRadioDefault1">Default radio</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={handleChange} checked />
                        <label className="form-check-label" htmlFor="flexRadioDefault2">Default checked radio</label>
                    </div>
                </nav>
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <GallerySlider slides={galleryList}/>
                </main>
            </div>
        </div>
    );
}

export default App;
