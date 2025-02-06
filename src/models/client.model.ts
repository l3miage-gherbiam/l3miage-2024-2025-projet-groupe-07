export interface Client{
    code: string,
    email: string,
    prenom: string,
    nom: string,
    telephone?: string,
    adresse: string,
    codePostal: number,
    ville: string,
    latitude: number,
    longitude: number
    etat?: "livrable" | "livré"

}