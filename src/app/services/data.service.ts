import { Injectable, signal } from '@angular/core';
import { Commande } from '../../models/commande.model';
import { EquipeLivreurs } from '../../models/equipeLivreurs.model';
import { commandesExemple, equipesLivreursExample , livreursExemple} from '../../DUMMY_DATA';
import { Livreur } from '../../models/livreur.model';
import { Tournee } from '../../models/tournee.model';
import { StatusEquipeLivreurs } from '../../models/equipeLivreurs.model';

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
    return this.commandes().filter(l => l.etat === 'livrée').length;
  }

  getCommandesEnCours(): number {
    return this.commandes().filter(l => l.etat === 'enlivraison').length;
  }

  getCommandesEnAttente(): number {
    return this.commandes().filter(l => l.etat === 'ouverte').length;
  }
}