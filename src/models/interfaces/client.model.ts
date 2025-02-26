import { Adresse } from "./adresse.model";

export interface Client {
    code: string;
    email: string;
    prenom: string;
    nom: string;
    telephone?: string;

    adresse: Adresse;
  }
  