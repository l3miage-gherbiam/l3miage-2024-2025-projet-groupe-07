import { z } from "zod";

export const EmployeSchema = z.object({
  idEmploye: z.string().uuid(),
  nom: z.string().min(2),
  prenom: z.string().min(2),
  telephone: z.string().min(10),
  email: z.string().email(),
  dateNaissance: z.date(),
  photoURL: z.string().url().optional(),
});

export type Employe = z.infer<typeof EmployeSchema>;
