import { Injectable } from '@angular/core';
import { GeoJSON } from 'leaflet';
import { latLng, LatLng, Marker,marker,icon,Icon,Layer,Polyline,polyline } from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class LeafletService {

  constructor() { }
  
  latLngToMarker(latLng: LatLng, entrDest: 'entrepot' | 'destination'): Marker {
    const iconUrl = entrDest === 'entrepot'
      ? 'assets/images/entrepot.png'
      : 'assets/marker-icon.png';

    const iconRetinaUrl = entrDest === 'entrepot'
      ? 'assets/images/entrepot.png'
      : 'assets/marker-icon-2x.png';

    return marker([latLng.lat, latLng.lng], {
      icon: icon({
        ...Icon.Default.prototype.options,
        iconUrl: iconUrl,
        iconRetinaUrl: iconRetinaUrl,
        shadowUrl: 'assets/marker-shadow.png'
      })
    });
  }

  updatePrintableLayers(
    baseLayers: Layer[],
    destinationMarkers: LatLng[],
    destinationLines: LatLng[],linesColor?: string
  ): Layer[] {
    const updatedLayers = [...baseLayers];
    
    if (destinationLines.length) {
      
      let line: Polyline = polyline(destinationLines, { color: 'red' });
      if(linesColor){
        line = polyline(destinationLines, { color: linesColor });
      }
      updatedLayers.push(line);
    }
    for (let i = 1; i < destinationMarkers.length - 1; i++) {
      updatedLayers.push(this.latLngToMarker(destinationMarkers[i], "destination"));
    }
    

    
    return updatedLayers;
  }

}