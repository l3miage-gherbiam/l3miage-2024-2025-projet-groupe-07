import { Injectable } from '@angular/core';
import { LatLng, latLng } from 'leaflet';
import { Client } from '../../models/interfaces/client.model';
import { Adresse } from '../../models/interfaces/adresse.model';

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

  createAddressString(adresse: Adresse): string {
    if (adresse.complementAdresse === null) {
      return `${adresse.adressePostal} ${adresse.ville} ${adresse.codePostal}`
    }
    return `${adresse.adressePostal} ${adresse.complementAdresse} ${adresse.ville} ${adresse.codePostal}`;
  }

  async validateAdresses(adresses: Adresse[]): Promise<Adresse[]> {
    const newAdresses = [...adresses];
    
    for (let i = 0; i < adresses.length; i++) {
        try {
            const response = await this.geocode(adresses[i]);
            newAdresses[i].latitude = response[0].lat;
            newAdresses[i].longitude = response[0].lng;
        } catch (error) {
            console.error(`Failed to geocode address: ${adresses[i]}`, error);
        }
    }
    
    return newAdresses;
}

  // Transforme une addresse a un tableau de coordonnées
  async geocode(adresse: Adresse): Promise<LatLng[]> {
    const query = this.createAddressString(adresse).split(' ').join('+');
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
