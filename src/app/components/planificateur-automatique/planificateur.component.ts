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
import { BackendCommunicationService } from '../../services/backendCommunication.service';
import { Tournee, TourneeDTO } from '../../../models/interfaces/tournee.model';
import { EtatTournee } from '../../../models/enums/etat-tournee.enum';
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
  commandesOuvertes = signal<Commande[]>([]);

  openRouteService = inject(OpenRouteServiceService);
  adresseGouvService = inject(AdresseGouvService);
  leafletService = inject(LeafletService);
  backendService = inject(BackendCommunicationService);

  constructor(public dataService: DataService) {
    this.dataService.isDataLoaded().subscribe(loaded => {
      if (loaded) {
    this.equipeLivreurs.set(this.dataService.equipeLivreurs());
    this.commandes.set(this.dataService.commandes());
    this.commandesOuvertes.set(this.commandes().filter(commande => commande.etat === 'OUVERTE'));
    }
  });
  }

  
  
  

  handleSelectionChange(selection: { livreurs: EquipeLivreurs[], commandes: Commande[] }) {

    this.selectedEquipes.set(selection.livreurs);
    this.selectedCommandes.set(selection.commandes);
  }

  // fix numTournee

  async creerTournees(): Promise<void> {

    let tournees: Tournee[] = [];

    const optimizationResponse = await this.openRouteService.getOptimizationAutmatique(this.selectedCommandes(),this.selectedEquipes(),this.entrepot());
    console.log('optimizationResponse', optimizationResponse);

    const optimizedRoutes = optimizationResponse.routes;  
  
    let cheminsOptimise: LatLng[][] = [];
    let numTournee = 20;
    let j = 0;
    for(let route of optimizedRoutes){
      let cheminOptimise: LatLng[] = [];

      let commandesOrderById: number[] = [];

      for (let i = 0; i < route.steps.length; i++) {
      const location = route.steps[i].location;
      let commandeId = 0;
      if (route.steps[i].id !== undefined){
        commandeId = route.steps[i].id;
        commandesOrderById.push(commandeId);

      }
      cheminOptimise.push(new LatLng(location[1], location[0]));


      
    }
    console.log('commandesOrderById',j,commandesOrderById);
    
    console.log('selected equipe',j, this.selectedEquipes()[j]);
    tournees.push({
      date: new Date(2024, 2, 5, 10, 0, 0), // Year, Month (0-11), Day, Hours, Minutes, Seconds
      equipeLivreur: this.selectedEquipes()[j],
      commandes: commandesOrderById.map(commandeId => this.selectedCommandes().find(commande => commande.reference === commandeId)).filter((commande): commande is Commande => commande !== undefined),
      numTournee: numTournee++,
      etat: EtatTournee.EN_ATTENTE
    }
    );
    cheminsOptimise.push(cheminOptimise);
    j++;
  }
  this.createdTourneesSignal.set(cheminsOptimise);
  console.log('ss',this.createdTourneesSignal());

  console.log('tournees', tournees);

  for (let tournee of tournees) {
    let tourneeDTO:TourneeDTO = {
      numTournee: tournee.numTournee,
      date: tournee.date,
      etat: tournee.etat,
      equipeLivreurId: tournee.equipeLivreur?.numEquipe ? tournee.equipeLivreur.numEquipe : 0,
      commandesIds: tournee.commandes.map(commande => commande.reference)
    };
    console.log('tournee', tourneeDTO);
  this.backendService.postTournee(tourneeDTO).subscribe(() => {
    console.log('Tournee créée');
  });
  // affecte commendes put (affected = true)
    }

}


  
  

}