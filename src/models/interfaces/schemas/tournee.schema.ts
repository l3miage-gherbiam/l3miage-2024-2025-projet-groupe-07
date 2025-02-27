import { z } from "zod";

export const TourneeSchema = z.object({
  numTournee: z.number().int().positive(),
  date: z.date(),
  distanceAParcourir: z.number().optional(),
  montant: z.number().optional(),
  tempsDeMontageTheorique: z.number().optional(),
  tempsDeMontageEffectif: z.number().optional(),
  camion: z.any().optional(),
  commandes: z.array(z.any()),
  equipeLivreur: z.any(),
  clients: z.array(z.any()),
  planificateur: z.any().optional(),
});

export type Tournee = z.infer<typeof TourneeSchema>;
