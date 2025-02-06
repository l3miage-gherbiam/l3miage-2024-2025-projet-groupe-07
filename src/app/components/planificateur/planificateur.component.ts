import { Component, computed, model, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from '../map/map.component';
import { EquipeLivreurs, StatusEquipeLivreurs } from '../../../models/equipeLivreurs.model';
import { Commande, EtatCommande } from '../../../models/commande.model';
import { Tournee } from '../../../models/tournee.model';
import { GestionDequipesComponent } from '../gestion-dequipes/gestion-dequipes.component';
import { FormsModule } from '@angular/forms';
import { OpenRouteServiceService } from '../../services/open-route-service.service';
import { AdresseGouvService } from '../../services/adresse-gouv.service';
import { LeafletService } from '../../services/leaflet.service';
import { LatLng, latLng } from 'leaflet';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DataService } from '../../services/data.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { CommandesComponent } from '../commandes/commandes.component';

@Component({
  selector: 'app-planificateur',
  standalone: true,
  imports: [CommonModule, MapComponent, CommandesComponent, FormsModule, GestionDequipesComponent, DragDropModule, MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,],
  templateUrl: './planificateur.component.html',
  styleUrls: ['./planificateur.component.scss']
})
export class PlanificateurComponent {
  selectedDate: Date | null = null;
  equipeLivreurs = model<EquipeLivreurs[]>([]);
  commandes = model<Commande[]>([]);
  constructor(public dataService: DataService) {
    this.equipeLivreurs.set(this.dataService.equipeLivreurs());
    this.commandes.set(this.dataService.commandes());
  }
  searchTerm = signal<string>(''); 
  selectedEquipe = signal<EquipeLivreurs | null>(null);
  assignedCommandes = signal<Commande[]>([]);
  showEquipeDropdown = signal<boolean>(false);
  showCommandeDropdown = signal<boolean>(false);
  createdTournees = signal<Tournee[]>([]);
  entrepot = signal<LatLng>(latLng(45.1485200, 5.7369725));
  selectedTournee = signal<Tournee | null>(null);
  

  // afficher que les commandes à planifier et les équipres disponibles dans la page planificateur ( contrainte du jour aussi à rajouter  ?)
  filteredEquipes = computed(() => 
    this.equipeLivreurs().filter(equipe => equipe.status === StatusEquipeLivreurs.Ready)
  );

  filteredCommandes = computed(() => 
    this.commandes().filter(commande => commande.etat === EtatCommande.ouverte
                )
  );
  filteredCommandesForDropdown = computed(() => 
    this.filteredCommandes().filter(commande => 
      commande.client.prenom.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
      commande.client.nom.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
      commande.client.adresse.toLowerCase().includes(this.searchTerm().toLowerCase())
    )
  );
  modifierTournee(tournee: Tournee) {
    this.selectedTournee.set(tournee); 
    this.selectedEquipe.set(tournee.equipe || null); 
    this.assignedCommandes.set([...tournee.commandes]); 
    this.showEquipeDropdown.set(true); 
  }

  toggleEquipeDropdown() {
    this.showEquipeDropdown.set(!this.showEquipeDropdown());
  }

  toggleCommandeDropdown() {
    this.showCommandeDropdown.set(!this.showCommandeDropdown());
  }

  selectEquipe(selectedId: string) {
    const selectedEquipe = this.filteredEquipes().find(equipe => equipe.id === selectedId) || null;
    if (selectedEquipe) {
      this.selectedEquipe.set(selectedEquipe);
      this.equipeLivreurs.update(equipes => equipes.filter(equipe => equipe.id !== selectedId));
      this.assignedCommandes.set([]);
    }
  }
  

  // Assigner une Commande à l'équipe en cours
  assignCommande(commande: Commande) {
    this.assignedCommandes.update(l => [...l, commande]);
    this.commandes.update(commandes => commandes.filter(l => l.id !== commande.id));
  }

  
  // Confirmer la tournée et mettre à jour les signaux pour une nouvellle tournée
  // cahgner le state de la Commande à planifiee
  confirmerTournee() {
    const equipe = this.selectedEquipe();
    if (equipe && this.assignedCommandes().length > 0) {
      const formattedDate = this.ConvertDate();
      const newTournee: Tournee = {
        idTournee: 'T'+String(this.dataService.tournees().length),
        commandes: this.assignedCommandes(),
        equipe: equipe,
        jour: formattedDate,
      };
  
      this.assignedCommandes().forEach(Commande => {
        Commande.etat = EtatCommande.planifiee;
        Commande.dateLivre = formattedDate;
      });
  
      equipe.status = StatusEquipeLivreurs.EnLivraison;
  
      this.createdTournees.update(tournees => [...tournees, newTournee]);
  
      this.dataService.tournees.update(tournees => [...tournees, newTournee]);
  
      this.selectedEquipe.set(null);
      this.assignedCommandes.set([]);
      this.showEquipeDropdown.set(false);
      this.showCommandeDropdown.set(false);
    }
  }

