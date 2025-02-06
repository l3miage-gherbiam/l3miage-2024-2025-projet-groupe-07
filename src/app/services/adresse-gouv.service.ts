import { Injectable } from '@angular/core';
import { LatLng, latLng } from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class AdresseGouvService {

  constructor() { }

  // Transforme une addresse a un tableau de coordonnées
  async geocode(
    address: string
  ): Promise<LatLng[]> {
    const addressTable: string[] = address.split(' ');
    let addressToFetchFrom: string =
        'https://api-adresse.data.gouv.fr/search/?q=';
      for (let index = 0; index < addressTable.length - 1; index++) {
        addressToFetchFrom += addressTable[index] + '+';
      }
      addressToFetchFrom += addressTable[addressTable.length - 1];
    try {
      
      const fetchResponse = await fetch(addressToFetchFrom);

      if (!fetchResponse.ok) {
        console.log('Erreur', fetchResponse.statusText);
        return [];
      } 
      const data = await fetchResponse.json();

      return data.features.map((feature: any) => {
        const [lng, lat] = feature.geometry.coordinates;
        return latLng(lat, lng);
      })
    } 
    catch (error) {
      console.log('Erreur', error);
      return [];
    }
  }

}
