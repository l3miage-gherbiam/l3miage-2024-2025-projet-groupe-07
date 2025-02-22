import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { EquipeLivreurs } from '../../../../models/equipeLivreurs.model';
import { Commande } from '../../../../models/commande.model';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    imports: [CommonModule, DragDropModule],
  selector: 'app-drag-drop-selector',
  templateUrl: './drag-drop-selector.component.html',
  styleUrls: ['./drag-drop-selector.component.scss']
})
export class DragDropSelectorComponent {
  @Input() availableLivreurs: EquipeLivreurs[] = [];
  @Input() availableCommandes: Commande[] = [];
  
  // Selected items that the user drops here
  selectedLivreurs: EquipeLivreurs[] = [];
  selectedCommandes: Commande[] = [];
  
  @Output() selectionChange = new EventEmitter<{
    livreurs: EquipeLivreurs[],
    commandes: Commande[]
  }>();

  dropLivreurs(event: CdkDragDrop<EquipeLivreurs[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // When moving from available to selected (or vice versa)
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.emitSelectionChange();
  }

  dropCommandes(event: CdkDragDrop<Commande[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.emitSelectionChange();
  }

  emitSelectionChange() {
    this.selectionChange.emit({
      livreurs: this.selectedLivreurs,
      commandes: this.selectedCommandes
    });
  }
}
