import { Component, signal, inject } from '@angular/core';
import { Commande } from '../../../models/commande.model';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-livraisons',
  imports: [CommonModule],
  templateUrl: './commandes.component.html',
  styleUrl: './commandes.component.scss'
})
export class CommandesComponent {
  commandes = signal<Commande[]>([]);

  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  dataService = inject(DataService);

  constructor() {
    this.commandes.set(this.dataService.commandes());
  }

  sortedCommandes(): Commande[] {
    const items = [...this.commandes()];
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

  getFieldValue(item: Commande, column: string): any {
    switch (column) {
      case 'id':
        return parseInt(item.id.replace(/[^\d]/g, ''), 10);
      case 'date':
        return item.date || '';
      case 'client':
        return (item.client.prenom + ' ' + item.client.nom).toLowerCase();
      case 'adresse':
        return item.client.adresse.toLowerCase();
      case 'telephone':
        return item.client.telephone;
      case 'horairePreferable':
        return item.horairePreferable || '';
      case 'dateLivre':
        return item.dateLivre || '';
      case 'dateEstimee':
        return item.dateLivraisonEstimee || '';
      case 'etat':
        return item.etat;
      default:
        return '';
    }
  }
}