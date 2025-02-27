import { Injectable } from "@angular/core";
import { CreneauSchema } from "../schemas/creneau.schema";

@Injectable({
  providedIn: "root",
})
export class CreneauService {
  validateCreneau(data: any) {
    return CreneauSchema.safeParse(data);
  }
}