  // update la tournée dans la liste des tournées
  confirmerModification() {
    const tourneeModifiee = this.selectedTournee();
    if (tourneeModifiee) {
      this.createdTournees.update(tournees => 
        tournees.map(t => t.idTournee === tourneeModifiee.idTournee ? { ...t, commandes: this.assignedCommandes() } : t)
      );
      this.dataService.tournees.update(tournees => 
        tournees.map(t => t.idTournee === tourneeModifiee.idTournee ? { ...t, commandes: this.assignedCommandes() } : t)
      );
      this.selectedTournee.set(null);
      this.selectedEquipe.set(null);
      this.assignedCommandes.set([]);
      this.showEquipeDropdown.set(false);
    }
  }

  ConvertDate(): string {
    if (this.selectedDate) {
      const year = this.selectedDate.getFullYear();
      const month = (this.selectedDate.getMonth() + 1).toString().padStart(2, '0');
      const day = this.selectedDate.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return '';
  }













  //------------------------------------------------------------------------------------------------------------------------

  openRouteService = inject(OpenRouteServiceService);
  adresseGouvService = inject(AdresseGouvService);
  leafletService = inject(LeafletService);

  destinationsGeoCode = signal<LatLng[]>([]);
  itenairaire = signal<any[]>([]);

  cheminOptimiseSignal = signal<LatLng[]>([]);

  async creationDestinationsMarkersLatLng(tournee: Tournee): Promise<LatLng[]> {
    let markersLatLng: LatLng[] = [this.entrepot()];
    for (let Commande of tournee.commandes) {
      const fullAdresse = Commande.client.adresse + ' ' + Commande.client.ville;
      const latlng = await this.adresseGouvService.geocode(fullAdresse);
      if (latlng && latlng.length > 0) {
        markersLatLng.push(latlng[0]);
      }
    }
    markersLatLng.push(this.entrepot());
    this.destinationsGeoCode.set(markersLatLng);
    return markersLatLng;
  }
  
  async validerTournee(tournee: Tournee) {
    const markersLatLng = await this.creationDestinationsMarkersLatLng(tournee);
    const response = await this.openRouteService.getItinerary(markersLatLng);
  
    let returnLatLng: LatLng[] = [];
    for (let i = 0; i < response.features.length; i++) {
      returnLatLng.push(...response.features[i].geometry.coordinates.map((coord: number[]) =>
        new LatLng(coord[1], coord[0])
      ));
    }
    this.cheminOptimiseSignal.set([]);
    this.itenairaire.set(returnLatLng);
  
    console.log(this.itenairaire());
  }
  
  async optimiserTournee(tournee: Tournee) {
    const markersLatLng = await this.creationDestinationsMarkersLatLng(tournee);
    const optimizationResponse = await this.openRouteService.getOptimization(markersLatLng);
    console.log("optimisation:", optimizationResponse);
  
    const optimizedRoute = optimizationResponse.routes[0];
    console.log("optimizedRoute:", optimizedRoute);
  
    let cheminOptimise: LatLng[] = [];
    for (let i = 0; i < optimizedRoute.steps.length; i++) {
      const location = optimizedRoute.steps[i].location;
      cheminOptimise.push(new LatLng(location[1], location[0]));
    }
  
    const response = await this.openRouteService.getItinerary(cheminOptimise);
    let returnLatLng: LatLng[] = [];
    for (let i = 0; i < response.features.length; i++) {
      returnLatLng.push(...response.features[i].geometry.coordinates.map((coord: number[]) =>
        new LatLng(coord[1], coord[0])
      ));
    }
    this.itenairaire.set([]);
    this.cheminOptimiseSignal.set(returnLatLng);
  
    console.log("cheminOptimiseSignal", this.cheminOptimiseSignal());
  }
  































  //----------------------------------------------------------------------------------------------
  
  // feature de drag/drop entre commandes et tournées
  drop(event: CdkDragDrop<Commande[]>) {
    const prevId = event.previousContainer.id;
    const currId = event.container.id;
  
    const ID_SOURCE = 'cdk-drop-list-commandes';
    const ID_TARGET = 'cdk-drop-list-assignees';
  
    if (!prevId || !currId) {
      console.error(" Impossible de détecter les IDs des listes !");
      return;
    }
  
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  
    if (prevId === ID_SOURCE && currId === ID_TARGET) {
      const movedItem = event.container.data[event.currentIndex];
      this.commandes.update(cmds => cmds.filter(cmd => cmd.id !== movedItem.id));
      this.assignedCommandes.set([...event.container.data]);
    } 
    else if (prevId === ID_TARGET && currId === ID_SOURCE) {  
      const movedItem = event.container.data[event.currentIndex];
      this.commandes.update(cmds => [...cmds, movedItem]);  
      this.assignedCommandes.set([...event.previousContainer.data]);
    }
  }

}