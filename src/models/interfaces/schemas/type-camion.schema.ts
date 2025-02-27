import { z } from "zod";

export const TypeCamionSchema = z.object({
  nom: z.string().min(3),
  prixKm: z.number().positive(),
  image: z.string().url(),
});

export type TypeCamion = z.infer<typeof TypeCamionSchema>;
