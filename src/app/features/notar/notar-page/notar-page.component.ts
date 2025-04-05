import {
  Component,
  ViewChild,
  ViewChildren,
  QueryList,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMap, MapMarker, MapInfoWindow } from '@angular/google-maps';

interface SafePlaceResult {
  name: string;
  location: google.maps.LatLng;
  address?: string;
}

@Component({
  selector: 'app-notar-page',
  standalone: true,
  imports: [CommonModule, GoogleMap, MapMarker, MapInfoWindow],
  templateUrl: './notar-page.component.html',
  styleUrls: ['./notar-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotarPageComponent {
  @ViewChild(GoogleMap) map!: GoogleMap;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  @ViewChildren(MapMarker) markers!: QueryList<MapMarker>;

  center: google.maps.LatLngLiteral = { lat: 48.2082, lng: 16.3738 }; // default Vienna
  zoom = 14;
  mapVisible = false;

  places: SafePlaceResult[] = [];
  selectedPlace: SafePlaceResult | null = null;
  isLoading = false;

  private placesLoaded = false;

  constructor(private cdr: ChangeDetectorRef) {}

  requestUserLocation(): void {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.mapVisible = true;
        this.cdr.markForCheck();

        setTimeout(() => {
          if (this.map?.googleMap) {
            console.log('🟢 Map & location ready → maybeSearch');
            this.searchNotaries();
          } else {
            console.error('❌ map.googleMap not available!');
          }
        }, 300);
      },
      () => alert('❌ Zugriff auf den Standort verweigert.')
    );
  }

  async searchNotaries(): Promise<void> {
    this.isLoading = true;

    if (!this.placesLoaded) {
      await google.maps.importLibrary('places');
      this.placesLoaded = true;
    }

    const service = new google.maps.places.PlacesService(this.map.googleMap!);

    const request: google.maps.places.TextSearchRequest = {
      location: this.center,
      radius: 5000,
      query: 'Notar Testament',
    };

    service.textSearch(request, (results, status) => {
      this.isLoading = false;

      if (status !== google.maps.places.PlacesServiceStatus.OK || !results) {
        alert('❌ Keine Notare gefunden.');
        return;
      }

      setTimeout(() => {
        this.places = results
          .filter(
            (p): p is google.maps.places.PlaceResult & {
              geometry: { location: google.maps.LatLng };
              name: string;
            } => !!p.geometry?.location && !!p.name
          )
          .map((p) => ({
            name: p.name,
            location: p.geometry.location,
            address: p.formatted_address ?? p.vicinity ?? '',
          }));

        this.cdr.markForCheck();
      }, 0);
    });
  }

  onMarkerClick(place: SafePlaceResult, index: number): void {
    this.selectedPlace = place;
    const marker = this.markers.get(index + 1); // skip user marker
    if (marker) {
      this.map.panTo(place.location);
      this.infoWindow.open(marker);
    }
  }

  trackByIndex(index: number): number {
    return index;
  }
}
