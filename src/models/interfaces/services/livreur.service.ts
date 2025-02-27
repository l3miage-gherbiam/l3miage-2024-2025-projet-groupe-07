import { Injectable } from "@angular/core";
import { LivreurSchema } from "../schemas/livreur.schema";

@Injectable({
  providedIn: "root",
})
export class LivreurService {
  validateLivreur(data: any) {
    return LivreurSchema.safeParse(data);
  }
}
