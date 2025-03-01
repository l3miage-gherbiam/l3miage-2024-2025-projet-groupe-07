import { Injectable, signal,inject } from '@angular/core';
import { Commande } from '../../models/interfaces/commande.model';
import { EquipeLivreurs } from '../../models/interfaces/equipe-livreurs.model';
import { Livreur } from '../../models/interfaces/livreur.model';
import { Tournee } from '../../models/interfaces/tournee.model';
import { StatusEquipeLivreurs } from '../../models/enums/status-equipe-livreurs.enum';
import { BackendCommunicationService, EquipeLivreursDTO } from './backendCommunication.service';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { TypeCreneau } from '../../models/enums/type-creneau.enum';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  // data server is buggy it doesnt show instantly the data for somereason so i will initialize from each component the data

  private backendService = inject(BackendCommunicationService);
  
  private dataLoaded = new BehaviorSubject<boolean>(false);

  commandes = signal<Commande[]>([]);
  equipeLivreurs = signal<EquipeLivreurs[]>([]);
  selectedDate = signal<string | null>(null); 
  livreurs = signal<Livreur[]>([]);

  StatusEquipeLivreurs = StatusEquipeLivreurs;
  tournees = signal<Tournee[]>([]);
  constructor() {
    this.initializeData();
  }
  isDataLoaded() {
    return this.dataLoaded.asObservable();
  }

  private initializeData(): void {
    combineLatest([
      this.backendService.getCommandes(),
      this.backendService.getLivreurs(),
      this.backendService.getEquipeLivreur()
    ]).pipe(
      tap(([commandes, livreurs, equipesDTO]) => {
        // Set all data at once
        this.commandes.set(commandes.sort((a:Commande, b:Commande) => 
          (a.reference) - (b.reference)
        ));
        this.livreurs.set(livreurs);




        // Handle equipes with proper type checking
        if (Array.isArray(equipesDTO) && livreurs.length > 0) {
          try {
            const equipes = this.backendService.equipesLivreursFromDTO(equipesDTO, livreurs);
            if (Array.isArray(equipes) && equipes.every(e => 
              e.numEquipe && 
              e.status && 
              Array.isArray(e.livreurs)
            )) {
              const typedEquipes = equipes.map(e => ({
                ...e,
                status: e.status as StatusEquipeLivreurs,
                agenda: e.agenda ? {
                  ...e.agenda,
                  creneaux: e.agenda.creneaux.map(c => ({
                    ...c,
                    type: c.type as TypeCreneau
                  }))
                } : undefined
              }));
              this.equipeLivreurs.set(typedEquipes);
              console.log('Equipes successfully set:', equipes);
            } else {
              console.error('Invalid equipes structure:', equipes);
              this.equipeLivreurs.set([]);
            }
          } catch (error) {
            console.error('Error converting equipes:', error);
            this.equipeLivreurs.set([]);
          }
        } else {
          console.error('Invalid equipesDTO or no livreurs:', { equipesDTO, livreurs });
          this.equipeLivreurs.set([]);
        }
        


        // Mark data as loaded
        this.dataLoaded.next(true);
      })
    ).subscribe({
      error: (error) => console.error('Error loading data:', error)
    });
  }

  private initializeCommandes(): void {
    this.backendService.getCommandes().subscribe({
      next: (commandes: Commande[]) => {
        this.commandes.set(commandes.sort((a, b) => 
          String(a.reference).localeCompare(String(b.reference))
        ));
      },
      error: (error) => console.error('Error loading commandes:', error)
    });
  }

  private initializeLivreurs(): void {
    this.backendService.getLivreurs().subscribe({
      next: (livreurs: Livreur[]) => {
        this.livreurs.set(livreurs);
      },
      error: (error) => console.error('Error loading livreurs:', error)
    });
  }

  private initializeEquipeLivreurs(): void {
    this.backendService.getLivreurs().subscribe({
      next: (livreurs) => {
        const nonAffectes = livreurs.filter((l: Livreur) => !l.affecte);

        this.backendService.getEquipeLivreur().subscribe({
          next: (equipes) => {
            if (Array.isArray(equipes)) {
              const equ = this.backendService.equipesLivreursFromDTO(equipes, livreurs) as EquipeLivreurs[];
              this.equipeLivreurs.set(equ);
            } else {
              console.error('Réponse invalide de getEquipeLivreur:', equipes);
            }
          },
          error: (err) => console.error('Erreur lors de la récupération des équipes:', err)
        });
      },
      error: (err) => console.error('Erreur lors de la récupération des livreurs:', err)
    });
  }


  getNombreDeCommandes(): number {
    return this.commandes().length;
  }

  getCommandesEffectuees(): number {
    return this.commandes().filter(l => l.etat === 'LIVREE').length;
  }

  getCommandesEnCours(): number {
    return this.commandes().filter(l => l.etat === 'EN_LIVRAISON').length;
  }

  getCommandesEnAttente(): number {
    return this.commandes().filter(l => l.etat === 'OUVERTE').length;
  }
}