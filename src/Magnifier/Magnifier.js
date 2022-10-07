/**
 * @license Copyright (c) 2017 Andrii Malaman
 * Written by Andrii Malaman https://github.com/malaman/js-image-zoom
 */

// Libraries
import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

const Magnifier = ({index, options}) => {
	const data = {
		sourceImg: {
			element: null,
			width: 0,
			height: 0,
			naturalWidth: 0,
			naturalHeight: 0,
		},
		zoomedImgOffset: {
			vertical: 0,
			horizontal: 0,
		},
		zoomedImg: {
			element: null,
			width: 0,
			height: 0,
		},
		zoomLens: {
			element: null,
			width: 0,
			height: 0,
		},
	};
	// const containerRef = useRef();
	// const imageRef = useRef();
	const zoomLensRef = useRef();
	const zoomedImageRef = useRef();
	// const img = React.createElement('img', {src: options.img});
	// const container = React.createElement('div', null, img);
	// const container = document.getElementsByClassName('slide active')[0];
	let container;

	useEffect(() => {
		setup();

		if (data.sourceImg.element.complete) {
			onSourceImgLoad();
		} else {
			data.sourceImg.element.onload = onSourceImgLoad;
		}

		return () => {
			kill();
		};
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	let scaleX;
	let scaleY;
	let offset;
	data.zoomedImgOffset = {
		vertical: options.offset && options.offset.vertical ? options.offset.vertical : 0,
		horizontal: options.offset && options.offset.horizontal ? options.offset.horizontal : 0,
	};
	data.zoomContainer = options.zoomContainer ? options.zoomContainer : container;

	const getOffset = el => {
		if (el) {
			const elRect = el.getBoundingClientRect();
			return {left: elRect.left, top: elRect.top};
		}
		return {left: 0, top: 0};
	};

	const leftLimit = min => {
		return options.width - min;
	};

	const topLimit = min => {
		return options.height - min;
	};

	const getValue = (val, min, max) => {
		if (val < min) {
			return min;
		}
		if (val > max) {
			return max;
		}
		return val;
	};

	const getPosition = (v, min, max) => {
		const value = getValue(v, min, max);
		return value - min;
	};

	const zoomLensLeft = left => {
		const leftMin = data.zoomLens.width / 2;
		return getPosition(left, leftMin, leftLimit(leftMin));
	};

	const zoomLensTop = top => {
		const topMin = data.zoomLens.height / 2;
		return getPosition(top, topMin, topLimit(topMin));
	};

	const setZoomedImgSize = (options, data) => {
		if (options.scale) {
			data.zoomedImg.element.style.width = options.width * options.scale + 'px';
			data.zoomedImg.element.style.height = options.height * options.scale + 'px';
		} else if (options.zoomWidth) {
			data.zoomedImg.element.style.width = options.zoomWidth + 'px';
			data.zoomedImg.element.style.height = data.sourceImg.element.style.height;
		} else {
			data.zoomedImg.element.style.width = '100%';
			data.zoomedImg.element.style.height = '100%';
		}
	};

	const onSourceImgLoad = () => {
		// use height determined by browser if height is not set in options
		options.height = options.height || data.sourceImg.element.height;
		data.sourceImg.element.style.height = options.fillContainer ? '100%' : options.height + 'px';

		// use width determined by browser if width is not set in options
		options.width = options.width || data.sourceImg.element.width;
		data.sourceImg.element.style.width = options.fillContainer ? '100%' : options.width + 'px';

		setZoomedImgSize(options, data);

		data.sourceImg.naturalWidth = data.sourceImg.element.naturalWidth;
		data.sourceImg.naturalHeight = data.sourceImg.element.naturalHeight;
		data.zoomedImg.element.style.backgroundSize = data.sourceImg.naturalWidth + 'px ' + data.sourceImg.naturalHeight + 'px';

		data.zoomLens.element.style.background = 'white';
		data.zoomLens.element.style.opacity = '0.4';

		scaleX = data.sourceImg.naturalWidth / options.width;
		scaleY = data.sourceImg.naturalHeight / options.height;
		offset = getOffset(data.sourceImg.element);

		// set zoomLens dimensions if custom scale is set
		if (options.scale) {
			data.zoomLens.width = options.width / (data.sourceImg.naturalWidth / (options.width * options.scale));
			data.zoomLens.height = options.height / (data.sourceImg.naturalHeight / (options.height * options.scale));
		}

		// else if zoomWidth is set
		else if (options.zoomWidth) {
			data.zoomLens.width = options.zoomWidth / scaleX;
			data.zoomLens.height = options.height / scaleY;
		}

		// else read from the zoomedImg
		else {
			data.zoomedImg.element.style.display = 'block';
			data.zoomLens.width = data.zoomedImg.element.clientWidth / scaleX;
			data.zoomLens.height = data.zoomedImg.element.clientHeight / scaleY;
			data.zoomedImg.element.style.display = 'none';
		}

		data.zoomLens.element.style.position = 'absolute';
		data.zoomLens.element.style.width = data.zoomLens.width + 'px';
		data.zoomLens.element.style.height = data.zoomLens.height + 'px';
		data.zoomLens.element.pointerEvents = 'none';
	};

	const setup = () => {
		container = document.getElementsByClassName('slide active')[0];
		// data.sourceImg.element = imageRef.current;
		data.sourceImg.element = document.getElementById('image-' + index);

		options = options || {};
		// containerRef.current.style.position = 'relative';
		data.sourceImg.element.style.width = options.fillContainer ? '100%' : options.width ? options.width + 'px' : 'auto';
		data.sourceImg.element.style.height = options.fillContainer ? '100%' : options.height ? options.height + 'px' : 'auto';

		data.zoomLens.element = zoomLensRef.current;
		data.zoomLens.element.style.display = 'none';
		data.zoomLens.element.classList.add('zoom-lens');

		data.zoomedImg.element = zoomedImageRef.current;
		data.zoomedImg.element.classList.add('zoomed-image');
		data.zoomedImg.element.style.backgroundImage = "url('" + data.sourceImg.element.src + "')";
		data.zoomedImg.element.style.backgroundRepeat = 'no-repeat';
		data.zoomedImg.element.style.display = 'none';

		data.zoomedImg.element.style.position = 'absolute';
		data.zoomedImg.element.style.top = data.zoomedImgOffset.vertical + 'px';
		data.zoomedImg.element.style.right = data.zoomedImgOffset.horizontal - data.zoomedImgOffset.horizontal * 2 + 'px';
		data.zoomedImg.element.style.transform = 'translateX(100%)';

		// Setup event listeners
		container.addEventListener('mousemove', handleMouseMove, false);
		container.addEventListener('mouseenter', handleMouseEnter, false);
		container.addEventListener('mouseleave', handleMouseLeave, false);
		window.addEventListener('scroll', handleScroll, false);

		return data;
	};

	const kill = () => {
		// Remove event listeners
		container.removeEventListener('mousemove', handleMouseMove, false);
		container.removeEventListener('mouseenter', handleMouseEnter, false);
		container.removeEventListener('mouseleave', handleMouseLeave, false);
		window.removeEventListener('scroll', handleScroll, false);
	};

	const handleMouseMove = event => {
		let offsetX;
		let offsetY;
		let backgroundTop;
		let backgroundRight;
		let backgroundPosition;
		if (offset) {
			offsetX = zoomLensLeft(event.clientX - offset.left);
			offsetY = zoomLensTop(event.clientY - offset.top);
			backgroundTop = offsetX * scaleX;
			backgroundRight = offsetY * scaleY;
			backgroundPosition = `-${backgroundTop}px -${backgroundRight}px`;
			data.zoomedImg.element.style.backgroundPosition = backgroundPosition;
			data.zoomLens.element.style.cssText += `transform:translate(${offsetX}px,${offsetY}px);display:block;left:0px;top:0px;`;
		}
	};

	const handleMouseEnter = () => {
		data.zoomedImg.element.style.display = 'block';
		data.zoomLens.element.style.display = 'block';
	};

	const handleMouseLeave = () => {
		data.zoomedImg.element.style.display = 'none';
		data.zoomLens.element.style.display = 'none';
	};

	const handleScroll = () => {
		offset = getOffset(data.sourceImg.element);
	};

	return (
		<React.Fragment>
			<div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} ref={zoomLensRef} />
			<div ref={zoomedImageRef} />
		</React.Fragment>
	);
};

Magnifier.propTypes = {
	fillContainer: PropTypes.bool,
	width: PropTypes.number,
	img: PropTypes.string,
	height: PropTypes.number,
	zoomWidth: PropTypes.number,
	scale: PropTypes.number,
	offset: PropTypes.object,
	zoomStyle: PropTypes.string,
	zoomLensStyle: PropTypes.string,
	zoomPosition: PropTypes.oneOf(['top', 'left', 'bottom', 'right', 'original']),
};

Magnifier.defaultProps = {
	fillContainer: true
};

export default Magnifier;
