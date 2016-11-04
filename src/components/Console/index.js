import React, { PropTypes } from 'react';
import { style } from 'glamor';
import format from 'date-fns/format';

const consoleStyle = style({
	position: 'absolute',
	top: 0,
	right: 0,
	zIndex: 1000,
	backgroundColor: 'rgba(0,0,0,.25)',
	padding: '1rem',
	color: 'white',
});

const buttonStyle = style({
	backgroundColor: '#333',
	border: 0,
	padding: '.5rem',
	color: 'white',
	display: 'block',
});

const dateStyle = style({
	marginBottom: '.5rem'
});

const Console = ({onPauseClick, paused, currentTime}) => {
	return (
		<div {...consoleStyle}>
			<div {...dateStyle}>{format(currentTime, 'D. MMM HH:mm:ss')}</div>
			<button {...buttonStyle} onClick={onPauseClick}>
				{paused ? 'Start' : 'Pause'}
			</button>
		</div>
	)
}

Console.propTypes = {
	paused: PropTypes.bool,
	currentTime: PropTypes.object.isRequired,
	onPauseClick: PropTypes.func.isRequired,
}

export default Console;
