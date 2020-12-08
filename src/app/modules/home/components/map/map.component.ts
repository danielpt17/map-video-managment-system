import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CameraModel} from '../../models/camera.model';
import * as Leaflet from 'leaflet';
import {HomeService} from '../../services/home.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit, OnChanges {
  @Input() cameras: CameraModel[];
  @Input() selectedCamera: CameraModel;
  map: Leaflet.Map;
  selectedCameraMarkers: any[] = [];

  constructor(private readonly homeService: HomeService) {
  }

  ngOnInit(): void {
    this.map = new Leaflet.Map('map').setView([31.0461, 34.8516], 8);
    Leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'edupala.com'
    }).addTo(this.map);
    if (this.cameras) {
      this.setLeafletMap();
    }
    this.subscribeToFocusState();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.cameras && changes.cameras.firstChange === false &&
      changes.cameras.currentValue.length !== changes.cameras.previousValue.length) {
      this.setLeafletMap();
    }
    if (changes.selectedCamera && changes.selectedCamera.firstChange === false &&
      changes.selectedCamera.currentValue !== changes.selectedCamera.previousValue) {
      if (this.selectedCameraMarkers.length) {
        this.map.removeLayer(this.selectedCameraMarkers[0]);
        this.selectedCameraMarkers = [];
      }
      this.map.setView([this.selectedCamera.lat, this.selectedCamera.long]);
      const animatedCircleIcon = {
        icon: Leaflet.divIcon({
          className: 'css-icon',
          html: '<div class="gps_ring"></div>',
          iconSize: [18, 22]
        })
      };
      const selectCameraMarker = Leaflet.marker([this.selectedCamera.lat, this.selectedCamera.long], animatedCircleIcon).addTo(this.map);
      this.selectedCameraMarkers.push(selectCameraMarker);
    }
  }

  private subscribeToFocusState(): void {
    this.homeService.shouldFocusObservable.subscribe((state) => {
      if (state === true) {
        this.map.setView([this.selectedCamera.lat, this.selectedCamera.long]);
      }
    });
  }

  setLeafletMap(): void {
    for (const camera of this.cameras) {
      Leaflet.marker([camera.lat, camera.long]).addTo(this.map)
        .bindPopup(camera.name);
    }
  }
}
