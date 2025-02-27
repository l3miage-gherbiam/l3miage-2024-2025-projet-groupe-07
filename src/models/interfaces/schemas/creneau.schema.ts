import { z } from "zod";

export const CreneauSchema = z.object({
  idCreneau: z.string().uuid(),
  dateDebut: z.date(),
  dateFin: z.date(),
  type: z.string(),
});

export type Creneau = z.infer<typeof CreneauSchema>;
