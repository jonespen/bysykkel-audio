import React, { PropTypes } from 'react';
import find from 'lodash/find';
import { Map as RLMap, CircleMarker, Popup, TileLayer } from 'react-leaflet';
import AnimatedCircleMarker from '../AnimatedCircleMarker';

const accessToken = 'pk.eyJ1Ijoiam9uZXNwZW4iLCJhIjoiY2l1YXp5cXM4MDAwYzJ6cWx5ZGxiajF5eCJ9.EnccAQfyBW_mERfYSiup_g';
const tileLayerUrl = `https://api.mapbox.com/styles/v1/jonespen/ciub42x9p004m2iodxwdw87aq/tiles/256/{z}/{x}/{y}@2x?access_token=${accessToken}`;
const osloLatLng = [59.9139, 10.7522];
const Map = ({ stations, tripsInCurrentTime }) => {
	return (
	  <RLMap center={osloLatLng} zoom={13}>
	    <TileLayer
	    url={tileLayerUrl}
	    attribution='<a href="https://www.mapbox.com/about/maps/" target="_blank">&copy; Mapbox &copy; OpenStreetMap</a> <a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a>'
	  />
	  	{stations.map((station) => {
	  		return (
					<CircleMarker key={station.id} center={[station.center.latitude, station.center.longitude]} opacity={.2} radius={5} color="#005fc9">
			      <Popup>
			        <span>{station.title}</span>
			      </Popup>
			    </CircleMarker>
	  		)
	  	})}
	  	{tripsInCurrentTime.start.map((trip) => {
	  		const startStation = find(stations, (station) => station.id === trip.start_station_id);
	  		return (
					<AnimatedCircleMarker
					key={`${trip.start_station_id}_${trip.end_station_id}`}
					center={[startStation.center.latitude, startStation.center.longitude]}
					color="red"
					/>
	  		)
	  	})}
	  	{tripsInCurrentTime.end.map((trip) => {
	  		const endStation = find(stations, (station) => station.id === trip.end_station_id);
	  		console.log(endStation);
	  		return (
					<AnimatedCircleMarker
						key={`${trip.start_station_id}_${trip.end_station_id}`}
						center={[endStation.center.latitude, endStation.center.longitude]}
						color="green"
					/>
	  		)
	  	})}
	  </RLMap>
	)
};

Map.propTypes = {
	stations: PropTypes.array.isRequired,
	tripsInCurrentTime: PropTypes.shape({
		start: PropTypes.array.isRequired,
		end: PropTypes.array.isRequired,
	}).isRequired,
}

export default Map;
