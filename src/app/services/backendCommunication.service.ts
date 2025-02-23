import { Injectable } from '@angular/core';
import { LatLng, latLng } from 'leaflet';
import { Client } from '../../models/client.model';
import { TourneeDetailed } from '../../models/tourneeDetailed.model';


@Injectable({
  providedIn: 'root'
})
export class BackendCommunicationService {

  constructor() { }

  async submitTourneeDetailed(tourneeDetailed: TourneeDetailed) {
    let body = tourneeDetailed;
    console.log('body', body);
    try {
      const fetchResponse = await fetch(
        "http://localhost:8080/postTourneeDetailed",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body)
        }
      );
      console.log('request sent: fetchResponse', fetchResponse);
      if (!fetchResponse.ok) {
        console.error('Erreur', fetchResponse.statusText);
        return;
      }

    }
    catch (error) {
      console.error('Erreur', error);
      return;
    }
  }
  }


