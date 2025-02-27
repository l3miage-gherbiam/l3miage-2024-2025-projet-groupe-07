import { z } from "zod";
import { CreneauSchema } from "./creneau.schema";

export const AgendaSchema = z.object({
  idAgenda: z.string().uuid(),
  creneaux: z.array(CreneauSchema),
});

export type Agenda = z.infer<typeof AgendaSchema>;
