import { Commande } from "./models/interfaces/commande.model";
import { EtatCommande } from "./models/enums/etat-commande.enum";
import { EquipeLivreurs } from "./models/interfaces/equipe-livreurs.model";
import { StatusEquipeLivreurs } from "./models/enums/status-equipe-livreurs.enum";
import { Livreur } from "./models/interfaces/livreur.model";

// Helper functions for dummy objects
const dummyAgenda = (id: string) => ({ idAgenda: id, creneaux: [] });
const dummyEntrepot = (nom: string) => ({ nom });
const dummyTournee = (num: number, dateStr: string) => ({
  numTournee: num,
  date: new Date(dateStr),
  clients: []
});

// Dummy dates used for simplicity
const dummyBirthDate = new Date("1990-01-01");
const dummyExpiration = new Date("2025-01-01");

/**
 * Dummy list of livreurs (6 total)
 */
export const livreursExemple: Livreur[] = [
  {
    idEmploye: "jdd1",
    nom: "Morel",
    prenom: "Aline",
    telephone: "0612345678",
    photoURL: "",
    email: "abr@mobilis.fr",
    dateNaissance: dummyBirthDate,
    disponibilite: dummyAgenda("agenda_jdd1"),
    dateExpirationPermis: dummyExpiration,
    entrepot: dummyEntrepot("Grenis"),
    affecte: true,
    aPermis: true
  },
  {
    idEmploye: "jdd2",
    nom: "Leclerc",
    prenom: "Bruno",
    telephone: "0687654321",
    photoURL: "",
    email: "bcl@mobilis.fr",
    dateNaissance: dummyBirthDate,
    disponibilite: dummyAgenda("agenda_jdd2"),
    dateExpirationPermis: dummyExpiration,
    entrepot: dummyEntrepot("Grenis"),
    affecte: false,
    aPermis: true
  },
  {
    idEmploye: "jdd3",
    nom: "Morin",
    prenom: "Clara",
    telephone: "0678541234",
    photoURL: "",
    email: "cmr@mobilis.fr",
    dateNaissance: dummyBirthDate,
    disponibilite: dummyAgenda("agenda_jdd3"),
    dateExpirationPermis: dummyExpiration,
    entrepot: dummyEntrepot("Grenis"),
    affecte: true,
    aPermis: true
  },
  {
    idEmploye: "jdd4",
    nom: "Gallet",
    prenom: "Denis",
    telephone: "0654987123",
    photoURL: "",
    email: "dgl@mobilis.fr",
    dateNaissance: dummyBirthDate,
    disponibilite: dummyAgenda("agenda_jdd4"),
    dateExpirationPermis: dummyExpiration,
    entrepot: dummyEntrepot("Grenis"),
    affecte: false,
    aPermis: true
  },
  {
    idEmploye: "jdd5",
    nom: "Martin",
    prenom: "Élodie",
    telephone: "0609876543",
    photoURL: "",
    email: "emt@mobilis.fr",
    dateNaissance: dummyBirthDate,
    disponibilite: dummyAgenda("agenda_jdd5"),
    dateExpirationPermis: dummyExpiration,
    entrepot: dummyEntrepot("Grenis"),
    affecte: true,
    aPermis: true
  },
  {
    idEmploye: "jdd6",
    nom: "Rolland",
    prenom: "Félix",
    telephone: "0667123456",
    photoURL: "",
    email: "fro@mobilis.fr",
    dateNaissance: dummyBirthDate,
    disponibilite: dummyAgenda("agenda_jdd6"),
    dateExpirationPermis: dummyExpiration,
    entrepot: dummyEntrepot("Grenis"),
    affecte: false,
    aPermis: true
  }
];

/**
 * Dummy list of EquipeLivreurs
 * Note: We map the original team IDs ("T1", "T2") to numeric values (1, 2) as per our new model.
 * We also include an optional 'horaire' property for convenience.
 */
export const equipesLivreursExample: EquipeLivreurs[] = [
  {
    numEquipe: 1,
    status: StatusEquipeLivreurs.PRET, // "Ready" mapped to PRET
    agenda: dummyAgenda("agenda_T1"),
    livreurs: [
      livreursExemple[0],
      livreursExemple[1]
    ]
  },
  {
    numEquipe: 2,
    status: StatusEquipeLivreurs.EN_LIVRAISON,
    agenda: dummyAgenda("agenda_T2"),
    livreurs: [
      livreursExemple[2],
      livreursExemple[3]
    ]
  }
];


