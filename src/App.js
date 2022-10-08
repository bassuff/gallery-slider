// Libraries
import React, {Fragment, createContext, useState} from 'react';

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

    const handleChange = () => {
        setMagnifier(!magnifier);
    };

    return <Fragment>
        <header className="navbar navbar-expand-lg navbar-dark bg-secondary sticky-top">
            <nav className="container-xxl bd-gutter flex-wrap flex-lg-nowrap">
                <a className="navbar-brand" href={process.env.PUBLIC_URL}>Gallery Slider</a>
                <button className="navbar-toggler p-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#bdSidebar" aria-controls="bdSidebar" aria-label="Toggle docs navigation">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="bi" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"></path></svg>
                </button>
            </nav>
        </header>
        <div className="container-fluid mt-3">
            <div className="row">
                <aside className="col-md-3 col-lg-2 d-md-block bg-light sidebar d-none">
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" id="switch-magnifier" onChange={handleChange} checked={magnifier} />
                        <label className="form-check-label" htmlFor="switch-magnifier">Magnifier</label>
                    </div>
                </aside>
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <MagnifierContext.Provider value={magnifier}>
                        <GallerySlider slides={galleryList} />
                    </MagnifierContext.Provider>
                </main>
            </div>
        </div>
    </Fragment>;
};

export default App;
