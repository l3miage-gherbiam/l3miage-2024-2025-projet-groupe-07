import { Routes } from '@angular/router';
import { TableauDeBordComponent } from './components/tableau-de-bord/tableau-de-bord.component';
import { CommandesComponent } from './components/commandes/commandes.component';
import { GestionDequipesComponent } from './components/gestion-dequipes/gestion-dequipes.component';
import { PlanificateurComponent } from './components/planificateur/planificateur.component';
import { LoginComponent } from './components/login/login.component';
import { TourneesComponent } from './components/tournees/tournees.component'; 

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tableau-de-bord', component: TableauDeBordComponent },
  { path: 'livraisons', component: CommandesComponent },
  { path: 'gestion-dequipes', component: GestionDequipesComponent },
  { path: 'planificateur', component: PlanificateurComponent },
  { path: 'tournees', component: TourneesComponent }, 
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
];