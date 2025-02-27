import { Injectable } from "@angular/core";
import { AgendaSchema } from "../schemas/agenda.schema";

@Injectable({
  providedIn: "root",
})
export class AgendaService {
  validateAgenda(data: any) {
    return AgendaSchema.safeParse(data);
  }
}
