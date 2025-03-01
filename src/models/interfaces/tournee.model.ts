import { Commande } from './commande.model';
import { EquipeLivreurs } from './equipe-livreurs.model';
import { Client } from './client.model';
import { Planificateur } from './planificateur.model';
import { Camion } from './camion.model';

export interface Tournee {
  numTournee: number;
  date: Date;
  distanceAParcourir?: number;
  montant?: number;
  tempsDeMontageTheorique?: number;
  tempsDeMontageEffectif?: number;


  camion?: Camion;
  commandes: Commande[];

  equipeLivreur: EquipeLivreurs;

  clients?: Client[];
  planificateur?: Planificateur;
}
