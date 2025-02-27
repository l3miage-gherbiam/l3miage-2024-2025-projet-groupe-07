import { Injectable } from "@angular/core";
import { AdresseSchema } from "../schemas/adresse.schema";

@Injectable({
  providedIn: "root",
})
export class AdresseService {
  validateAdresse(data: any) {
    return AdresseSchema.safeParse(data);
  }
}
