/**
 * @license Copyright (c) 2017 Andrii Malaman
 * Written by Andrii Malaman https://github.com/malaman/js-image-zoom
 */

// Libraries
import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';

const Magnifier = props => {
	const [height, setHeight] = useState(props.height);
	const [width, setWidth] = useState(props.width);

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
	const zoomLensRef = useRef();
	const zoomedImageRef = useRef();
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
		vertical: props.offset && props.offset.vertical ? props.offset.vertical : 0,
		horizontal: props.offset && props.offset.horizontal ? props.offset.horizontal : 0,
	};
	data.zoomContainer = props.zoomContainer ? props.zoomContainer : container;

	const getOffset = el => {
		if (el) {
			const elRect = el.getBoundingClientRect();
			return {left: elRect.left, top: elRect.top};
		}
		return {left: 0, top: 0};
	};

	const leftLimit = min => {
		return width - min;
	};

	const topLimit = min => {
		return height - min;
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

	const setZoomedImgSize = (props, data) => {
		if (props.scale) {
			data.zoomedImg.element.style.width = width * props.scale + 'px';
			data.zoomedImg.element.style.height = height * props.scale + 'px';
		} else if (props.zoomWidth) {
			data.zoomedImg.element.style.width = props.zoomWidth + 'px';
			data.zoomedImg.element.style.height = data.sourceImg.element.style.height;
		} else {
			data.zoomedImg.element.style.width = '100%';
			data.zoomedImg.element.style.height = '100%';
		}
	};

	const onSourceImgLoad = () => {
		// use height determined by browser if height is not set in props
		setHeight(props.height || data.sourceImg.element.height);
		data.sourceImg.element.style.height = props.fillContainer ? '100%' : height + 'px';

		// use width determined by browser if width is not set in props
		setWidth(props.width || data.sourceImg.element.width);
		data.sourceImg.element.style.width = props.fillContainer ? '100%' : width + 'px';

		setZoomedImgSize(props, data);

		data.sourceImg.naturalWidth = data.sourceImg.element.naturalWidth;
		data.sourceImg.naturalHeight = data.sourceImg.element.naturalHeight;
		data.zoomedImg.element.style.backgroundSize = data.sourceImg.naturalWidth + 'px ' + data.sourceImg.naturalHeight + 'px';

		data.zoomLens.element.style.background = 'black';
		data.zoomLens.element.style.opacity = '0.4';

		scaleX = data.sourceImg.naturalWidth / width;
		scaleY = data.sourceImg.naturalHeight / height;
		offset = getOffset(data.sourceImg.element);

		// set zoomLens dimensions if custom scale is set
		if (props.scale) {
			data.zoomLens.width = width / (data.sourceImg.naturalWidth / (width * props.scale));
			data.zoomLens.height = height / (data.sourceImg.naturalHeight / (height * props.scale));
		}

		// else if zoomWidth is set
		else if (props.zoomWidth) {
			data.zoomLens.width = props.zoomWidth / scaleX;
			data.zoomLens.height = height / scaleY;
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
		// todo
		data.sourceImg.element = document.getElementById('image-' + props.index);

		container.style.position = 'relative';
		data.sourceImg.element.style.width = props.fillContainer ? '100%' : props.width ? width + 'px' : 'auto';
		data.sourceImg.element.style.height = props.fillContainer ? '100%' : props.height ? height + 'px' : 'auto';

		data.zoomLens.element = zoomLensRef.current;
		data.zoomLens.element.style.display = 'none';
		data.zoomLens.element.classList.add('zoom-lens');

		data.zoomedImg.element = zoomedImageRef.current;
		data.zoomedImg.element.classList.add('zoomed-image');
		data.zoomedImg.element.style.backgroundImage = "url('" + data.sourceImg.element.src + "')";
		data.zoomedImg.element.style.backgroundRepeat = 'no-repeat';
		data.zoomedImg.element.style.display = 'none';

		// Right Position
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
	height: PropTypes.number,
	offset: PropTypes.object,
	scale: PropTypes.number,
	width: PropTypes.number,
	zoomPosition: PropTypes.oneOf(['top', 'left', 'bottom', 'right', 'original']),
	zoomWidth: PropTypes.number,
};

Magnifier.defaultProps = {
	fillContainer: false
};

export default Magnifier;
