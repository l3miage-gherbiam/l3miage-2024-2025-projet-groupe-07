import { Employe } from './employe.model';
import { Tournee } from './tournee.model';

export interface Planificateur extends Employe {
  tournees?: Tournee[];

}
