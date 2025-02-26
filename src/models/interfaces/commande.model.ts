import { EtatCommande } from '../enums/etat-commande.enum';
import { Client } from './client.model';
import { Tournee } from './tournee.model';
import { Entrepot } from './entrepot.model';

export interface Commande {
  reference: string;
  etat: EtatCommande;
  date?: Date;
  // date?: Date ou string;
  horairePreferable?: string;
  dateLivre?: Date;
  dateLivraisonEstimee?: string;
  montantTotal?: number;
  client: Client;

  tournee?: Tournee | null;

  entrepot?: Entrepot | null;
}
