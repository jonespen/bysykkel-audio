import React, { PropTypes } from 'react';
import find from 'lodash/find';
import { Map as RLMap, CircleMarker, Popup, TileLayer } from 'react-leaflet';
import AnimatedCircleMarker from '../AnimatedCircleMarker';
import { eventQueueTypes } from '../../constants';

const accessToken = 'pk.eyJ1Ijoiam9uZXNwZW4iLCJhIjoiY2l1YXp5cXM4MDAwYzJ6cWx5ZGxiajF5eCJ9.EnccAQfyBW_mERfYSiup_g';
const tileLayerUrl = `https://api.mapbox.com/styles/v1/jonespen/ciub42x9p004m2iodxwdw87aq/tiles/256/{z}/{x}/{y}@2x?access_token=${accessToken}`;
const osloLatLng = [59.9139, 10.7522];

const Map = ({ stations, eventQueue }) => {
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
	  	{Object.keys(eventQueue).map((key) => {
  			const event = eventQueue[key];

	  		let prop;
	  		let color;
				let implode;

	  		if(event.type === eventQueueTypes.start){
	  			prop = 'start_station_id';
	  			color = '#27ae60';
	  		} else if(event.type === eventQueueTypes.end){
	  			prop = 'end_station_id';
	  			color = '#c0392b';
					implode = true;
	  		}

	  		if(!prop){
  				return null;
	  		}

	  		const eventStation = find(stations, (station) => station.id === event[prop]);
	  		return (
					<AnimatedCircleMarker
						key={`${event.id}`}
						center={[eventStation.center.latitude, eventStation.center.longitude]}
						color={color}
						implode={implode}
						size={event.size}
					/>
	  		)
	  	})}
	  </RLMap>
	)
};

Map.propTypes = {
	stations: PropTypes.array.isRequired,
	eventQueue: PropTypes.object.isRequired,
}

export default Map;
