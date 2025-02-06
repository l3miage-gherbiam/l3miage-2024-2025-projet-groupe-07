import { Component, computed, effect, inject, input, model, output, signal, OnInit, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { Icon, icon, LatLng, latLng, Layer, LeafletMouseEvent, MapOptions, marker, Marker, polyline, Polyline, tileLayer } from 'leaflet';
import { OpenRouteServiceService } from '../../services/open-route-service.service';
import { LeafletService } from '../../services/leaflet.service';
import { colors } from '../../../models/couleurs.model';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  leafletService = inject(LeafletService);


  latitude = model<number>(45.1485200);
  longitude = model<number>(5.7369725);
  zoom = model<number>(10);

  center = computed<LatLng>(() => latLng(this.latitude(),this.longitude() )); // entr

  options = computed( () => ({
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: this.zoom(),
    center: this.center()
  }));


  layers = model<Layer[]>([this.leafletService.latLngToMarker(this.center(),"entrepot")]);
  layersBackup = model<Layer[]>([this.leafletService.latLngToMarker(this.center(),"entrepot")]);
  destinationsGeoCode = model<LatLng[]>([]);


  //soit itineraire soit cheminOptimise
  itenairaire = model<LatLng[]>([]);
  cheminOptimise = model<LatLng[]>([]);


  colors = colors;
  colorIt = model<number>(0);
  

  ngOnChanges() {

    const newIndex = (this.colorIt() + 1) % this.colors.length;
    this.colorIt.set(newIndex);


    let activeItinerary;
    if (this.cheminOptimise().length > 0) {
      activeItinerary = this.cheminOptimise();
    } else {
      activeItinerary = this.itenairaire();
    }

    this.layers.set([...this.layersBackup()]);

    const updatedLayers = this.leafletService.updatePrintableLayers(
      this.layers(),
      this.destinationsGeoCode(),
      activeItinerary,
      this.colors[this.colorIt()].hex
    );
    this.layers.set(updatedLayers);
  
  
  }

}
