import React, { Component, PropTypes } from 'react';
import howler from 'howler';
import { eventQueueTypes } from '../../constants';

const padStart = (str, length, repeated) => {
	return repeated.repeat(length).substring(0,length-str.length)+str;
}

const randomBetweenInterval = (min, max) => Math.floor(Math.random()*(max-min+1)+min);

const sounds = {
	celesta: [],
	clav: [],
	swells: [],
}

for(let i = 1; i <= 27; i++){
	sounds.celesta.push(`${process.env.PUBLIC_URL}/sounds/celesta/c0${padStart(i.toString(), 2, '0')}.mp3`)
}

for(let i = 1; i <= 27; i++){
	sounds.clav.push(`${process.env.PUBLIC_URL}/sounds/clav/c0${padStart(i.toString(), 2, '0')}.mp3`)
}

for(let i = 1; i <= 3; i++){
	sounds.swells.push(`${process.env.PUBLIC_URL}/sounds/swells/swell${i}.mp3`)
}

class Boomblaster extends Component {
  render() {
  	const { eventQueue, onSoundEnd, onSoundPlay } = this.props;
  	Object.keys(eventQueue).forEach((key) => {
  		const event = eventQueue[key];

  		// check if event is already playing
  		if(event.playing){
  			return;
  		}

  		let soundFile;
  		switch(event.type){
  			case eventQueueTypes.start:
  				soundFile = sounds.celesta[randomBetweenInterval(1, sounds.celesta.length)];
  				break;
  			case eventQueueTypes.end:
  				soundFile = sounds.swells[randomBetweenInterval(1, sounds.swells.length)];
  				break;
				default:
					soundFile = false;
  		}

  		if(soundFile){
  			new howler.Howl({
					src: [soundFile],
					onplay: () => {
						onSoundPlay(event);
					},
					onend: () => {
						onSoundEnd(event);
					},
				}).play();
  		}

		});
    return (
      <div className="Boomblaster"></div>
    );
  }
}

Boomblaster.propTypes = {
	eventQueue: PropTypes.object.isRequired,
	onSoundPlay: PropTypes.func.isRequired,
	onSoundEnd: PropTypes.func.isRequired,
}

export default Boomblaster;
