import { Injectable } from '@angular/core';
import { LatLng, latLng } from 'leaflet';
import { Client } from '../../models/interfaces/client.model';
import { Livreur } from '../../models/interfaces/livreur.model';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
    return this.http.post<Livreur>("http://localhost:8080/api/livreur", livreur).pipe(
        catchError(this.handleError)
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('❌ Erreur réseau : API injoignable.', error.error);
    } else {
      console.error(`❌ Erreur HTTP ${error.status}:`, error.error);
    }

    // ✅ Message personnalisé pour l'utilisateur
    return throwError(() => new Error('⚠️ Impossible de récupérer les données. Vérifiez l’URL et réessayez.'));
  }
}


