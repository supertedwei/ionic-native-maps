import { Component } from '@angular/core';
import { Locations } from '../../providers/locations';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, CameraPosition, GoogleMapsMarkerOptions,
          GoogleMapsMarker} from 'ionic-native';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

	map: GoogleMap;

	constructor(public locations: Locations) {

	}

  // Load map only after view is initialize
  ngAfterViewInit() {
    this.loadMap();
  }

  loadMap() {
    
    // create LatLng object
    let ionic: GoogleMapsLatLng = new GoogleMapsLatLng(40.713744, -74.009056);

    this.map = new GoogleMap('map', {
        'backgroundColor': 'white',
        'controls': {
          'compass': true,
          'myLocationButton': true,
          'indoorPicker': true,
          'zoom': true
        },
        'gestures': {
          'scroll': true,
          'tilt': true,
          'rotate': true,
          'zoom': true
        },
        'camera': {
          'latLng': ionic,
          'tilt': 30,
          'zoom': 15,
          'bearing': 50
        }
    });

    // listen to MAP_READY event
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      console.log('Map is ready!')

      // let markerOptions: GoogleMapsMarkerOptions = {
      //   position: ionic,
      //   title: 'Ionic'
      // };

      // this.map.addMarker(markerOptions).then((marker: GoogleMapsMarker) => {
      //   marker.showInfoWindow();
      //   console.log('showInfoWindow()')
      // });

      let locationsLoaded = this.locations.load().then((result) => {
	    	let locations = result;
	    	for(let location of locations){
          var markerOptions: GoogleMapsMarkerOptions = {
            position: new GoogleMapsLatLng(location.latitude, location.longitude),
            title: location.title
          };
	    	  this.map.addMarker(markerOptions);
	    	}

	    });
    });

  }
}
