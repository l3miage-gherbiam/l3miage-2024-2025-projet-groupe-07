import { Component, inject, model, signal } from '@angular/core';
import { EquipeLivreurs, StatusEquipeLivreurs } from '../../../models/equipeLivreurs.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Livreur } from '../../../models/livreur.model';

@Component({
  selector: 'app-livreurs',
  imports: [CommonModule, FormsModule],
  templateUrl: './livreurs.component.html',
  styleUrl: './livreurs.component.scss'
})
export class LivreursComponent {


  dataService = inject(DataService);

  // Liste des livreurs (utilisant un signal)
  livreurs = model.required<Livreur[]>();

  // Gestion du modal
  showModal = signal(false);

  // Formulaire pour créer ou modifier un livreur
  livreurForm = model<{
    nom: string,
    prenom: string,
    telephone: string,
    photoURL: string,
    email: string,
    entrepot: string,
    status: "affecté" | "nonAffecté"
  }>({
    nom: '',
    prenom: '',
    telephone: '',
    photoURL: '',
    email: '',
    entrepot: '',
    status: 'nonAffecté'
  });

  // ID du livreur en cours de modification (null si création)
  editingLivreurId = signal<string | null>(null);

  constructor() {
    // Initialisation des données
    this.initializeData();
  }

  // Initialisation des données
  initializeData(): void {
    // Charger les livreurs depuis le service
    this.livreurs.set(this.dataService.livreurs());
  }

  // Créer un nouveau livreur
  creerLivreur(): void {
    const nouveauLivreur: Livreur = {
      id: this.genererNouvelId(),
      nom: this.livreurForm().nom,
      prenom: this.livreurForm().prenom,
      telephone: this.livreurForm().telephone,
      photoURL: this.livreurForm().photoURL,
      email: this.livreurForm().email,
      entrepot: this.livreurForm().entrepot,
      status: 'nonAffecté'
    };

    // Ajouter le nouveau livreur à la liste
    this.livreurs.update(old => [...old, nouveauLivreur]);
    this.dataService.livreurs.update(old => [...old, nouveauLivreur]);

    // Fermer le modal et réinitialiser le formulaire
    this.showModal.set(false);
    this.livreurForm.set({
      nom: '',
      prenom: '',
      telephone: '',
      photoURL: '',
      email: '',
      entrepot: '',
      status: 'nonAffecté'
    });
  }

  // Modifier un livreur existant
  modifierLivreur(id: string): void {
    const livreur = this.livreurs().find(l => l.id === id);
    if (livreur) {
      this.livreurForm.set({
        nom: livreur.nom,
        prenom: livreur.prenom,
        telephone: livreur.telephone,
        photoURL: livreur.photoURL || '',
        email: livreur.email,
        entrepot: livreur.entrepot || '',
        status: 'nonAffecté'
      });
      this.editingLivreurId.set(id);
      this.showModal.set(true);
    }
  }

  // Enregistrer les modifications d'un livreur
  enregistrerModification(): void {
    const id = this.editingLivreurId();
    if (id) {
      const livreurModifie: Livreur = {
        id: id,
        nom: this.livreurForm().nom,
        prenom: this.livreurForm().prenom,
        telephone: this.livreurForm().telephone,
        photoURL: this.livreurForm().photoURL,
        email: this.livreurForm().email,
        entrepot: this.livreurForm().entrepot,
        status: this.livreurForm().status
      };

      // Mettre à jour la liste des livreurs
      this.livreurs.update(old => old.map(livreur => {
        if (livreur.id === id) {
          return livreurModifie;
        }
        return livreur;
      }));

      this.dataService.livreurs.update(old => old.map(livreur => {
        if (livreur.id === id) {
          return livreurModifie;
        }
        return livreur;
      }));

      // Fermer le modal et réinitialiser le formulaire
      this.showModal.set(false);
      this.editingLivreurId.set(null);
      this.livreurForm.set({
        nom: '',
        prenom: '',
        telephone: '',
        photoURL: '',
        email: '',
        entrepot: '',
        status: 'nonAffecté'
      });
    }
  }

  // Supprimer un livreur
  supprimerLivreur(id: string): void {
    this.livreurs.update(old => old.filter(livreur => livreur.id !== id));
    this.dataService.livreurs.update(old => old.filter(livreur => livreur.id !== id));
  }

  // Annuler la création ou la modification
  annulerCreation(): void {
    this.showModal.set(false);
    this.editingLivreurId.set(null);
    this.livreurForm.set({
      nom: '',
      prenom: '',
      telephone: '',
      photoURL: '',
      email: '',
      entrepot: '',
      status: 'nonAffecté'
    });
  }

  // Générer un nouvel ID pour un livreur
  genererNouvelId(): string {
    let dernier = 0;
    this.livreurs().forEach(livreur => {
      const num = livreur.id ? parseInt(livreur.id.replace(/[^\d]/g, ''), 10) : 0;
      if (num > dernier) dernier = num;
    });
    return 'L' + (dernier + 1);
  }

}
