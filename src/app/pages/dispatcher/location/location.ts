import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-location',
  templateUrl: './location.html',
  styleUrls: ['./location.css'],
  standalone: true,
  imports: [CommonModule, GoogleMap, MapMarker],
})
export class LocationPage implements OnInit {
  latitude!: number;
  longitude!: number;
  driverLat = -6.2042;
  driverLng = 39.2975;

  center!: google.maps.LatLngLiteral;
  reporterMarkerPosition!: google.maps.LatLngLiteral;
  driverMarkerPosition!: google.maps.LatLngLiteral;
  markerOptions: google.maps.MarkerOptions = { draggable: false };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.latitude = +params['latitude'];
      this.longitude = +params['longitude'];

      if (this.latitude && this.longitude) {
        this.center = { lat: this.latitude, lng: this.longitude };
        this.reporterMarkerPosition = { lat: this.latitude, lng: this.longitude };
        this.driverMarkerPosition = { lat: this.driverLat, lng: this.driverLng };
      } else {
        console.error('Coordinates not provided');
      }
    });
  }
}
