import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Tournee } from '../../../models/tournee.model';

@Component({
  selector: 'app-tournees',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tournees.component.html',
  styleUrls: ['./tournees.component.scss']
})
export class TourneesComponent {
  tournees = signal<Tournee[]>([]);

  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  dataService = inject(DataService);

  constructor() {
    this.tournees.set(this.dataService.tournees());
  }

  sortedTournees(): Tournee[] {
    const items = [...this.tournees()];
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
        return item.idTournee || '';
      case 'jour':
        return item.jour || '';
      case 'equipe':
        return item.equipe?.id || '';
      case 'camion':
        return item.camion || '';
      case 'distanceAParcourir':
        return item.distanceAParcourir || 0;
      default:
        return '';
    }
  }

  trackById(index: number, item: Tournee): string {
    return item.idTournee|| '';;
  }
}