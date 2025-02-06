import { Component, inject, model, signal } from '@angular/core';
import { EquipeLivreurs, StatusEquipeLivreurs } from '../../../models/equipeLivreurs.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Livreur } from '../../../models/livreur.model';

@Component({
  selector: 'app-gestion-dequipes',
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-dequipes.component.html',
  styleUrl: './gestion-dequipes.component.scss'
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
  equipeForm = model({
    livreur1: '',
    livreur2: '',
    horaire: '8-17h',
    status: StatusEquipeLivreurs.Ready
  });

  // ID de l'équipe en cours de modification (null si création)
  editingEquipeId = signal<string | null>(null);

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
    const livreursDisponibles = this.dataService.livreurs().filter(l => l.status === 'nonAffecté');
    this.availableLivreurs.set(livreursDisponibles);
  }

  // Créer une nouvelle équipe
  creerEquipe(): void {
    const livreur1 = this.dataService.livreurs().find(l => l.id === this.equipeForm().livreur1);
    const livreur2 = this.dataService.livreurs().find(l => l.id === this.equipeForm().livreur2);

    if (livreur1 && livreur2) {
      const nouvelleEquipe: EquipeLivreurs = {
        id: this.genererNouvelId(),
        livreurs: [livreur1, livreur2],
        horaire: this.equipeForm().horaire,
        status: this.equipeForm().status
      };

      // Mettre à jour le statut des livreurs
      livreur1.status = 'affecté';
      livreur2.status = 'affecté';

      // Mettre à jour la liste des équipes
      this.equipeLivreurs.update(old => [...old, nouvelleEquipe]);
      this.dataService.equipeLivreurs.update(old => [...old, nouvelleEquipe]);

      // Mettre à jour la liste des livreurs disponibles
      this.updateAvailableLivreurs();

      // Fermer le modal
      this.showModal.set(false);
      this.equipeForm.set({ livreur1: '', livreur2: '', horaire: '8-17h', status: StatusEquipeLivreurs.Ready });
    }
  }

  // Modifier une équipe existante
  modifierEquipe(id: string): void {
    const equipe = this.equipeLivreurs().find(e => e.id === id);
    if (equipe) {
      this.equipeForm.set({
        livreur1: equipe.livreurs[0].id,
        livreur2: equipe.livreurs[1].id,
        horaire: equipe.horaire,
        status: equipe.status
      });
      this.editingEquipeId.set(id);
      this.showModal.set(true);
    }
  }

  // Enregistrer les modifications d'une équipe
  enregistrerModification(): void {
    const id = this.editingEquipeId();
    if (id) {
      const livreur1 = this.dataService.livreurs().find(l => l.id === this.equipeForm().livreur1);
      const livreur2 = this.dataService.livreurs().find(l => l.id === this.equipeForm().livreur2);

      if (livreur1 && livreur2) {
        const equipeModifiee: EquipeLivreurs = {
          id: id,
          livreurs: [livreur1, livreur2],
          horaire: this.equipeForm().horaire,
          status: this.equipeForm().status
        };

        // Rendre "nonAffecté" les livreurs qui ne sont plus dans l'équipe
        const ancienneEquipe = this.equipeLivreurs().find(e => e.id === id);
        if (ancienneEquipe) {
          ancienneEquipe.livreurs.forEach(livreur => {
            if (livreur.id !== livreur1.id && livreur.id !== livreur2.id) {
              livreur.status = 'nonAffecté';
            }
          });
        }

        // Mettre à jour le statut des nouveaux livreurs
        livreur1.status = 'affecté';
        livreur2.status = 'affecté';

        // Mettre à jour la liste des équipes
        this.equipeLivreurs.update(old => old.map(equipe => {
          if (equipe.id === id) {
            return equipeModifiee;
          }
          return equipe;
        }));

        // Mettre à jour la liste des livreurs disponibles
        this.updateAvailableLivreurs();

        // Fermer le modal
        this.showModal.set(false);
        this.editingEquipeId.set(null);
        this.equipeForm.set({ livreur1: '', livreur2: '', horaire: '8-17h', status: StatusEquipeLivreurs.Ready });
      }
    }
  }

  // Supprimer une équipe
  supprimerEquipe(id: string): void {
    const equipe = this.equipeLivreurs().find(e => e.id === id);
    if (equipe) {
      // Rendre "nonAffecté" les livreurs de l'équipe
      equipe.livreurs.forEach(livreur => {
        livreur.status = 'nonAffecté';
      });

      // Supprimer l'équipe de la liste
      this.equipeLivreurs.update(old => old.filter(e => e.id !== id));

      // Mettre à jour la liste des livreurs disponibles
      this.updateAvailableLivreurs();
    }
  }

  // Annuler la création ou la modification
  annulerCreation(): void {
    this.showModal.set(false);
    this.editingEquipeId.set(null);
    this.equipeForm.set({ livreur1: '', livreur2: '', horaire: '8-17h', status: StatusEquipeLivreurs.Ready });
  }

  // Générer un nouvel ID pour une équipe
  genererNouvelId(): string {
    let dernier = 0;
    this.equipeLivreurs().forEach(equipe => {
      const num = equipe.id ? parseInt(equipe.id.replace(/[^\d]/g, ''), 10) : 0;
      if (num > dernier) dernier = num;
    });
    return 'T' + (dernier + 1);
  }
}