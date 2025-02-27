import { Injectable } from "@angular/core";
import { EmployeSchema } from "../schemas/employe.schema";

@Injectable({
  providedIn: "root",
})
export class EmployeService {
  validateEmploye(data: any) {
    return EmployeSchema.safeParse(data);
  }
}
