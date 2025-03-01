import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Tournee, TourneeDTO } from '../../../models/interfaces/tournee.model';
import { BackendCommunicationService } from '../../services/backendCommunication.service';
import { EquipeLivreurs } from '../../../models/interfaces/equipe-livreurs.model';
import { Commande } from '../../../models/interfaces/commande.model';

@Component({
  selector: 'app-tournees',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tournees.component.html',
  styleUrls: ['./tournees.component.scss']
})
export class TourneesComponent {
  tournees = signal<Tournee[]>([]);
  backendService = inject(BackendCommunicationService);
  commandes = signal<Commande[]>([]);
  equipeLivreurs = signal<EquipeLivreurs[]>([]);

  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  dataService = inject(DataService);

  constructor() {
    this.intializeData();
  }

  intializeData(): void {
    this.dataService.isDataLoaded().subscribe(loaded => {
      if (loaded) {
        this.commandes.set(this.dataService.commandes());
        this.equipeLivreurs.set(this.dataService.equipeLivreurs());
      }
    });
    

    this.backendService.getTournees().subscribe((tournees: TourneeDTO[]) => {
      this.tournees.set(this.backendService.tourneesfromDTO(tournees,this.commandes(),this.equipeLivreurs()));
    });

  }

  sortedTournees(): Tournee[] {
    const items = [...this.tournees()];
    console.log(items.map(t => t.commandes));
    if (!this.sortColumn) {
      return items;
    }
    items.sort((a, b) => {
      const aVal = this.getFieldValue(a, this.sortColumn);
      const bVal = this.getFieldValue(b, this.sortColumn);
      if (aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    return items;
  }

  sortBy(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  getFieldValue(item: Tournee, column: string): any {
    switch (column) {
      case 'idTournee':
        return item.numTournee || '';
      case 'jour':
        return item.date || '';
      case 'equipe':
        return item.equipeLivreur?.numEquipe || '';
      case 'camion':
        return item.camion || '';
      case 'distanceAParcourir':
        return item.distanceAParcourir || 0;
      default:
        return '';
    }
  }

  trackById(index: number, item: Tournee): number {
    return item.numTournee ?? undefined ;;
  }
}