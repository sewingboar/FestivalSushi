import React, { Component } from "react";
import "./map.scss";

import { placesLoaded } from "../../../../actions";
import { withSushiStoreService } from "../../../hoc";
import { connect } from "react-redux";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

class GoogleMap extends Component {
  componentDidMount() {
	const { sushiStoreService, placesLoaded, selectedCity } = this.props;

	sushiStoreService
	  .getPlaceByCityId(selectedCity)
	  .then(places => placesLoaded(places));
  }
  
  render() {
	function _mapLoaded(mapProps, map) {
	  const mapStyle = [
		{
		  "elementType": "geometry",
		  "stylers": [
			{
			  "color": "#212121"
			}
		  ]
		},
		{
		  "elementType": "geometry.fill",
		  "stylers": [
			{
			  "color": "#2d2d2d"
			}
		  ]
		},
		{
		  "elementType": "labels.icon",
		  "stylers": [
			{
			  "visibility": "off"
			}
		  ]
		},
		{
		  "elementType": "labels.text.fill",
		  "stylers": [
			{
			  "color": "#757575"
			}
		  ]
		},
		{
		  "elementType": "labels.text.stroke",
		  "stylers": [
			{
			  "color": "#212121"
			}
		  ]
		},
		{
		  "featureType": "administrative",
		  "elementType": "geometry",
		  "stylers": [
			{
			  "color": "#757575"
			}
		  ]
		},
		{
		  "featureType": "administrative.country",
		  "elementType": "labels.text.fill",
		  "stylers": [
			{
			  "color": "#9e9e9e"
			}
		  ]
		},
		{
		  "featureType": "administrative.locality",
		  "elementType": "labels.text.fill",
		  "stylers": [
			{
			  "color": "#bdbdbd"
			}
		  ]
		},
		{
		  "featureType": "poi",
		  "elementType": "labels.text.fill",
		  "stylers": [
			{
			  "color": "#757575"
			}
		  ]
		},
		{
		  "featureType": "poi.park",
		  "elementType": "geometry",
		  "stylers": [
			{
			  "color": "#181818"
			}
		  ]
		},
		{
		  "featureType": "poi.park",
		  "elementType": "labels.text.fill",
		  "stylers": [
			{
			  "color": "#616161"
			}
		  ]
		},
		{
		  "featureType": "poi.park",
		  "elementType": "labels.text.stroke",
		  "stylers": [
			{
			  "color": "#1b1b1b"
			}
		  ]
		},
		{
		  "featureType": "road",
		  "elementType": "geometry.fill",
		  "stylers": [
			{
			  "color": "#2c2c2c"
			}
		  ]
		},
		{
		  "featureType": "road",
		  "elementType": "labels.text.fill",
		  "stylers": [
			{
			  "color": "#8a8a8a"
			}
		  ]
		},
		{
		  "featureType": "road.arterial",
		  "elementType": "geometry",
		  "stylers": [
			{
			  "color": "#373737"
			}
		  ]
		},
		{
		  "featureType": "road.highway",
		  "elementType": "geometry",
		  "stylers": [
			{
			  "color": "#3c3c3c"
			}
		  ]
		},
		{
		  "featureType": "road.highway.controlled_access",
		  "elementType": "geometry",
		  "stylers": [
			{
			  "color": "#4e4e4e"
			}
		  ]
		},
		{
		  "featureType": "road.local",
		  "elementType": "labels.text.fill",
		  "stylers": [
			{
			  "color": "#616161"
			}
		  ]
		},
		{
		  "featureType": "transit",
		  "elementType": "labels.text.fill",
		  "stylers": [
			{
			  "color": "#757575"
			}
		  ]
		},
		{
		  "featureType": "water",
		  "elementType": "geometry",
		  "stylers": [
			{
			  "color": "#000000"
			}
		  ]
		},
		{
		  "featureType": "water",
		  "elementType": "geometry.fill",
		  "stylers": [
			{
			  "color": "#1d1d1d"
			}
		  ]
		},
		{
		  "featureType": "water",
		  "elementType": "labels.text.fill",
		  "stylers": [
			{
			  "color": "#3d3d3d"
			}
		  ]
		}
	  ]
		map.setOptions({
		  zoomControl: false,
		  mapTypeControl: false,
		  scaleControl: false,
		  streetViewControl: false,
		  rotateControl: false,
		  fullscreenControl: false,
		  disableDefaultUI: false,
		  styles: mapStyle
		})
	}
	const { places, google, mapCenter } = this.props;
	const containerStyle = {
	  borderRadius: "25px",
	  width: "100%",
	  height: "650px",
	};

	const mapRender = mapCenter ? (
	  <Map initialCenter={mapCenter} 
	  google={google} 
	  style={containerStyle} 
	  containerStyle={containerStyle}
	  zoom={12}
	  onReady={(mapProps, map) => _mapLoaded(mapProps, map)}
	  >
		{places.map(item => {
		  return (
			<Marker
				//label={item.name}
				//labelAnchor={{x: 0, y: 25}}
				key={item.id}
				position={{ lat: item.latitude, lng: item.longitude }}
				icon="/img/marker.png"
				//onMouseover={() => {console.log("test marker ", item.name)}}
			>
			</Marker>
		  );
		})}
	  </Map>
	) : null;

	return <div className="contacts-wrapper__map">{mapRender}</div>;
  }
}

const mapStateToProps = ({ selectedCity, places, mapCenter }) => {
  return {
	selectedCity: selectedCity,
	places: places,
	mapCenter: mapCenter
  };
};

const mapDispatchToProps = dispatch => {
  return {
	placesLoaded: products => dispatch(placesLoaded(products))
  };
};

export default withSushiStoreService()(
  connect(
	mapStateToProps,
	mapDispatchToProps
  )(
	GoogleApiWrapper({
	  apiKey: "AIzaSyCYTEEGyZRMVfGJCnxnTACur3UkBaSyVTg",
	  mapId: 'df05a047d1e73c89',
	  language: "uk"
	})(GoogleMap)
  )
);
