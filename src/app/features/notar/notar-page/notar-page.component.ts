import {
  Component,
  ViewChild,
  ViewChildren,
  QueryList,
  AfterViewInit,
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
})
export class NotarPageComponent implements AfterViewInit {
  @ViewChild(GoogleMap) map!: GoogleMap;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  @ViewChildren(MapMarker) markers!: QueryList<MapMarker>;

  center: google.maps.LatLngLiteral | undefined;
  zoom = 14;
  places: SafePlaceResult[] = [];

  selectedPlace: SafePlaceResult | null = null;
  isLoading = false;

  private placesLoaded = false;

  ngAfterViewInit(): void {
    const checkMapReady = setInterval(() => {
      const mapReady = !!this.map?.googleMap;
      if (mapReady) {
        clearInterval(checkMapReady);
        console.log('🟢 googleMap ready');
        this.maybeSearch();
      }
    }, 200);
  }

  requestUserLocation(): void {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        console.log('📍 Standort:', this.center);
        this.maybeSearch();
      },
      () => alert('❌ Zugriff auf den Standort verweigert.')
    );
  }

  maybeSearch(): void {
    if (this.map?.googleMap && this.center) {
      console.log('🔁 maybeSearch() called');
      this.searchNotaries().catch(err => {
        console.error('🔥 Fehler beim Laden der Notare:', err);
      });
    } else {
      console.log('🕒 map or center not ready');
    }
  }

  async searchNotaries(): Promise<void> {
    this.isLoading = true;

    // ✅ Dynamically import the 'places' library (new style)
    if (!this.placesLoaded) {
      await google.maps.importLibrary('places');
      this.placesLoaded = true;
    }

    const service = new google.maps.places.PlacesService(this.map.googleMap!);

    const request: google.maps.places.TextSearchRequest = {
      location: this.center!,
      radius: 5000,
      query: 'Notar Testament',
    };

    console.log('🛰 Suche gestartet:', this.center);

    service.textSearch(request, (results, status) => {
      this.isLoading = false;

      console.log('📦 Ergebnisstatus:', status);
      console.log('📦 Ergebnisse:', results);

      if (status !== google.maps.places.PlacesServiceStatus.OK || !results) {
        alert('❌ Keine Notare gefunden.');
        return;
      }

      this.places = results
        .filter(
          (
            p
          ): p is google.maps.places.PlaceResult & {
            geometry: { location: google.maps.LatLng };
            name: string;
          } => !!p.geometry?.location && !!p.name
        )
        .map(p => ({
          name: p.name,
          location: p.geometry.location,
          address: p.formatted_address ?? p.vicinity ?? '',
        }));

      console.log('✅ Verwendete Orte:', this.places);
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
