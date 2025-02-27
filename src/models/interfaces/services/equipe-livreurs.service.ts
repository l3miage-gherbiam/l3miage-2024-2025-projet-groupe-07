import { Injectable } from "@angular/core";
import { EquipeLivreursSchema } from "../schemas/equipe-livreurs.schema";

@Injectable({
  providedIn: "root",
})
export class EquipeLivreursService {
  validateEquipeLivreurs(data: any) {
    return EquipeLivreursSchema.safeParse(data);
  }
}
