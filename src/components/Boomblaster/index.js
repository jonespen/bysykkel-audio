import React, { Component } from 'react';
import howler from 'howler';

const padStart = (str, length, repeated) => {
	return repeated.repeat(length).substring(0,length-str.length)+str;
}

const sounds = {
	celesta: [],
	clav: [],
}

for(let i = 1; i <= 27; i++){
	sounds.celesta.push(
		new howler.Howl({
			src: [`${process.env.PUBLIC_URL}/sounds/celesta/c0${padStart(i.toString(), 2, '0')}.mp3`]
		})
	)
}

for(let i = 1; i <= 27; i++){
	sounds.clav.push(
		new howler.Howl({
			src: [`${process.env.PUBLIC_URL}/sounds/clav/c0${padStart(i.toString(), 2, '0')}.mp3`]
		})
	)
}

class Boomblaster extends Component {
  render() {
  	this.props.tripsInCurrentTime.start.forEach((trip) => {
  		sounds.celesta[Math.floor(Math.random() * sounds.celesta.length) + 1].play();
		});
  	this.props.tripsInCurrentTime.end.forEach((trip) => {
  		sounds.clav[Math.floor(Math.random() * sounds.clav.length) + 1].play();
		});
    return (
      <div className="Boomblaster"></div>
    );
  }
}

export default Boomblaster;
