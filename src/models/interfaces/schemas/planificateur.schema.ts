import { z } from "zod";
import { EmployeSchema } from "./employe.schema";

export const PlanificateurSchema = EmployeSchema.extend({
  tournees: z.array(z.any()).optional(),
});

export type Planificateur = z.infer<typeof PlanificateurSchema>;
