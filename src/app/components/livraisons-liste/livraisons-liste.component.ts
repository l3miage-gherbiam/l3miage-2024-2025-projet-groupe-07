import { Component, input, model,signal } from '@angular/core';
import { Livraison } from '../../../models/commande.model';
import { Client } from '../../../models/client.model';
import { Tournee } from '../../../models/tournee.model';

@Component({
  selector: 'app-livraisons-liste',
  standalone: true,
  imports: [],
  templateUrl: './livraisons-liste.component.html',
  styleUrl: './livraisons-liste.component.scss'
})
export class LivraisonsListeComponent {

  tourneeActive = model.required<Tournee>();

  livraisonActive = model<Livraison>();
  livraisonActiveIndex = model<number>(0);

}
