import { Component, model, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from '../map/map.component';
import { EquipeLivreurs } from '../../../models/interfaces/equipe-livreurs.model';
import { Commande } from '../../../models/interfaces/commande.model';
import { FormsModule } from '@angular/forms';
import { OpenRouteServiceService } from '../../services/open-route-service.service';
import { AdresseGouvService } from '../../services/adresse-gouv.service';
import { LeafletService } from '../../services/leaflet.service';
import { LatLng, latLng } from 'leaflet';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DataService } from '../../services/data.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { DragDropSelectorComponent } from './drag-drop-selector/drag-drop-selector.component';
// import { TourneeDetailed } from '../../../models/tourneeDetailed.model';
// import { BackendCommunicationService } from '../../services/backendCommunication.service';

@Component({
  selector: 'app-planificateur-automatique',
  standalone: true,
  imports: [CommonModule, MapComponent, FormsModule, DragDropModule, MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DragDropSelectorComponent
  ],
  templateUrl: './planificateur.component.html',
  styleUrls: ['./planificateur.component.scss']
})
export class PlanificateurAutomatiqueComponent {
  equipeLivreurs = model<EquipeLivreurs[]>([]);
  commandes = model<Commande[]>([]);
  entrepot = signal<LatLng>(latLng(45.1485200, 5.7369725));
  destinationsGeoCode = signal<LatLng[]>([]);
  itenairaire = signal<any[]>([]);
  cheminOptimiseSignal = signal<LatLng[]>([]);
  selectedEquipes = signal<EquipeLivreurs[]>([]);
  selectedCommandes = signal<Commande[]>([]);
  createdTourneesSignal = signal<LatLng[][]>([]);

  openRouteService = inject(OpenRouteServiceService);
  adresseGouvService = inject(AdresseGouvService);
  leafletService = inject(LeafletService);
  // backendService = inject(BackendCommunicationService);

  constructor(public dataService: DataService) {
    this.equipeLivreurs.set(this.dataService.equipeLivreurs());
    this.commandes.set(this.dataService.commandes());
  }
  

  handleSelectionChange(selection: { livreurs: EquipeLivreurs[], commandes: Commande[] }) {

    this.selectedEquipes.set(selection.livreurs);
    this.selectedCommandes.set(selection.commandes);
  }


  // tourneeDetailed = computed<TourneeDetailed>(() => ({
  //   tourneeInfo: {
  //     commandes: this.selectedCommandes(),
  //     idTournee: '1',
  //   },
  //   destinations: this.createdTourneesSignal()[0]
  // }));



  async creerTournees() {

    // create a table of LatLng for the markers of the selected commandes
    // commandesAddressesToLatLngs(commandes: Commande[]): LatLng[]
    const markersLatLng = await this.leafletService.commandesAddressesToLatLngs(this.selectedCommandes());


    const optimizationResponse = await this.openRouteService.getOptimizationAutmatique(markersLatLng,this.selectedEquipes(),this.entrepot());
    console.log('optimizationResponse', optimizationResponse);

    const optimizedRoutes = optimizationResponse.routes;  
  
    let cheminsOptimise: LatLng[][] = [];


    for(let route of optimizedRoutes){
      let cheminOptimise: LatLng[] = [];

      //to continue :(
      let commandesOrderById: number[] = [];

      for (let i = 0; i < route.steps.length; i++) {
      const location = route.steps[i].location;
      const commandeId = route.steps[i].id;
      commandesOrderById.push(commandeId);
      cheminOptimise.push(new LatLng(location[1], location[0]));
    }

    cheminsOptimise.push(cheminOptimise);
  }
  this.createdTourneesSignal.set(cheminsOptimise);
  console.log('ss',this.createdTourneesSignal());
  // this.backendService.submitTourneeDetailed(this.tourneeDetailed());

  }


  
  

}