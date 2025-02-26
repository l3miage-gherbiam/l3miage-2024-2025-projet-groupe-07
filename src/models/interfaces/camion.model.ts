import { TypeCamion } from "./type-camion.model";
import { Entrepot } from './entrepot.model';

export interface Camion {
  code: string;
  immatriculation: string;

  typeCamion: TypeCamion;

  entrepot?: Entrepot;
}
