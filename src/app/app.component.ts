import { Component, inject, signal,model,computed,OnInit } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { LatLng,latLng,tileLayer } from 'leaflet';
import { FeatureCollection, Geometry } from 'geojson';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Commande } from '../models/commande.model';
import { Client } from '../models/client.model';
import { Tournee } from '../models/tournee.model';
import { OpenRouteServiceService } from './services/open-route-service.service';
import { TableauDeBordComponent } from './components/tableau-de-bord/tableau-de-bord.component';
import { CommandesComponent } from './components/commandes/commandes.component';
import { GestionDequipesComponent } from './components/gestion-dequipes/gestion-dequipes.component';
import { commandesExemple,equipesLivreursExample } from '../DUMMY_DATA';
import { EquipeLivreurs} from '../models/equipeLivreurs.model';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component'
import { TourneesComponent } from './components/tournees/tournees.component'
import { PlanificateurAutomatiqueComponent } from './components/planificateur-automatique/planificateur.component';
import { TourneeDetailed } from '../models/tourneeDetailed.model';
import { AdresseGouvService } from './services/adresse-gouv.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    MapComponent,
    HeaderComponent,
    RouterModule,
    TourneesComponent,
    MatSlideToggleModule,
    TableauDeBordComponent,
    CommandesComponent,
    GestionDequipesComponent,
    LoginComponent,
    PlanificateurAutomatiqueComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  livraisons = signal<Commande[]>(commandesExemple);
  equipeLivreurs = signal<EquipeLivreurs[]>(equipesLivreursExample);
  openRouteService = inject(OpenRouteServiceService);
  adresseGouvService = inject(AdresseGouvService);

  entrepot = signal<LatLng>(latLng(45.1485200, 5.7369725));

  // To change Client with adresses list , this function should be executed ina service after post request when adding a new client
  validateAdresses(clients: Client[]): void {
    const adresses = clients.map((client) => this.adresseGouvService.createAddressString(client));
    
    for(const address of adresses){
    this.adresseGouvService.geocode(address).then((response) => {
      this.livraisons.update((livraisons) => {
        const newLivraisons = [...livraisons];
        const index = newLivraisons.findIndex((livraison) => this.adresseGouvService.createAddressString(livraison.client) === address);
        if (index !== -1) {
          newLivraisons[index].client.latitude = response[0].lat;
          newLivraisons[index].client.latitude = response[0].lng;
        }
        return newLivraisons;
      })
    });
  }
  }

  clients = computed(() => this.livraisons().map((livraison) => livraison.client));

  async ngOnInit() {
    this.validateAdresses(this.clients());
  }



}
