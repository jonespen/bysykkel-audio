import parse from 'date-fns/parse';
import addMilliseconds from 'date-fns/add_milliseconds';
import differenceInSeconds from 'date-fns/difference_in_seconds';
import React, { Component, PropTypes } from 'react';
import { eventQueueTypes } from './constants';
import { calculateSize } from './utils/calculateSize';
import Boomblaster from './components/Boomblaster';
import Map from './components/Map';
import Console from './components/Console';

const initialEventQueue = {};

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			currentTime: parse(props.trips[0].start_time),
			eventQueue: initialEventQueue,
			paused: false,
		}
	}

	componentDidMount(){
		const { trips } = this.props;
		const updateInterval = 1000; // 1 second
		this.interval = setInterval(() => {
			if(!this.state.paused){
				const currentTime = addMilliseconds(this.state.currentTime, updateInterval);
				this.setState({
					currentTime,
				});

				const eventQueue = trips.reduce((previousValue, currentValue, index) => {
					const start = parse(currentValue.start_time);
					const end = parse(currentValue.end_time);
					const duration = differenceInSeconds(end, start);
					if(differenceInSeconds(start, currentTime) === 0){
						previousValue[index] = {
							...currentValue,
							...previousValue[index], // make sure "playing" is set from previous
							id: index,
							type: eventQueueTypes.start,
							size: calculateSize(duration)
						};
					} else if(differenceInSeconds(end, currentTime) === 0){
						previousValue[index] = {
							...currentValue,
							...previousValue[index],
							id: index,
							type: eventQueueTypes.end
						};
					}

					return previousValue;
				}, this.state.eventQueue);

				this.setState({ eventQueue });
			}
		}, updateInterval);
	}

	componentWillUnmount(){
		clearInterval(this.interval);
	}

	handlePauseClick(isPaused){
		this.setState({
			paused: !isPaused,
		});
	}

	handleSoundPlay(event){
		// set event in queue to playing
		const { eventQueue } = this.state;
		const newEventQueue = { ...eventQueue };
		newEventQueue[event.id] = { ...event, playing: true };
		this.setState({ eventQueue: newEventQueue });
	}

	handleSoundEnd(event){
		// remove event from queue
		const { eventQueue } = this.state;
		const newEventQueue = { ...eventQueue };
		delete newEventQueue[event.id];
		this.setState({ eventQueue: newEventQueue });
	}

  render() {
  	const { paused, eventQueue, currentTime } = this.state;
  	const { stations } = this.props;
    return (
      <div className="App">
      	<Map stations={stations} eventQueue={eventQueue} />
        <Boomblaster
        	eventQueue={eventQueue}
        	onSoundPlay={(event) => this.handleSoundPlay(event)}
        	onSoundEnd={(event) => this.handleSoundEnd(event)}
      	/>
				<Console currentTime={currentTime} onPauseClick={() => this.handlePauseClick(paused)} paused={paused} />
      </div>
    );
  }
}

App.propTypes = {
	trips: PropTypes.array.isRequired,
	stations: PropTypes.array.isRequired,
}

export default App;
