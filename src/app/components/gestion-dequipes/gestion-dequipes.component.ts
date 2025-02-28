import { Component, inject, model, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EquipeLivreurs } from '../../../models/interfaces/equipe-livreurs.model';
import { Livreur } from '../../../models/interfaces/livreur.model';
import { StatusEquipeLivreurs } from '../../../models/enums/status-equipe-livreurs.enum';
import { BackendCommunicationService } from '../../services/backendCommunication.service';

@Component({
  selector: 'app-gestion-dequipes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-dequipes.component.html',
  styleUrls: ['./gestion-dequipes.component.scss']
})
export class GestionDequipesComponent {

  // button modifier et supprimer ne marchent pas encore

  private backendService = inject(BackendCommunicationService);

  equipeLivreurs = model.required<EquipeLivreurs[]>();
  livreursDispos = model<Livreur[]>([]);

  showModal = signal(false);
  editingEquipeId = signal<number | null>(null);

  equipeForm = model({
    livreur1: '',
    livreur2: '',
    status: StatusEquipeLivreurs.PRET
  });

  StatusEquipeLivreurs = StatusEquipeLivreurs;

  constructor() {
    this.initializeData();
  }

  private initializeData(): void {
    this.backendService.getLivreurs().subscribe({
      next: (livreurs) => {
        const nonAffectes = livreurs.filter((l: Livreur) => !l.affecte);
        this.livreursDispos.set(nonAffectes);

        this.backendService.getEquipeLivreur().subscribe({
          next: (equipes) => {
            if (Array.isArray(equipes)) {
              const equ = this.backendService.equipesLivreursFromDTO(equipes, livreurs) as EquipeLivreurs[];
              this.equipeLivreurs.set(equ);
            } else {
              console.error('Réponse invalide de getEquipeLivreur:', equipes);
            }
          },
          error: (err) => console.error('Erreur lors de la récupération des équipes:', err)
        });
      },
      error: (err) => console.error('Erreur lors de la récupération des livreurs:', err)
    });
  }

  private getDefaultEquipeForm() {
    return {
      livreur1: '',
      livreur2: '',
      status: StatusEquipeLivreurs.PRET
    };
  }

  creerEquipe(): void {
    const form = this.equipeForm();
    if (!form.livreur1 || !form.livreur2) {
      return console.error('Veuillez sélectionner deux livreurs.');
    }
  
    const selectedLivreurs = this.livreursDispos().filter(l =>
      [form.livreur1, form.livreur2].includes(l.idEmploye)
    );
  
    const nouvelleEquipeDTO = {
      numEquipe: this.genererNouvelId(),
      status: form.status,
      livreurs: selectedLivreurs,
      agenda: null
    };
  
    console.log('Sending DTO:', nouvelleEquipeDTO);
  
    this.backendService.postEquipeLivreur(nouvelleEquipeDTO).subscribe({
      next: (res) => {
        if (res) {
          this.markLivreursAffecte([form.livreur1, form.livreur2]);
  
          const equipeCree: EquipeLivreurs = {
            numEquipe: res.numEquipe,
            status: res.status,
            livreurs: selectedLivreurs,
            agenda: res.agenda
          };
  
          if (equipeCree.numEquipe && equipeCree.livreurs.length === 2) {
            this.equipeLivreurs.update(old => [...old, equipeCree]);
            this.showModal.set(false);
            this.equipeForm.set(this.getDefaultEquipeForm());
          } else {
            console.error('Invalid équipe data received from server');
          }
        }
      },
      error: (err) => console.error('Erreur lors de la création de l\'équipe:', err)
    });
  }

  modifierEquipe(numEquipe: number): void {
    const equipe = this.equipeLivreurs().find(e => e.numEquipe === numEquipe);
    if (!equipe || equipe.livreurs.length < 2) {
      return console.error('Impossible de modifier: équipe introuvable ou pas assez de livreurs.');
    }

    this.equipeForm.set({
      livreur1: equipe.livreurs[0].idEmploye,
      livreur2: equipe.livreurs[1].idEmploye,
      status: equipe.status
    });
    this.editingEquipeId.set(numEquipe);
    this.showModal.set(true);
  }

  enregistrerModification(): void {
    const numEquipe = this.editingEquipeId();
    if (numEquipe === null) return;

    const form = this.equipeForm();
    const equipeModifiee: EquipeLivreurs = {
      numEquipe,
      status: form.status,
      livreurs: []
    };

    this.backendService.updateEquipeLivreur(equipeModifiee).subscribe({
      next: (res) => {
        if (res) {
          const updated = res.data || equipeModifiee;
          this.equipeLivreurs.update(old =>
            old.map(eq => eq.numEquipe === numEquipe ? updated : eq)
          );
          this.showModal.set(false);
          this.editingEquipeId.set(null);
          this.equipeForm.set(this.getDefaultEquipeForm());
        }
      },
      error: (err) => console.error('Erreur lors de la mise à jour de l\'équipe:', err),
      complete: () => {
        this.showModal.set(false);
        this.editingEquipeId.set(null);
        this.equipeForm.set(this.getDefaultEquipeForm());
      }
    });
  }

  supprimerEquipe(numEquipe: number): void {
    if (!confirm(`Voulez-vous vraiment supprimer l'équipe #${numEquipe} ?`)) return;

    this.backendService.deleteEquipeLivreur(numEquipe).subscribe({
      next: () => {
        this.equipeLivreurs.update(old => old.filter(e => e.numEquipe !== numEquipe));
      },
      error: (err) => console.error('Erreur lors de la suppression de l\'équipe:', err)
    });
  }

  annulerCreation(): void {
    this.showModal.set(false);
    this.editingEquipeId.set(null);
    this.equipeForm.set(this.getDefaultEquipeForm());
  }

  private genererNouvelId(): number {
    let dernier = 0;
    this.equipeLivreurs().forEach(equipe => {
      const num = equipe.numEquipe || 0;
      if (num > dernier) {
        dernier = num;
      }
    });
    return dernier + 1;
  }

  private markLivreursAffecte(ids: string[]): void {
    const livreur1 = this.livreursDispos().find(l => l.idEmploye === ids[0]);
    const livreur2 = this.livreursDispos().find(l => l.idEmploye === ids[1]);
    if (livreur1 && livreur2) {
      this.backendService.putLivreur({ ...livreur1, affecte: true }).subscribe({
        next: () => {
          this.backendService.putLivreur({ ...livreur2, affecte: true }).subscribe({
            next: () => {
              this.livreursDispos.update(old =>
                old.map(l => ids.includes(l.idEmploye) ? { ...l, affecte: true } : l)
              );
            },
            error: (err) => console.error('Error updating livreur 2:', err)
          });
        },
        error: (err) => console.error('Error updating livreur 1:', err)
      });
    } else {
      console.error('Unable to find livreurs to update');
    }
  }
}
