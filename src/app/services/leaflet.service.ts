import { Injectable,inject } from '@angular/core';
import { GeoJSON } from 'leaflet';
import { latLng, LatLng, Marker,marker,icon,Icon,Layer,Polyline,polyline } from 'leaflet';
import { Commande } from '../../models/commande.model';
import { AdresseGouvService } from './adresse-gouv.service';
import { OpenRouteServiceService } from './open-route-service.service';

@Injectable({
  providedIn: 'root'
})
export class LeafletService {

  constructor() { }

  adresseGouvService = inject(AdresseGouvService);
  openRouteService = inject(OpenRouteServiceService);
  
  latLngToMarker(latLng: LatLng, entrDest: 'entrepot' | 'destination',color?: "red"|"blue"): Marker {
    let iconUrl = entrDest === 'entrepot'
      ? 'assets/images/entrepot.png'
      : 'assets/marker-icon.png';

    let iconRetinaUrl = entrDest === 'entrepot'
      ? 'assets/images/entrepot.png'
      : 'assets/marker-icon-2x.png';

      if (color === "red") {
        iconUrl = 'assets/images/red-marker.png';
        iconRetinaUrl = 'assets/images/red-marker.png';
      }

    return marker([latLng.lat, latLng.lng], {
      icon: icon({
        ...Icon.Default.prototype.options,
        iconUrl: iconUrl,
        iconRetinaUrl: iconRetinaUrl,
        shadowUrl: 'assets/marker-shadow.png'
      })
    });
  }

  latLngToPolyline(data: LatLng[]): Polyline {



    const randomColor = this.getRandomColor();
    // const randomColor = 'red';
    console.log("polyline:" ,polyline(data, {
      color: randomColor
    }));
    return polyline(data, {
      color: randomColor
    });
  }

  private getRandomColor(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  }

  private async getLatLngsFromCommandes(commandes: Commande[]): Promise<LatLng[]> {
    const latLngs: LatLng[] = [];
    for (const commande of commandes) {
      const fullAdresse = this.adresseGouvService.createAddressString(commande.client);
      const result = await this.adresseGouvService.geocode(fullAdresse);
      if (result?.length) {
        latLngs.push(result[0]);
      }
    }
    return latLngs;
  }


  async createMarkersForAvailableCommandes(commandes: Commande[]): Promise<Marker[]> {
    const latLngs = await this.getLatLngsFromCommandes(commandes);
    return latLngs.map(lat => this.latLngToMarker(lat, 'destination'));
  }


  async commandesAddressesToLatLngs(commandes: Commande[]): Promise<LatLng[]> {
    return await this.getLatLngsFromCommandes(commandes);
  }

  async createPolylineForTournee(tournee: LatLng[]): Promise<Polyline | null> {
    try {
      const data = await this.openRouteService.getItinerary(tournee);
      const coordinates = data.features[0].geometry.coordinates;
      const itineraryLatLng = coordinates.map((coord: number[]) => latLng(coord[1], coord[0]));
      return this.latLngToPolyline(itineraryLatLng);
    } catch (error) {
      console.error('Error', error);
      return null;
    }
  }


}