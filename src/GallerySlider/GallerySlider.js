// Libraries
import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';

// Components
import Dialog from '../Dialog/Dialog.js';
import Magnifier from '../Magnifier/Magnifier.js';

// Context
import {Context} from '../App.js';

// Styles
import styles from './GallerySlider.module.css';

const Images = ({currentIndex, magnifier, openDialog, slides, zoom}) => {
  const [zoomed, setZoomed] = useState(false);
  const context = useContext(Context);

  const handleClick = () => {
    setZoomed(!zoomed);
  };

  return slides.map((item, slideIndex) => (
    <figure
      key={item.url}
      className={styles.slide}
      aria-selected={slideIndex === currentIndex}
      onClick={zoom ? handleClick : openDialog}
      {...(context.zoom && zoom ? {style: {cursor: zoomed ? 'zoom-out' : 'zoom-in'}} : {})}
    >
      <img src={`${process.env.PUBLIC_URL}/${item.url}`} id={`image-${slideIndex}`} alt={item.altText} />
      {item.altText && <figcaption className="text-center">{item.altText}</figcaption>}
      {magnifier && context.magnifier && slideIndex === currentIndex ? (
        <Magnifier height={360} index={slideIndex} offset={{vertical: 0, horizontal: 10}} width={360} zoomWidth={500} />
      ) : null}
    </figure>
  ));
};

Images.propTypes = {
  currentIndex: PropTypes.number.isRequired,
  magnifier: PropTypes.bool,
  openDialog: PropTypes.func.isRequired,
  slides: PropTypes.array.isRequired,
  zoom: PropTypes.bool,
};

const Thumbnails = ({currentIndex, goToNext, goToPrevious, goToSlide, slides}) => (
  <div className="position-relative mt-2 w-100">
    <button className={styles.prev} onClick={goToPrevious}>
      ❮
    </button>
    <div className={styles.list}>
      <div
        className={styles.track}
        style={{
          width: `${slides.length * 42}px`,
          transform: `translate3d(${105 - 42 * currentIndex}px, 0px, 0px)`,
        }}
      >
        {slides.map((item, slideIndex) => (
          <div key={item.url} className={styles.thumbnail} aria-selected={slideIndex === currentIndex} onClick={() => goToSlide(slideIndex)}>
            <img className={styles.thumbnailImage} src={`${process.env.PUBLIC_URL}/${item.url}`} alt={item.altText} onClick={() => null} />
          </div>
        ))}
      </div>
    </div>
    <button className={styles.next} onClick={goToNext}>
      ❯
    </button>
  </div>
);

Thumbnails.propTypes = {
  currentIndex: PropTypes.number.isRequired,
  goToNext: PropTypes.func.isRequired,
  goToPrevious: PropTypes.func.isRequired,
  goToSlide: PropTypes.func.isRequired,
  slides: PropTypes.array.isRequired,
};

const GallerySlider = ({slides}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [touchPosition, setTouchPosition] = useState(null);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = slideIndex => {
    setCurrentIndex(slideIndex);
  };

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleTouchStart = e => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = e => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      goToNext();
    }

    if (diff < -5) {
      goToPrevious();
    }

    setTouchPosition(null);
  };

  return (
    <div onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} className="d-flex flex-column flex-nowrap justify-content-center align-items-center">
      <Images currentIndex={currentIndex} magnifier openDialog={openDialog} slides={slides} />
      <Thumbnails currentIndex={currentIndex} goToNext={goToNext} goToPrevious={goToPrevious} goToSlide={goToSlide} slides={slides} />
      {isDialogOpen && (
        <Dialog onClose={closeDialog}>
          <Images currentIndex={currentIndex} openDialog={openDialog} slides={slides} zoom />
          <Thumbnails currentIndex={currentIndex} goToNext={goToNext} goToPrevious={goToPrevious} goToSlide={goToSlide} slides={slides} />
        </Dialog>
      )}
    </div>
  );
};

GallerySlider.propTypes = {
  // own props
  slides: PropTypes.array.isRequired,
};

export default GallerySlider;
