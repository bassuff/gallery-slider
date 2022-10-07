// Libraries
import React, {createContext, useState} from 'react';

// Components
import GallerySlider from './GallerySlider/GallerySlider.js';

// Styles
import './App.css';

const galleryList = [
    {url: 'eugene-golovesov--eOGjaog7h0-unsplash.jpg', altText: '1'},
    {url: 'eugene-golovesov-3o72hSvigbk-unsplash.jpg', altText: '2'},
    {url: 'juan-carlos-frias-brito--uKRelOEcXw-unsplash.jpg', altText: '3'},
    {url: 'mike-houser-ASOGZQvLKt0-unsplash.jpg', altText: '4'}
];

export const MagnifierContext = createContext(false);

const App = () => {
    const [magnifier, setMagnifier] = useState(false);

    const handleChange = event => {
        event.preventDefault();
        setMagnifier(event.target.value === 'on');
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
                    <h2>Magnifier</h2>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" value="off" name="magnifier" id="magnifier-off" onChange={handleChange} checked={!magnifier} />
                        <label className="form-check-label" htmlFor="magnifier-off">Disabled</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" value="on" name="magnifier" id="magnifier-on" onChange={handleChange} checked={magnifier} />
                        <label className="form-check-label" htmlFor="magnifier-on">Enabled</label>
                    </div>
                </nav>
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <MagnifierContext.Provider value={magnifier}>
                        <GallerySlider slides={galleryList}/>
                    </MagnifierContext.Provider>
                </main>
            </div>
        </div>
    );
};

export default App;
