import { Component, inject, signal,model,computed,OnInit } from '@angular/core';
import { MapComponent } from './components/map/map.component';
import { LatLng,latLng } from 'leaflet';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { OpenRouteServiceService } from './services/open-route-service.service';
import { AdresseGouvService } from './services/adresse-gouv.service';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component'
import { TourneesComponent } from './components/tournees/tournees.component'
import { PlanificateurAutomatiqueComponent } from './components/planificateur-automatique/planificateur.component';
import { HeaderComponent } from './components/header/header.component';
import { TableauDeBordComponent } from './components/tableau-de-bord/tableau-de-bord.component';
import { CommandesComponent } from './components/commandes/commandes.component';
import { GestionDequipesComponent } from './components/gestion-dequipes/gestion-dequipes.component';


import { EquipeLivreurs } from '../models/interfaces/equipe-livreurs.model';
import { Commande } from '../models/interfaces/commande.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    // MapComponent,
    HeaderComponent,
    RouterModule,
    HttpClientModule,
    // TourneesComponent,
    MatSlideToggleModule,
    // TableauDeBordComponent,
    CommandesComponent,
    // GestionDequipesComponent,
    // LoginComponent,
    // PlanificateurAutomatiqueComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  commandes = signal<Commande[]>([]);
  equipeLivreurs = signal<EquipeLivreurs[]>([]);
  openRouteService = inject(OpenRouteServiceService);
  adresseGouvService = inject(AdresseGouvService);
  dataService = inject(DataService);
  entrepot = signal<LatLng>(latLng(45.1485200, 5.7369725));


  // constructor() {
  //   this.dataService.isDataLoaded().subscribe(loaded => {
  //     if (loaded) {
  //       this.commandes.set(this.dataService.commandes());
  //       this.equipeLivreurs.set(this.dataService.equipeLivreurs());

  //       // this.validateAddresses();

  //     }
  //   });
  // }

  // private async validateAddresses(): Promise<void> {
  //   try {
  //     const addresses = this.commandes().map(c => c.client.adresse);
  //     console.log('Addresses to validate:', addresses);
      
  //     const newAddresses = await this.adresseGouvService.validateAdresses(addresses);
  //     console.log('Validated addresses:', newAddresses);
  //   } catch (error) {
  //     console.error('Error validating addresses:', error);
  //   }
  // }


}
