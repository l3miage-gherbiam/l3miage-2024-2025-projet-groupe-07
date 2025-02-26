import { StatusEquipeLivreurs } from '../enums/status-equipe-livreurs.enum';
import { Agenda } from './agenda.model';
import { Livreur } from './livreur.model';

export interface EquipeLivreurs {
  numEquipe: number;
  status: StatusEquipeLivreurs;
  livreurs: Livreur[];
  agenda?: Agenda;

}


