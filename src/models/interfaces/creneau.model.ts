import { TypeCreneau } from "../enums/type-creneau.enum";

export interface Creneau {
  idCreneau: string;
  dateDebut: Date;
  dateFin: Date;
  type: TypeCreneau;
}
