import { Commande } from "./commande.model";
import { EquipeLivreurs } from "./equipeLivreurs.model";

export interface Tournee{
    commandes: Commande[];
    equipe?: EquipeLivreurs;
    idTournee?: string,
    camion?: string,
    jour?: string,
    entrepot?: string,
    distanceAParcourir?: number,
    montant?: number,
    tempsDeMontageTheorique?: number,
    TempsDeMontageEffectif?: number
}