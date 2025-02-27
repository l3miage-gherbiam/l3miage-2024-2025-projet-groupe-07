import { Injectable } from "@angular/core";
import { CamionSchema } from "../schemas/camion.schema";

@Injectable({
  providedIn: "root",
})
export class CamionService {
  validateCamion(data: any) {
    return CamionSchema.safeParse(data);
  }
}
