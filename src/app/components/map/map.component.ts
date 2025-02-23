import { Component, computed, effect, inject, input, model, output, signal, OnInit, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { Icon, icon, LatLng, latLng, Layer, LeafletMouseEvent, MapOptions, marker, Marker, polyline, Polyline, tileLayer } from 'leaflet';
import { OpenRouteServiceService } from '../../services/open-route-service.service';
import { LeafletService } from '../../services/leaflet.service';
import { colors } from '../../../models/couleurs.model';
import { Commande } from '../../../models/commande.model';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  leafletService = inject(LeafletService);
  openRouteService = inject(OpenRouteServiceService);


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

  colors = colors;
  colorIt = model<number>(0);

  commandes = input.required<Commande[]>();
  commandesMarkers: Layer[] = [];

  createdTournees = model<LatLng[][]>([]); 

  async ngOnInit() {
    this.commandesMarkers = await this.leafletService.createMarkersForAvailableCommandes(this.commandes());
    this.layers.set([...this.layersBackup(), ...this.commandesMarkers]);
    this.layersBackup.set([...this.layers()]);
  }

  async ngOnChanges() {

    if (this.createdTournees().length) {
      console.log('createdTournees',this.createdTournees());
      this.layers.set([...this.layersBackup()]);
    for(const tournee of this.createdTournees()){
      try{
        const routePolyline = await this.leafletService.createPolylineForTournee(tournee);
          if (routePolyline) {
            this.layers.set([...this.layers(), routePolyline]);
          }
      }
      catch(error){
        console.log('erreur ',error);
      }
    }

  }
}
}
