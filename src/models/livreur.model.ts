export interface Livreur{
    id: string,
    nom: string,
    prenom: string,
    telephone: string,
    photoURL?: string,
    email: string,
    entrepot?: string,
    status?: "affecté" | "nonAffecté",
}