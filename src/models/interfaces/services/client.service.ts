import { Injectable } from "@angular/core";
import { ClientSchema } from "../schemas/client.schema";

@Injectable({
  providedIn: "root",
})
export class ClientService {
  validateClient(data: any) {
    return ClientSchema.safeParse(data);
  }
}
