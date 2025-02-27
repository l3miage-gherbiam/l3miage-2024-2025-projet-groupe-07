import { Injectable } from "@angular/core";
import { TourneeSchema } from "../schemas/tournee.schema";

@Injectable({
  providedIn: "root",
})
export class TourneeService {
  validateTournee(data: any) {
    return TourneeSchema.safeParse(data);
  }
}
