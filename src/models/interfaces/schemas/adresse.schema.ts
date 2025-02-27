import { z } from "zod";

export const AdresseSchema = z.object({
  adressePostal: z.string().min(5, "Adresse trop courte"),
  complementAdresse: z.string().optional(),
  ville: z.string().min(2, "Nom de ville trop court"),
  codePostal: z.number().int().min(1000).max(99999),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export type Adresse = z.infer<typeof AdresseSchema>;