export const commandesExemple: Commande[] = [
  {
    reference: "c001",
    etat: EtatCommande.OUVERTE,
    date: new Date("2024-01-04T16:00:00"),
    horairePreferable: "18:00-20:00",
    dateLivraisonEstimee: "04/01/2024 de 18:00 à 20:00",
    client: {
      code: "x001",
      email: "amartin@wan.fr",
      prenom: "agathe",
      nom: "MARTIN",
      adresse: {
        adressePostal: "332 Route de la Jars",
        ville: "Quaix-en-Chartreuse",
        codePostal: 38950,
        latitude: 45.25666,
        longitude: 5.72195
      }
    }
  },
  {
    reference: "c002",
    etat: EtatCommande.LIVREE,
    date: new Date("2024-01-05T00:00:00"),
    dateLivre: new Date("2024-01-05T02:00:00"),
    client: {
      code: "x052",
      email: "azainab@m6.com",
      prenom: "ahmed",
      nom: "ZAINAB",
      adresse: {
        adressePostal: "9 Chemin des Vouillants",
        ville: "Fontaine",
        codePostal: 38600,
        latitude: 45.187277,
        longitude: 5.672983
      }
    }
  },
  {
    reference: "c004",
    etat: EtatCommande.LIVREE,
    date: new Date("2024-01-09T00:00:00"),
    dateLivre: new Date("2024-01-09T02:00:00"),
    client: {
      code: "x053",
      email: "lsaleh@brt.fr",
      prenom: "aisha",
      nom: "SALEH",
      adresse: {
        adressePostal: "114 Chemin des Pensées",
        ville: "Saint-Martin-d'Uriage",
        codePostal: 38410,
        latitude: 45.140189,
        longitude: 5.833471
      }
    }
  },
  {
    reference: "c005",
    etat: EtatCommande.LIVREE,
    date: new Date("2024-01-11T00:00:00"),
    dateLivre: new Date("2024-01-11T02:00:00"),
    client: {
      code: "x051",
      email: "apascal@or.fr",
      prenom: "agathe",
      nom: "PASCAL",
      adresse: {
        adressePostal: "88 Chemin du Sonnant",
        ville: "Saint-Martin-d'Uriage",
        codePostal: 38410,
        latitude: 45.150744,
        longitude: 5.817776
      }
    }
  },
  {
    reference: "c006",
    etat: EtatCommande.LIVREE,
    date: new Date("2024-02-02T00:00:00"),
    dateLivre: new Date("2024-02-02T02:00:00"),
    client: {
      code: "x163",
      email: "ssharma@but.org",
      prenom: "raj",
      nom: "SHARMA",
      adresse: {
        adressePostal: "2 Rue des Marronniers",
        ville: "Eybens",
        codePostal: 38320,
        latitude: 45.145208,
        longitude: 5.755529
      }
    }
  },
  {
    reference: "c008",
    etat: EtatCommande.LIVREE,
    date: new Date("2024-02-02T00:00:00"),
    dateLivre: new Date("2024-02-02T02:00:00"),
    client: {
      code: "x106",
      email: "ykim@but.org",
      prenom: "ji",
      nom: "KIM",
      adresse: {
        adressePostal: "191 Route de la Ronzière",
        ville: "Saint-Martin-d'Uriage",
        codePostal: 38410,
        latitude: 45.169896,
        longitude: 5.836048
      }
    }
  },
  {
    reference: "c020",
    etat: EtatCommande.OUVERTE,
    date: new Date("2024-02-05T03:30:00"),
    horairePreferable: "18:00-20:00",
    dateLivraisonEstimee: "05/02/2024 de 18:00 à 20:00",
    client: {
      code: "x003",
      email: "lguyot@lp.net",
      prenom: "louna",
      nom: "GUYOT",
      adresse: {
        adressePostal: "17 Avenue du Vercors",
        ville: "Seyssinet-Pariset",
        codePostal: 38170,
        latitude: 45.182207,
        longitude: 5.687907
      }
    }
  },
  {
    reference: "c021",
    etat: EtatCommande.OUVERTE,
    date: new Date("2024-02-05T03:30:00"),
    horairePreferable: "16:00-18:00",
    dateLivraisonEstimee: "05/02/2024 de 16:00 à 18:00",
    client: {
      code: "x002",
      email: "emarchand@ok.fr",
      prenom: "elisa",
      nom: "MARCHAND",
      adresse: {
        adressePostal: "7 Ensemble immobilier du Domaine des Plantées",
        ville: "Biviers",
        codePostal: 38330,
        latitude: 45.233075,
        longitude: 5.804502
      }
    }
  },
  {
    reference: "c022",
    etat: EtatCommande.OUVERTE,
    date: new Date("2024-02-05T03:30:00"),
    horairePreferable: "16:00-18:00",
    dateLivraisonEstimee: "05/02/2024 de 16:00 à 18:00",
    client: {
      code: "x004",
      email: "amohed@brt.fr",
      prenom: "leyla",
      nom: "MOHAMMED",
      adresse: {
        adressePostal: "9 Chemin des Vouillants",
        ville: "Fontaine",
        codePostal: 38600,
        latitude: 45.187277,
        longitude: 5.672983
      }
    }
  },
  {
    reference: "c023",
    etat: EtatCommande.LIVREE,
    date: new Date("2024-02-05T03:30:00"),
    dateLivre: new Date("2024-02-05T05:00:00"),
    client: {
      code: "x163",
      email: "ssharma@but.org",
      prenom: "raj",
      nom: "SHARMA",
      adresse: {
        adressePostal: "2 Rue des Marronniers",
        ville: "Eybens",
        codePostal: 38320,
        latitude: 45.145208,
        longitude: 5.755529
      }
    }
  },
  {
    reference: "c024",
    etat: EtatCommande.LIVREE,
    date: new Date("2024-02-05T03:30:00"),
    dateLivre: new Date("2024-02-05T05:00:00"),
    client: {
      code: "x120",
      email: "lgarnier@lp.net",
      prenom: "lucie",
      nom: "GARNIER",
      adresse: {
        adressePostal: "5 Chemin du Pré",
        ville: "Grenoble",
        codePostal: 38100,
        latitude: 45.161473,
        longitude: 5.726909
      }
    }
  },
  {
    reference: "c040",
    etat: EtatCommande.OUVERTE,
    date: new Date("2024-02-12T03:30:00"),
    horairePreferable: "15:00-17:00",
    dateLivraisonEstimee: "13/02/2024 de 15:00 à 17:00",
    client: {
      code: "x005",
      email: "mkhalid@m6.com",
      prenom: "laila",
      nom: "KHALID",
      adresse: {
        adressePostal: "8 Chemin de la Pissarde",
        ville: "Claix",
        codePostal: 38640,
        latitude: 45.112876,
        longitude: 5.67959
      }
    }
  },
  {
    reference: "c052",
    etat: EtatCommande.OUVERTE,
    date: new Date("2024-02-16T14:00:00"),
    horairePreferable: "16:00-18:00",
    dateLivraisonEstimee: "17/02/2024 de 16:00 à 18:00",
    client: {
      code: "x006",
      email: "lfaure@faure.com",
      prenom: "louise",
      nom: "FAURE",
      adresse: {
        adressePostal: "81 Route du Peuil",
        ville: "Claix",
        codePostal: 38640,
        latitude: 45.130076,
        longitude: 5.64821
      }
    }
  },
  {
    reference: "c081",
    etat: EtatCommande.OUVERTE,
    date: new Date("2024-03-04T13:00:00"),
    horairePreferable: "18:00-20:00",
    dateLivraisonEstimee: "05/03/2024 de 18:00 à 20:00",
    client: {
      code: "x007",
      email: "mbonnet@or.fr",
      prenom: "marie",
      nom: "BONNETO",
      adresse: {
        adressePostal: "3 Chemin du Fangeat",
        ville: "Seyssins",
        codePostal: 38180,
        latitude: 45.159826,
        longitude: 5.663139
      }
    }
  },
  {
    reference: "c086",
    etat: EtatCommande.OUVERTE,
    date: new Date("2024-03-05T17:00:00"),
    horairePreferable: "16:00-18:00",
    dateLivraisonEstimee: "06/02/2024 de 16:00 à 18:00",
    client: {
      code: "x008",
      email: "lmartinez@or.fr",
      prenom: "léo",
      nom: "MARTIN",
      adresse: {
        adressePostal: "Chemin de Charrière",
        ville: "Meylan",
        codePostal: 38240,
        latitude: 45.200435,
        longitude: 5.795018
      }
    }
  },
  {
    reference: "c093",
    etat: EtatCommande.OUVERTE,
    date: new Date("2024-03-08T15:30:00"),
    horairePreferable: "18:00-20:00",
    dateLivraisonEstimee: "09/03/2024 de 18:00 à 20:00",
    client: {
      code: "x009",
      email: "rdubois@gm.fr",
      prenom: "romain",
      nom: "DUBOIS",
      adresse: {
        adressePostal: "10 Allee des Moscaries",
        ville: "Meylan",
        codePostal: 38240,
        latitude: 45.218317,
        longitude: 5.796281
      }
    }
  },
  {
    reference: "c099",
    etat: EtatCommande.LIVREE,
    date: new Date("2024-03-11T13:30:00"),
    dateLivre: new Date("2024-03-11T15:30:00"),
    client: {
      code: "x139",
      email: "ldupuis2@hot.fr",
      prenom: "marie",
      nom: "DUPUIS",
      adresse: {
        adressePostal: "10 Rue Giusto Gervasutti",
        ville: "Grenoble",
        codePostal: 38000,
        latitude: 45.161473,
        longitude: 5.726909
      }
    }
  },
  {
    reference: "c101",
    etat: EtatCommande.LIVREE,
    date: new Date("2024-03-12T13:30:00"),
    dateLivre: new Date("2024-03-12T15:30:00"),
    client: {
      code: "x171",
      email: "rmercier@gm.fr",
      prenom: "romain",
      nom: "MERCIER",
      adresse: {
        adressePostal: "13 Chemin des Combettes",
        ville: "La Tronche",
        codePostal: 38700,
        latitude: 45.217117,
        longitude: 5.745854
      }
    }
  },
  {
    reference: "c103",
    etat: EtatCommande.OUVERTE,
    date: new Date("2024-03-12T13:30:00"),
    horairePreferable: "16:00-18:00",
    dateLivraisonEstimee: "13/03/2024 de 16:00 à 18:00",
    client: {
      code: "x010",
      email: "mjean@lp.net",
      prenom: "marie",
      nom: "JEAN",
      adresse: {
        adressePostal: "486 Route de Laliarey",
        ville: "Engins",
        codePostal: 38360,
        latitude: 45.204845,
        longitude: 5.629185
      }
    }
  },
  {
    reference: "c104",
    etat: EtatCommande.OUVERTE,
    date: new Date("2024-03-12T14:30:00"),
    horairePreferable: "16:00-18:00",
    dateLivraisonEstimee: "13/03/2024 de 16:00 à 18:00",
    client: {
      code: "x013",
      email: "pnicolas@or.fr",
      prenom: "pauline",
      nom: "NICOLAS",
      adresse: {
        adressePostal: "7c Avenue de Kimberley",
        ville: "Échirolles",
        codePostal: 38130,
        latitude: 45.147738,
        longitude: 5.72778
      }
    }
  },
  {
    reference: "c105",
    etat: EtatCommande.OUVERTE,
    date: new Date("2024-03-12T14:30:00"),
    horairePreferable: "17:00-19:00",
    dateLivraisonEstimee: "13/03/2024 de 17:00 à 19:00",
    client: {
      code: "x011",
      email: "aibrahim@but.org",
      prenom: "amir",
      nom: "IBRAHIM",
      adresse: {
        adressePostal: "6ter Rue de Chamechaude",
        ville: "Sassenage",
        codePostal: 38360,
        latitude: 45.206066,
        longitude: 5.684798
      }
    }
  },
  {
    reference: "c106",
    etat: EtatCommande.OUVERTE,
    date: new Date("2024-03-12T14:30:00"),
    horairePreferable: "17:00-19:00",
    dateLivraisonEstimee: "13/03/2024 de 17:00 à 19:00",
    client: {
      code: "x012",
      email: "lmoreau@wan.fr",
      prenom: "lucas",
      nom: "MOREAU",
      adresse: {
        adressePostal: "777 Route de la Mearie",
        ville: "Quaix-en-Chartreuse",
        codePostal: 38950,
        latitude: 45.25468,
        longitude: 5.723202
      }
    }
  },
  {
    reference: "c107",
    etat: EtatCommande.OUVERTE,
    date: new Date("2024-03-13T14:30:00"),
    horairePreferable: "17:00-19:00",
    dateLivraisonEstimee: "14/03/2024 de 17:00 à 19:00",
    client: {
      code: "x014",
      email: "elaroche@lp.net",
      prenom: "emma",
      nom: "LAROCHE",
      adresse: {
        adressePostal: "64 Avenue du Vercors",
        ville: "Fontaine",
        codePostal: 38600,
        latitude: 45.192466,
        longitude: 5.693683
      }
    }
  },
  {
    reference: "c108",
    etat: EtatCommande.OUVERTE,
    date: new Date("2024-03-13T16:00:00"),
    horairePreferable: "17:00-19:00",
    dateLivraisonEstimee: "14/03/2024 de 17:00 à 19:00",
    client: {
      code: "x015",
      email: "lmartin@or.fr",
      prenom: "léo",
      nom: "MARTIN",
      adresse: {
        adressePostal: "Chemin de Charrière",
        ville: "Meylan",
        codePostal: 38240,
        latitude: 45.200435,
        longitude: 5.795018
      }
    }
  },
  {
    reference: "c109",
    etat: EtatCommande.OUVERTE,
    date: new Date("2024-03-13T19:00:00"),
    horairePreferable: "17:00-19:00",
    dateLivraisonEstimee: "14/03/2024 de 17:00 à 19:00",
    client: {
      code: "x012",
      email: "lmoreau@wan.fr",
      prenom: "lucas",
      nom: "MOREAU",
      adresse: {
        adressePostal: "777 Route de la Mearie",
        ville: "Quaix-en-Chartreuse",
        codePostal: 38950,
        latitude: 45.25468,
        longitude: 5.723202
      }
    }
  },
  {
    reference: "c110",
    etat: EtatCommande.OUVERTE,
    date: new Date("2024-03-14T08:00:00"),
    horairePreferable: "17:00-19:00",
    dateLivraisonEstimee: "15/03/2024 de 17:00 à 19:00",
    client: {
      code: "x003",
      email: "lguyot@lp.net",
      prenom: "louna",
      nom: "GUYOT",
      adresse: {
        adressePostal: "17 Avenue du Vercors",
        ville: "Seyssinet-Pariset",
        codePostal: 38170,
        latitude: 45.182207,
        longitude: 5.687907
      }
    }
  },
  {
    reference: "c111",
    etat: EtatCommande.LIVREE,
    date: new Date("2024-03-14T09:00:00"),
    dateLivre: new Date("2024-03-14T11:00:00"),
    client: {
      code: "x099",
      email: "hmartin@hot.fr",
      prenom: "hugo",
      nom: "MARTIN",
      adresse: {
        adressePostal: "57 Chemin du Vieux Chêne",
        ville: "Meylan",
        codePostal: 38240,
        latitude: 45.208218,
        longitude: 5.7968
      }
    }
  },
  {
    reference: "c200",
    etat: EtatCommande.PLANIFIEE,
    date: new Date("2025-02-06T00:00:00"),
    client: {
      code: "x003",
      email: "lguyot@lp.net",
      prenom: "louna",
      nom: "GUYOT",
      adresse: {
        adressePostal: "17 Avenue du Vercors",
        ville: "Seyssinet-Pariset",
        codePostal: 38170,
        latitude: 45.182207,
        longitude: 5.687907
      }
    }
  },
  {
    reference: "c201",
    etat: EtatCommande.EN_LIVRAISON,
    date: new Date("2025-02-06T00:00:00"),
    horairePreferable: "17:00-19:00",
    dateLivraisonEstimee: "07/02/2025 de 17:00 à 19:00",
    client: {
      code: "x010",
      email: "mjean@lp.net",
      prenom: "marie",
      nom: "JEAN",
      adresse: {
        adressePostal: "486 Route de Laliarey",
        ville: "Engins",
        codePostal: 38360,
        latitude: 45.204845,
        longitude: 5.629185
      }
    }
  },
  {
    reference: "c202",
    etat: EtatCommande.EN_LIVRAISON,
    date: new Date("2025-02-06T00:00:00"),
    horairePreferable: "17:00-19:00",
    dateLivraisonEstimee: "08/02/2025 de 17:00 à 19:00",
    client: {
      code: "x011",
      email: "lmoreau@wan.fr",
      prenom: "lucas",
      nom: "MOREAU",
      adresse: {
        adressePostal: "777 Route de la Mearie",
        ville: "Quaix-en-Chartreuse",
        codePostal: 38950,
        latitude: 45.25468,
        longitude: 5.723202
      }
    }
  },
  {
    reference: "c204",
    etat: EtatCommande.EN_LIVRAISON,
    date: new Date("2025-02-06T00:00:00"),
    horairePreferable: "17:00-19:00",
    dateLivraisonEstimee: "08/02/2025 de 17:00 à 19:00",
    client: {
      code: "x012",
      email: "rmercier@gm.fr",
      prenom: "romain",
      nom: "MERCIER",
      adresse: {
        adressePostal: "13 Chemin des Combettes",
        ville: "La Tronche",
        codePostal: 38700,
        latitude: 45.217117,
        longitude: 5.745854
      }
    }
  },
  {
    reference: "c205",
    etat: EtatCommande.PLANIFIEE,
    date: new Date("2025-02-06T00:00:00"),
    horairePreferable: "17:00-19:00",
    dateLivraisonEstimee: "08/02/2025 de 17:00 à 19:00",
    client: {
      code: "x013",
      email: "omenard@lp.net",
      prenom: "olivier",
      nom: "MENARD",
      adresse: {
        adressePostal: "7c Avenue de Kimberley",
        ville: "Échirolles",
        codePostal: 38130,
        latitude: 45.147738,
        longitude: 5.72778
      }
    }
  }
];
