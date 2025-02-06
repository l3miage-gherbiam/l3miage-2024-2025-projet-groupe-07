import { Client } from "./client.model";

// src/models/commande.model.ts
export enum EtatCommande {
    ouverte = "ouverte",
    planifiee = "planifiée",
    enLivraison = "enlivraison",
    livree = "livrée",
  }
  

export interface Commande{
    id: string,
    etat: EtatCommande,
    tournee?: string,
    client: Client,
    date?: string,
    horairePreferable?: string,
    dateLivre?: string,
    dateLivraisonEstimee?: string,
}

