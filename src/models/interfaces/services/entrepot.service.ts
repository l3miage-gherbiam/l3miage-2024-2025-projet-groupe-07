import { Injectable } from "@angular/core";
import { EntrepotSchema } from "../schemas/entrepot.schema";

@Injectable({
  providedIn: "root",
})
export class EntrepotService {
  validateEntrepot(data: any) {
    return EntrepotSchema.safeParse(data);
  }
}
