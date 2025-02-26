import { Livreur } from './livreur.model';
import { Camion } from './camion.model';
import { Commande } from './commande.model';
import { Adresse } from './adresse.model';

export interface Entrepot {
  nom: string;

  adresse?: Adresse;
  
  livreurs?: Livreur[];

  camions?: Camion[];

  commandes?: Commande[];
}
