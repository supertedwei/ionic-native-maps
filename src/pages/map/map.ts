import { Component } from '@angular/core';
import { Locations } from '../../providers/locations';
import { NavController, Platform } from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng } from 'ionic-native';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

	map: GoogleMap;

	constructor(public navCtrl: NavController, public platform: Platform, public locations: Locations) {

	}

  ionViewDidLoad(){

		this.platform.ready().then(() => {

			  let location = new GoogleMapsLatLng(-34.9290,138.6010);
 
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
            'latLng': location,
            'tilt': 30,
            'zoom': 15,
            'bearing': 50
          }
        });
 
        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
            console.log('Map is ready!');
        });


		    // let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);
	    	// let locationsLoaded = this.locations.load();

	    	// Promise.all([
	    	// 	mapLoaded,
	    	// 	locationsLoaded
	    	// ]).then((result) => {

	    	// 	let locations = result[1];

	    	// 	for(let location of locations){
	    	// 		this.maps.addMarker(location.latitude, location.longitude);
	    	// 	}

	    	// });

		});

	}

}
