import { Component, inject, model, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Livreur } from '../../../models/interfaces/livreur.model';
import { BackendCommunicationService } from '../../services/backendCommunication.service';
import { HttpClientModule } from '@angular/common/http';
import { dummyEntrepot } from '../../../DUMMY_DATA';
// Note: Import Agenda and Entrepot if needed for proper typing of default values.

@Component({
  selector: 'app-livreurs',
  imports: [CommonModule, FormsModule],
  templateUrl: './livreurs.component.html',
  styleUrls: ['./livreurs.component.scss']
})
export class LivreursComponent {

  dataService = inject(DataService);
  backendService = inject(BackendCommunicationService);

  // Liste des livreurs (utilisant un signal)
  livreurs = model.required<Livreur[]>();

  // Gestion du modal
  showModal = signal(false);

  // Formulaire pour créer ou modifier un livreur.
  // Le champ "status" ici est utilisé pour l'affichage (avec les valeurs "affecté" / "nonAffecté")
  // et sera converti en la propriété boolean "affecte" lors de la création/modification.
  livreurForm = model<Livreur>({
    nom: '',
    prenom: '',
    telephone: '',
    photoURL: '',
    aPermis: true,
    email: '',
    affecte: false,
    entrepot: dummyEntrepot('blabla'),
    disponibilite: {
      idAgenda: '',
      creneaux: []
    },
    dateExpirationPermis: new Date("2000-01-01"),
    idEmploye: '',
    dateNaissance: new Date("2000-01-01")
  });

  // ID du livreur en cours de modification (null si création)
  editingLivreurId = signal<string | null>(null);

  constructor() {
    // Initialisation des données
    this.initializeData();
  }

  // Initialisation des données
  initializeData(): void {
    // this.backendService.getLivreurs().subscribe(
    //   livreurs => this.livreurs.set(livreurs)
    // );
    this.livreurs.set(this.dataService.livreurs());
  }

  // Créer un nouveau livreur
  creerLivreur(): void {
    const nouveauLivreur: Livreur = {
      idEmploye: this.genererNouvelId(),
      nom: this.livreurForm().nom,
      prenom: this.livreurForm().prenom,
      telephone: this.livreurForm().telephone,
      photoURL: this.livreurForm().photoURL || undefined,
      aPermis: this.livreurForm().aPermis,
      email: this.livreurForm().email,
      // Ici, "entrepot" est récupéré depuis le formulaire comme string.
      // Vous devrez le convertir en un objet Entrepot, ou ajuster le formulaire pour le saisir correctement.
      entrepot: this.livreurForm().entrepot as any,
      // Fournir des valeurs par défaut pour les propriétés requises de Livreur.
      disponibilite: {} as any, // Remplacez ceci par une valeur par défaut appropriée pour Agenda.
      dateExpirationPermis: new Date("2000-01-01"), // Remplacez par la date d'expiration réelle.
      dateNaissance: new Date("2000-01-01"), // Remplacez par la date de naissance réelle.
      affecte: this.livreurForm().affecte === true
    };

    // Ajouter le nouveau livreur à la liste
    this.backendService.postLivreur(nouveauLivreur).subscribe({
      next: (response) => {
        console.log("Livreur posted:", response);
        // Update your state or perform additional logic here.
      },
      error: (error) => {
        console.error("Error posting livreur:", error);
      }
    });
    // if resonse =200{
    this.livreurs.update(old => [...old, nouveauLivreur]);
    this.dataService.livreurs.update(old => [...old, nouveauLivreur]);
  
    // Fermer le modal et réinitialiser le formulaire
    this.showModal.set(false);
    this.livreurForm.set({
      nom: '',
      prenom: '',
      telephone: '',
      photoURL: '',
      aPermis: true,
      email: '',
      affecte: false,
      entrepot: dummyEntrepot('blabla'),
      disponibilite: {
        idAgenda: '',
        creneaux: []
      },
      dateExpirationPermis: new Date("2000-01-01"),
      idEmploye: '',
      dateNaissance: new Date("2000-01-01")
    });
  }

  // Modifier un livreur existant
  modifierLivreur(id: string): void {
    const livreur = this.livreurs().find(l => l.idEmploye === id);
    if (livreur) {
      this.livreurForm.set({
        nom: livreur.nom,
        prenom: livreur.prenom,
        telephone: livreur.telephone,
        photoURL: livreur.photoURL || '',
        aPermis: livreur.aPermis,
        email: livreur.email,
        entrepot: livreur.entrepot,
        disponibilite: livreur.disponibilite,
        dateExpirationPermis: livreur.dateExpirationPermis,
        idEmploye: livreur.idEmploye,
        dateNaissance: livreur.dateNaissance,
        affecte: livreur.affecte
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
        idEmploye: id,
        nom: this.livreurForm().nom,
        prenom: this.livreurForm().prenom,
        telephone: this.livreurForm().telephone,
        photoURL: this.livreurForm().photoURL || undefined,
        aPermis: this.livreurForm().aPermis,
        email: this.livreurForm().email,
        entrepot: this.livreurForm().entrepot as any,
        disponibilite: {} as any, // Remplacez par la valeur réelle de l'agenda si nécessaire.
        dateExpirationPermis: new Date("2000-01-01"), // Remplacez par la date réelle d'expiration.
        dateNaissance: new Date("2000-01-01"), // Remplacez par la date réelle de naissance.
        affecte: this.livreurForm().affecte
      };

      // Mettre à jour la liste des livreurs
      this.livreurs.update(old => old.map(livreur => {
        if (livreur.idEmploye === id) {
          return livreurModifie;
        }
        return livreur;
      }));

      this.dataService.livreurs.update(old => old.map(livreur => {
        if (livreur.idEmploye === id) {
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
        aPermis: true,
        email: '',
        affecte: false,
        entrepot: dummyEntrepot('blabla'),
        disponibilite: {
          idAgenda: '',
          creneaux: []
        },
        dateExpirationPermis: new Date("2000-01-01"),
        idEmploye: '',
        dateNaissance: new Date("2000-01-01")
      });
    }
  }

  // Supprimer un livreur
  supprimerLivreur(id: string): void {
    this.livreurs.update(old => old.filter(livreur => livreur.idEmploye !== id));
    this.dataService.livreurs.update(old => old.filter(livreur => livreur.idEmploye !== id));
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
      aPermis: true,
      email: '',
      affecte: false,
      entrepot: dummyEntrepot('blabla'),
      disponibilite: {
        idAgenda: '',
        creneaux: []
      },
      dateExpirationPermis: new Date("2000-01-01"),
      idEmploye: '',
      dateNaissance: new Date("2000-01-01")
    });
  }

  // Générer un nouvel ID pour un livreur
  genererNouvelId(): string {
    let dernier = 0;
    this.livreurs().forEach(livreur => {
      const num = livreur.idEmploye ? parseInt(livreur.idEmploye.replace(/[^\d]/g, ''), 10) : 0;
      if (num > dernier) {
        dernier = num;
      }
    });
    return 'L' + (dernier + 1);
  }
}
