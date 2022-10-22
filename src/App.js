// Libraries
import React, {Fragment, createContext, useState} from 'react';

// Components
import GallerySlider from './GallerySlider/GallerySlider.js';

// Styles
import styles from './App.module.css';

const galleryList = [
    {url: 'eugene-golovesov--eOGjaog7h0-unsplash.jpg', altText: 'https://unsplash.com/photos/-eOGjaog7h0'},
    {url: 'eugene-golovesov-3o72hSvigbk-unsplash.jpg', altText: 'https://unsplash.com/photos/3o72hSvigbk'},
    {url: 'juan-carlos-frias-brito--uKRelOEcXw-unsplash.jpg', altText: 'https://unsplash.com/photos/-uKRelOEcXw'},
    {url: 'mike-houser-ASOGZQvLKt0-unsplash.jpg', altText: 'https://unsplash.com/photos/ASOGZQvLKt0'}
];

export const Context = createContext({magnifier: false, zoom: false});

const App = () => {
    const [magnifier, setMagnifier] = useState(false);
    const [zoom, setZoom] = useState(false);

    const handleChange = event => {
        if (event.target.id === 'switch-magnifier') {
            setMagnifier(!magnifier);
        } else if (event.target.id === 'switch-zoom') {
            setZoom(!zoom);
        }
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
                <aside className={`col-md-3 col-lg-2 d-md-block bg-light d-none ${styles.sidebar}`}>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" id="switch-magnifier" onChange={handleChange} checked={magnifier} />
                        <label className="form-check-label" htmlFor="switch-magnifier">Magnifier</label>
                    </div>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" id="switch-zoom" onChange={handleChange} checked={zoom} />
                        <label className="form-check-label" htmlFor="switch-zoom">Zoom</label>
                    </div>
                </aside>
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <Context.Provider value={{magnifier, zoom}}>
                        <GallerySlider slides={galleryList} />
                    </Context.Provider>
                </main>
            </div>
        </div>
    </Fragment>;
};

export default App;
