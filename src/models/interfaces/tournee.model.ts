import { Commande } from './commande.model';
import { EquipeLivreurs } from './equipe-livreurs.model';
import { Client } from './client.model';
import { Planificateur } from './planificateur.model';
import { Camion } from './camion.model';
import { EtatTournee } from '../enums/etat-tournee.enum';

export interface Tournee {
  numTournee: number;
  date: Date;
  etat: EtatTournee;
  equipeLivreur?: EquipeLivreurs;
  commandes: Commande[];

  distanceAParcourir?: number;
  montant?: number;
  tempsDeMontageTheorique?: number;
  tempsDeMontageEffectif?: number;
  camion?: Camion;
  clients?: Client[];
  planificateur?: Planificateur;
}


export interface TourneeDTO {
  numTournee: number;
  date: Date;
  etat: EtatTournee;
  equipeLivreurId: number;
  commandesIds: number[];

  equipeLivreur?: EquipeLivreurs;
  commandes?: Commande[];

  distanceAParcourir?: number;
  montant?: number;
  tempsDeMontageTheorique?: number;
  tempsDeMontageEffectif?: number;
  camion?: Camion;
  clients?: Client[];
  planificateur?: Planificateur;
}
