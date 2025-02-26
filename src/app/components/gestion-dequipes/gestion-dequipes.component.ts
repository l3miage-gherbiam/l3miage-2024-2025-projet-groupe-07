import { Component, inject, model, signal } from '@angular/core';
import { EquipeLivreurs } from '../../../models/interfaces/equipe-livreurs.model';
import { StatusEquipeLivreurs } from '../../../models/enums/status-equipe-livreurs.enum';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Livreur } from '../../../models/interfaces/livreur.model';

@Component({
  selector: 'app-gestion-dequipes',
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-dequipes.component.html',
  styleUrls: ['./gestion-dequipes.component.scss']
})
export class GestionDequipesComponent {
  dataService = inject(DataService);

  // Liste des équipes (utilisant un signal)
  equipeLivreurs = model.required<EquipeLivreurs[]>();

  // Liste des livreurs disponibles (utilisant un signal)
  availableLivreurs = model<Livreur[]>([]);

  // Gestion du modal
  showModal = signal(false);

  // Formulaire pour créer ou modifier une équipe
  // Note : nous incluons ici le statut, mais retirons la propriété "horaire" qui n'existe pas dans EquipeLivreurs.
  equipeForm = model({
    livreur1: '',
    livreur2: '',
    status: StatusEquipeLivreurs.PRET
  });

  // Numéro de l'équipe en cours de modification (null si création)
  editingEquipeId = signal<number | null>(null);

  // Enumération des statuts pour le template
  StatusEquipeLivreurs = StatusEquipeLivreurs;

  constructor() {
    // Initialisation des données
    this.initializeData();
  }

  // Initialisation des données
  initializeData(): void {
    // Charger les équipes depuis le service
    this.equipeLivreurs.set(this.dataService.equipeLivreurs());

    // Charger les livreurs disponibles depuis le service
    this.updateAvailableLivreurs();
  }

  // Mettre à jour la liste des livreurs disponibles
  updateAvailableLivreurs(): void {
    const livreursDisponibles = this.dataService.livreurs().filter(l => l.affecte === false);
    this.availableLivreurs.set(livreursDisponibles);
  }

  // Créer une nouvelle équipe
  creerEquipe(): void {
    const livreur1 = this.dataService.livreurs().find(l => l.idEmploye === this.equipeForm().livreur1);
    const livreur2 = this.dataService.livreurs().find(l => l.idEmploye === this.equipeForm().livreur2);

    if (livreur1 && livreur2) {
      const nouvelleEquipe: EquipeLivreurs = {
        numEquipe: this.genererNouvelId(),
        livreurs: [livreur1, livreur2],
        status: StatusEquipeLivreurs.PRET
      };

      // Mettre à jour le statut des livreurs
      livreur1.affecte = true;
      livreur2.affecte = true;

      // Ajouter l'équipe aux listes locales et dans le service
      this.equipeLivreurs.update(old => [...old, nouvelleEquipe]);
      this.dataService.equipeLivreurs.update(old => [...old, nouvelleEquipe]);

      // Mettre à jour la liste des livreurs disponibles
      this.updateAvailableLivreurs();

      // Fermer le modal et réinitialiser le formulaire
      this.showModal.set(false);
      this.equipeForm.set({ livreur1: '', livreur2: '', status: StatusEquipeLivreurs.PRET });
    }
  }

  // Modifier une équipe existante
  modifierEquipe(numEquipe: number): void {
    const equipe = this.equipeLivreurs().find(e => e.numEquipe === numEquipe);
    if (equipe) {
      this.equipeForm.set({
        livreur1: equipe.livreurs[0].idEmploye,
        livreur2: equipe.livreurs[1].idEmploye,
        status: equipe.status
      });
      this.editingEquipeId.set(numEquipe);
      this.showModal.set(true);
    }
  }

  // Enregistrer les modifications d'une équipe
  enregistrerModification(): void {
    const numEquipe = this.editingEquipeId();
    if (numEquipe !== null) {
      const livreur1 = this.dataService.livreurs().find(l => l.idEmploye === this.equipeForm().livreur1);
      const livreur2 = this.dataService.livreurs().find(l => l.idEmploye === this.equipeForm().livreur2);

      if (livreur1 && livreur2) {
        const equipeModifiee: EquipeLivreurs = {
          numEquipe: numEquipe,
          livreurs: [livreur1, livreur2],
          status: this.equipeForm().status
        };

        // Rendre "nonAffecté" les livreurs qui ne sont plus dans l'équipe
        const ancienneEquipe = this.equipeLivreurs().find(e => e.numEquipe === numEquipe);
        if (ancienneEquipe) {
          ancienneEquipe.livreurs.forEach(livreur => {
            if (livreur.idEmploye !== livreur1.idEmploye && livreur.idEmploye !== livreur2.idEmploye) {
              livreur.affecte = false;
            }
          });
        }

        // Mettre à jour le statut des nouveaux livreurs
        livreur1.affecte = true;
        livreur2.affecte = true;
        // Mettre à jour la liste des équipes
        this.equipeLivreurs.update(old =>
          old.map(equipe => (equipe.numEquipe === numEquipe ? equipeModifiee : equipe))
        );

        // Mettre à jour la liste des livreurs disponibles
        this.updateAvailableLivreurs();

        // Fermer le modal et réinitialiser le formulaire
        this.showModal.set(false);
        this.editingEquipeId.set(null);
        this.equipeForm.set({ livreur1: '', livreur2: '', status: StatusEquipeLivreurs.PRET });
      }
    }
  }

  // Supprimer une équipe
  supprimerEquipe(numEquipe: number): void {
    const equipe = this.equipeLivreurs().find(e => e.numEquipe === numEquipe);
    if (equipe) {
      // Rendre "nonAffecté" les livreurs de l'équipe
      equipe.livreurs.forEach(livreur => {
        livreur.affecte = false;
      });

      // Supprimer l'équipe de la liste
      this.equipeLivreurs.update(old => old.filter(e => e.numEquipe !== numEquipe));

      // Mettre à jour la liste des livreurs disponibles
      this.updateAvailableLivreurs();
    }
  }

  // Annuler la création ou la modification
  annulerCreation(): void {
    this.showModal.set(false);
    this.editingEquipeId.set(null);
    this.equipeForm.set({ livreur1: '', livreur2: '', status: StatusEquipeLivreurs.PRET });
  }

  // Générer un nouvel ID pour une équipe
  genererNouvelId(): number {
    let dernier = 0;
    this.equipeLivreurs().forEach(equipe => {
      const num = equipe.numEquipe || 0;
      if (num > dernier) {
        dernier = num;
      }
    });
    return dernier + 1;
  }
}
