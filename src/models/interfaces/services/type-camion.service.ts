import { Injectable } from "@angular/core";
import { TypeCamionSchema } from "../schemas/type-camion.schema";

@Injectable({
  providedIn: "root",
})
export class TypeCamionService {
  validateTypeCamion(data: any) {
    return TypeCamionSchema.safeParse(data);
  }
}
