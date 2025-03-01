import { Component, inject, model, signal , OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Livreur } from '../../../models/interfaces/livreur.model';
import { BackendCommunicationService } from '../../services/backendCommunication.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-livreurs',
  imports: [CommonModule, FormsModule],
  templateUrl: './livreurs.component.html',
  styleUrls: ['./livreurs.component.scss']
})
export class LivreursComponent {


  backendService = inject(BackendCommunicationService);
  dataService = inject(DataService);
  livreurs = model.required<Livreur[]>();
  showModal = signal(false);
  editingLivreurId = signal<string | null>(null);

  private getDefaultLivreurForm(): Livreur {
    return {
      nom: '',
      prenom: '',
      telephone: '',
      photoURL: '',
      apermis: true,
      email: '',
      affecte: false,
      entrepot: {
        nom: 'entroptTest',
      },
      disponibilite: { idAgenda: '', creneaux: [] },
      dateExpirationPermis: new Date("1970-01-01"),
      idEmploye: '',
      dateNaissance: new Date("1970-01-01")
    };
  }

  livreurForm = model<Livreur>(this.getDefaultLivreurForm());

  constructor() {
    this.dataService.isDataLoaded().subscribe(loaded => {
      if (loaded) {
    this.livreurs.set(this.dataService.livreurs());      }
  });
  }


  private resetLivreurForm(): void {
    this.livreurForm.set(this.getDefaultLivreurForm());
  }

  private getLivreurFromForm(id?: string): Livreur {
    return {
      idEmploye: id ? id : this.genererNouvelId(),
      nom: this.livreurForm().nom,
      prenom: this.livreurForm().prenom,
      telephone: this.livreurForm().telephone,
      photoURL: this.livreurForm().photoURL || undefined,
      apermis: this.livreurForm().apermis,
      email: this.livreurForm().email,
      entrepot: this.livreurForm().entrepot as any,
      disponibilite: {} as any,
      dateExpirationPermis: this.livreurForm().dateExpirationPermis,
      dateNaissance: this.livreurForm().dateNaissance,
      affecte: this.livreurForm().affecte
    };
  }

  creerLivreur(): void {
    const nouveauLivreur = this.getLivreurFromForm();
    this.backendService.postLivreur(nouveauLivreur).subscribe({
        next: (res: any) => {
            if (res) {
                console.log("Livreur posté avec succès :", res);
                const livreurToAdd = res.data || nouveauLivreur;
                this.livreurs.update(current => [...current, livreurToAdd]);
                this.showModal.set(false);
                this.resetLivreurForm();
            } else {
                console.error("Erreur dans la réponse du POST :", res);
            }
        },
        error: (err) => {
            console.error("Erreur lors de l'envoi du livreur :", err);
        },
        complete: () => {
            this.showModal.set(false);
            this.resetLivreurForm();
        }
    });
}

  modifierLivreur(id: string): void {
    const livreur = this.livreurs().find(l => l.idEmploye === id);
    if (livreur) {
      this.livreurForm.set({
        nom: livreur.nom,
        prenom: livreur.prenom,
        telephone: livreur.telephone,
        photoURL: livreur.photoURL || '',
        apermis: livreur.apermis,
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

  enregistrerModification(): void {
    const id = this.editingLivreurId();
    if (id) {
      const livreurModifie = this.getLivreurFromForm(id);
      this.backendService.putLivreur(livreurModifie).subscribe({
        next: (res: any) => { console.log("Livreur modifié avec succès :", res); 
          this.livreurs.update(old => old.map(l => l.idEmploye === id ? livreurModifie : l));
        },
        error: (err) => { console.error("Erreur lors de la modification du livreur :", err); }
      });
      console.log("Livreur modifié :", livreurModifie);
      this.showModal.set(false);
      this.editingLivreurId.set(null);
      this.resetLivreurForm();
    }
  }

  annulerCreation(): void {
    this.showModal.set(false);
    this.editingLivreurId.set(null);
    this.resetLivreurForm();
  }

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
