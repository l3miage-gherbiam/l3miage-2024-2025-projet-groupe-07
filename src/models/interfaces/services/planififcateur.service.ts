import { Injectable } from "@angular/core";
import { PlanificateurSchema } from "../schemas/planificateur.schema";

@Injectable({
  providedIn: "root",
})
export class PlanificateurService {
  validatePlanificateur(data: any) {
    return PlanificateurSchema.safeParse(data);
  }
}
