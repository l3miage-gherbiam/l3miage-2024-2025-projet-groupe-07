import { z } from "zod";
import { TypeCamionSchema } from "./type-camion.schema";
import { EntrepotSchema } from "./entrepot.schema";

export const CamionSchema = z.object({
  code: z.string().min(3),
  immatriculation: z.string().min(6),
  typeCamion: TypeCamionSchema,
  entrepot: EntrepotSchema.optional(),
});

export type Camion = z.infer<typeof CamionSchema>;
