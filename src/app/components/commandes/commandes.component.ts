import { Component, inject, model, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Commande } from '../../../models/interfaces/commande.model';
import { BackendCommunicationService } from '../../services/backendCommunication.service';
import { AdresseGouvService } from '../../services/adresse-gouv.service';
import { EtatCommande } from '../../../models/enums/etat-commande.enum';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-commandes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.scss']
})
export class CommandesComponent {

  dataService = inject(DataService);

  // Signal contenant les commandes
  commandes = signal<Commande[]>([]);
  // Signal pour l'affichage du modal d'édition
  showEditModal = signal(false);
  editingCommandeReference = signal<number | null>(null);
  commandeForm = model<Commande>(this.getDefaultCommandeForm());

  // Signaux pour afficher le modal d'information sur le client
  showClientModal = signal(false);
  clientDetail = signal<any | null>(null);

  // Signaux pour afficher le modal d'information sur l'adresse
  showAdresseModal = signal(false);
  adresseDetail = signal<any | null>(null);


  selectedTab = signal<'dates' | 'client' | 'adresse'>('dates');

  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  EtatCommande = EtatCommande;

  backendService = inject(BackendCommunicationService);
  adresseGouvService = inject(AdresseGouvService);

  constructor() {
    this.dataService.isDataLoaded().subscribe(loaded => {
      if (loaded) {
        this.commandes.set(this.dataService.commandes());
      }
    });
  }

  private getDefaultCommandeForm(): Commande {
    return {
      reference: 0,
      etat: EtatCommande.OUVERTE,
      date: new Date(),
      horairePreferable: new Date().toISOString(),
      dateLivre: undefined,
      dateLivraisonEstimee: new Date().toISOString(),
      montantTotal: undefined,
      client: {
        code: '',
        email: '',
        prenom: '',
        nom: '',
        telephone: undefined,
        adresse: {
          adressePostal: '',
          complementAdresse: undefined,
          ville: '',
          codePostal: 0,
          latitude: 0,
          longitude: 0
        }
      },
      tournee: null,
      entrepot: null
    };
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
      case 'reference':
        return item.reference;
      case 'date':
        return item.date || '';
      case 'client':
        return (item.client.prenom + ' ' + item.client.nom).toLowerCase();
      case 'adresse':
        return this.adresseGouvService.createAddressString(item.client.adresse);
      case 'horairePreferable':
        return item.horairePreferable || '';
      case 'dateEstimee':
        return item.dateLivraisonEstimee || '';
      case 'etat':
        return item.etat;
      default:
        return '';
    }
  }

  // Ouvre le modal affichant les informations complètes du client
  voirDetailClient(client: any): void {
    this.clientDetail.set(client);
    this.showClientModal.set(true);
  }

  closeClientModal(): void {
    this.showClientModal.set(false);
    this.clientDetail.set(null);
  }

  // Ouvre le modal affichant les informations complètes de l'adresse
  voirDetailAdresse(adresse: any): void {
    this.adresseDetail.set(adresse);
    this.showAdresseModal.set(true);
  }

  closeAdresseModal(): void {
    this.showAdresseModal.set(false);
    this.adresseDetail.set(null);
  }

  // Ouvre le modal pour modifier la commande
  modifierCommande(reference: number): void {
    const commande = this.commandes().find(c => c.reference === reference);
    if (commande) {
      this.commandeForm.set(commande);
      this.editingCommandeReference.set(reference);
      this.selectedTab.set('dates'); // Set default tab to "dates"
      this.showEditModal.set(true);
    }
  }
  

  // Sauvegarde la modification de la commande
  enregistrerModification(): void {
    const reference = this.editingCommandeReference();
    if (reference) {
      const commandeModifie = this.commandeForm();
            
      const commandeToSend = {
        ...commandeModifie
      };

      console.log('Sending to backend:', commandeToSend);
      
      this.backendService.putCommande(commandeToSend).subscribe({
        next: (res: Commande) => {
          console.log('Received from backend:', res);
          if (res) {
            // Update the local state with the response from the server
            this.commandes.update(old => old.map(c => 
              c.reference === reference ? {...res} : c
            ));
            this.annulerModification();
          } else {
            console.error('Backend returned null or undefined response');
          }
        },
        error: err => {
          console.error("Erreur lors de la modification de la commande :", err);
        }
      });
    }
}

  annulerModification(): void {
    this.showEditModal.set(false);
    this.editingCommandeReference.set(null);
    this.commandeForm.set(this.getDefaultCommandeForm());
  }
}
