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
import { commandesExemple,equipesLivreursExample } from '../DUMMY_DATA';


import { EquipeLivreurs } from '../models/interfaces/equipe-livreurs.model';
import { Commande } from '../models/interfaces/commande.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    // MapComponent,
    HeaderComponent,
    RouterModule,
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

  livraisons = signal<Commande[]>(commandesExemple);
  equipeLivreurs = signal<EquipeLivreurs[]>(equipesLivreursExample);
  openRouteService = inject(OpenRouteServiceService);
  adresseGouvService = inject(AdresseGouvService);

  entrepot = signal<LatLng>(latLng(45.1485200, 5.7369725));


  clients = computed(() => this.livraisons().map((livraison) => livraison.client));

  // async ngOnInit() {
  //   this.validateAdresses(this.clients());
  // }


}
