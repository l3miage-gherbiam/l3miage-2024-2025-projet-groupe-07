import { Injectable, signal } from '@angular/core';
import { Commande } from '../../models/interfaces/commande.model';
import { EquipeLivreurs } from '../../models/interfaces/equipe-livreurs.model';
import { commandesExemple, equipesLivreursExample , livreursExemple} from '../../DUMMY_DATA';
import { Livreur } from '../../models/interfaces/livreur.model';
import { Tournee } from '../../models/interfaces/tournee.model';
import { StatusEquipeLivreurs } from '../../models/enums/status-equipe-livreurs.enum';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  commandes = signal<Commande[]>(commandesExemple);
  equipeLivreurs = signal<EquipeLivreurs[]>(equipesLivreursExample);
  selectedDate = signal<string | null>(null); 
  livreurs = signal<Livreur[]>(livreursExemple);

  StatusEquipeLivreurs = StatusEquipeLivreurs;
  tournees = signal<Tournee[]>([]);


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