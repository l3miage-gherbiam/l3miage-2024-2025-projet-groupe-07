import { Injectable } from '@angular/core';
import { LatLng, latLng } from 'leaflet';
import { Client } from '../../models/client.model';

interface GeoFeature {
  geometry: {
    coordinates: [number, number];
  };
}

interface GeoResponse {
  features: GeoFeature[];
}

@Injectable({
  providedIn: 'root'
})
export class AdresseGouvService {

  constructor() { }

  createAddressString(client: Client): string {
    return `${client.adresse} ${client.ville}`;
  }

  // Transforme une addresse a un tableau de coordonnées
  async geocode(address: string): Promise<LatLng[]> {
    const query = address.split(' ').join('+');
    const url = `https://api-adresse.data.gouv.fr/search/?q=${query}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error('Erreur', response.statusText);
        return [];
      }
      const data: GeoResponse = await response.json();
      return data.features.map(feature => {
        const [lng, lat] = feature.geometry.coordinates;
        return latLng(lat, lng);
      });
    } catch (error) {
      console.error('Erreur', error);
      return [];
    }
  }

}
