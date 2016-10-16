import moment from 'moment';
import React, { Component, PropTypes } from 'react';
import Boomblaster from './components/Boomblaster';
import Map from './components/Map';
import './App.css';


const intialTripsInCurrentTime = {
	start: [],
	end: [],
};

class App extends Component {
	constructor(props){
		super(props);
		console.log(props.trips.length);
		this.state = {
			currentTime: moment(props.trips[200].start_time),
			tripsInCurrentTime: intialTripsInCurrentTime,
			paused: false,
		}
	}

	componentDidMount(){
		const { trips } = this.props;
		const updateInterval = 1000; // 1 second
		this.interval = setInterval(() => {
			if(!this.state.paused){
				const currentTime = this.state.currentTime.add(updateInterval, 'milliseconds');
				this.setState({
					currentTime,
				});

				const tripsInCurrentTime = trips.reduce((previousValue, currentValue) => {
					if(moment(currentValue.start_time).diff(currentTime, 'seconds') === 0){
						previousValue.start.push(currentValue);
					}
					if(moment(currentValue.end_time).diff(currentTime, 'seconds') === 0){
						previousValue.end.push(currentValue);
					}

					return previousValue;
				}, intialTripsInCurrentTime);

				this.setState({ tripsInCurrentTime });
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

  render() {
  	const { paused, tripsInCurrentTime, currentTime } = this.state;
  	const { stations } = this.props;
    return (
      <div className="App">
      	<Map stations={stations} tripsInCurrentTime={tripsInCurrentTime} />
        <Boomblaster tripsInCurrentTime={tripsInCurrentTime} />
        <button onClick={() => this.handlePauseClick(paused)}>
      	{paused ? 'Start' : 'Pause'}
      	</button>
      	{currentTime.format()}
      </div>
    );
  }
}

App.propTypes = {
	trips: PropTypes.array.isRequired,
	stations: PropTypes.array.isRequired,
}

export default App;
