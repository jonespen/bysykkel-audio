import React, { PropTypes, Component } from 'react';
import { CircleMarker } from 'react-leaflet';
import { Motion, spring, presets } from 'react-motion';

class AnimatedCircleMarker extends Component {
	render(){
		const { center, color, size, implode } = this.props;
		const springFrom = implode ? size : 0;
		const springTo = implode ? 0 : size;
		const springOpts = {stiffness: size, damping: 26};
		return (
			<Motion defaultStyle={{x: springFrom}} style={{ x: spring(springTo, springOpts) }}>
			  {value => {
					const opacity = (size - value.x) / size;
			  	if(opacity < 0.001){
			  		return null;
			  	}
			  	return <CircleMarker center={center} opacity={opacity} radius={value.x} color={color} />
			  }}
			</Motion>
		)
	}
};

AnimatedCircleMarker.propTypes = {
	center: PropTypes.array.isRequired,
	implode: PropTypes.bool,
	color: PropTypes.string,
	size: PropTypes.number,
}

AnimatedCircleMarker.defaultProps = {
	size: 20,
}

export default AnimatedCircleMarker;
