import React, { PropTypes, Component } from 'react';
import { CircleMarker } from 'react-leaflet';
import { Motion, spring } from 'react-motion';

class AnimatedCircleMarker extends Component {
	render(){
		const { center, color } = this.props;
		console.log(color);
		return (
			<Motion defaultStyle={{x: 0}} style={{ x: spring(20) }}>
			  {value => <CircleMarker center={center} opacity={10 - value.x} radius={value.x} color={color} />}
			</Motion>
		)
	}
};

AnimatedCircleMarker.propTypes = {
	center: PropTypes.array.isRequired,
	color: PropTypes.string,
}

export default AnimatedCircleMarker;
