import { Routes } from '@angular/router';
import { TableauDeBordComponent } from './components/tableau-de-bord/tableau-de-bord.component';
import { CommandesComponent } from './components/commandes/commandes.component';
import { GestionDequipesComponent } from './components/gestion-dequipes/gestion-dequipes.component';
import { LoginComponent } from './components/login/login.component';
import { TourneesComponent } from './components/tournees/tournees.component'; 
import { PlanificateurAutomatiqueComponent } from './components/planificateur-automatique/planificateur.component';
import { LivreursComponent } from './components/livreurs/livreurs.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tableau-de-bord', component: TableauDeBordComponent },
  { path: 'livraisons', component: CommandesComponent },
  { path: 'livreurs', component: LivreursComponent },
  { path: 'gestion-dequipes', component: GestionDequipesComponent },
  { path: 'tournees', component: TourneesComponent }, 
  { path: 'planificateur-automatique', component: PlanificateurAutomatiqueComponent }, 
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
];