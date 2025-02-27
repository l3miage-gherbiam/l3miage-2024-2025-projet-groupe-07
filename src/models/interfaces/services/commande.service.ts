import { Injectable } from "@angular/core";
import { CommandeSchema } from "../schemas/commande.schema";

@Injectable({
  providedIn: "root",
})
export class CommandeService {
  validateCommande(data: any) {
    return CommandeSchema.safeParse(data);
  }
}
