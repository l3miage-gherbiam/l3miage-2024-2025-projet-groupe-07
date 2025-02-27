import { Injectable } from '@angular/core';
import { LatLng, latLng } from 'leaflet';
import { Client } from '../../models/interfaces/client.model';
import { Livreur } from '../../models/interfaces/livreur.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// import { TourneeDetailed } from '../../models/tourneeDetailed.model';


@Injectable({
  providedIn: 'root'
})
export class BackendCommunicationService {

  constructor(private http: HttpClient) { }

  getLivreurs() : Observable<any> {
    return this.http.get("http://localhost:8080/api/livreur")
  }

  postLivreur(livreur : Livreur) : Observable<any> {
    return this.http.post("http://localhost:8080/api/livreur", livreur)
  }
}


