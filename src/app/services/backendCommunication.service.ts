import { Injectable } from '@angular/core';
import { LatLng, latLng } from 'leaflet';
import { Client } from '../../models/interfaces/client.model';
import { Livreur } from '../../models/interfaces/livreur.model';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EquipeLivreurs } from '../../models/interfaces/schemas/equipe-livreurs.schema';
import { StatusEquipeLivreurs } from '../../models/enums/status-equipe-livreurs.enum';
import { Agenda } from '../../models/interfaces/schemas/agenda.schema';
import { map } from 'rxjs/operators';

// import { TourneeDetailed } from '../../models/tourneeDetailed.model';

interface EquipeLivreursDTO {
  numEquipe: number;
  status: string;
  livreursIds: string[];
  agenda?: Agenda;
}

interface CreateEquipeLivreursDTO {
  numEquipe: number;
  status: string;
  livreurs: Livreur[];
  agenda?: Agenda | null;
}

@Injectable({
  providedIn: 'root'
})
export class BackendCommunicationService {

  constructor(private http: HttpClient) { }

  // Livreur
  getLivreurs() : Observable<any> {
    return this.http.get("http://localhost:8080/api/livreur")
  }

  postLivreur(livreur : Livreur) : Observable<any> {
    return this.http.post<Livreur>("http://localhost:8080/api/livreur", livreur).pipe(catchError(this.handleError))
  }

  putLivreur(livreur : Livreur) : Observable<any> {
    return this.http.put<Livreur>(`http://localhost:8080/api/livreur/${livreur.idEmploye}`, livreur).pipe(catchError(this.handleError))
  }

  // async postLivreur(livreur: Livreur): Promise<any> {
  //   const response = await fetch('http://localhost:8080/api/livreur', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(livreur)
  //   }
  //   );
  //   return response.json();
  // }



  // EquipeLivreur
  

  getEquipeLivreur(): Observable<EquipeLivreursDTO[]> {
    return this.http.get<EquipeLivreursDTO[]>("http://localhost:8080/api/equipes");
  }

  equipeLivreursFromDTO(dto: EquipeLivreursDTO, allLivreurs: Livreur[]): EquipeLivreurs {
    const equipeLivreurs: EquipeLivreurs = {
      numEquipe: dto.numEquipe,
      status: dto.status as StatusEquipeLivreurs,
      livreurs: dto.livreursIds.map(id => allLivreurs.find(l => l.idEmploye === id)!),
      agenda: dto.agenda
    };
    return equipeLivreurs;
  }

  equipesLivreursFromDTO(dto: EquipeLivreursDTO[], allLivreurs: Livreur[]): EquipeLivreurs[] {
    return dto.map(e => this.equipeLivreursFromDTO(e, allLivreurs));
  }


  postEquipeLivreur(dto: CreateEquipeLivreursDTO): Observable<any> {
    return this.http.post<any>("http://localhost:8080/api/equipes", dto)
      .pipe(catchError(this.handleError));
  }

  // postEquipeLivreur(equipeLivreur : EquipeLivreurs) : Observable<any> {
  //   return this.http.post<EquipeLivreurs>("http://localhost:8080/api/equipes", equipeLivreur).pipe(catchError(this.handleError))
  // }

  deleteEquipeLivreur(id : number) : Observable<any> {
    return this.http.delete(`http://localhost:8080/api/equipes/${id}`).pipe(catchError(this.handleError))
  }

  updateEquipeLivreur(equipeLivreur : EquipeLivreurs) : Observable<any> {
    return this.http.put<EquipeLivreurs>(`http://localhost:8080/api/equipes/${equipeLivreur.numEquipe}`, equipeLivreur).pipe(catchError(this.handleError))
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