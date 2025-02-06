import { Livreur } from "./livreur.model";

export enum StatusEquipeLivreurs {
    EnLivraison = "enLivraison",
    Ready = "pret",
    NonAvailable = "nonDisponible",
  }

export interface EquipeLivreurs{
    id?: string,
    livreurs: Livreur[];
    horaire: string;
    status: StatusEquipeLivreurs;
}