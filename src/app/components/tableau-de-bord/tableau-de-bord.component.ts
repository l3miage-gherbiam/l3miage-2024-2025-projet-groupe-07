import { Component, inject, signal } from '@angular/core';
import { DataService } from '../../services/data.service';
import { StatusEquipeLivreurs } from '../../../models/equipeLivreurs.model';

@Component({
  selector: 'app-tableau-de-bord',
  imports: [],
  templateUrl: './tableau-de-bord.component.html',
  styleUrl: './tableau-de-bord.component.scss'
})
export class TableauDeBordComponent {
  nombreDeCommandes = signal<number>(0);
  commandesEffectuees = signal<number>(0);
  commandesEnCours = signal<number>(0);
  commandesEnAttente = signal<number>(0);

  dataService = inject(DataService);

  constructor() {
    this.updateStats();
  }

  updateStats(): void {
    this.nombreDeCommandes.set(this.dataService.getNombreDeCommandes());
    this.commandesEffectuees.set(this.dataService.getCommandesEffectuees());
    this.commandesEnCours.set(this.dataService.getCommandesEnCours());
    this.commandesEnAttente.set(this.dataService.getCommandesEnAttente());
  }
}