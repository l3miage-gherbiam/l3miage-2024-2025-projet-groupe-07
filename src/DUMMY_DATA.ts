import { Commande, EtatCommande } from "./models/commande.model";
import { EquipeLivreurs, StatusEquipeLivreurs } from "./models/equipeLivreurs.model";
import { Livreur } from "./models/livreur.model";

/**
 * Liste de livreurs (6 au total)
 */
export const livreursExemple: Livreur[] = [
  {
    id: "jdd1",
    nom: "Morel",
    prenom: "Aline",
    telephone: "0612345678",
    photoURL: "",
    email: "abr@mobilis.fr",
    entrepot: "Grenis",
    status: "affecté" // On suppose qu'elle est affectée à une équipe
  },
  {
    id: "jdd2",
    nom: "Leclerc",
    prenom: "Bruno",
    telephone: "0687654321",
    photoURL: "",
    email: "bcl@mobilis.fr",
    entrepot: "Grenis",
    status: "affecté"
  },
  {
    id: "jdd3",
    nom: "Morin",
    prenom: "Clara",
    telephone: "0678541234",
    photoURL: "",
    email: "cmr@mobilis.fr",
    entrepot: "Grenis",
    status: "affecté"
  },
  {
    id: "jdd4",
    nom: "Gallet",
    prenom: "Denis",
    telephone: "0654987123",
    photoURL: "",
    email: "dgl@mobilis.fr",
    entrepot: "Grenis",
    status: "affecté"
  },
  {
    id: "jdd5",
    nom: "Martin",
    prenom: "Élodie",
    telephone: "0609876543",
    photoURL: "",
    email: "emt@mobilis.fr",
    entrepot: "Grenis",
    status: "nonAffecté"
  },
  {
    id: "jdd6",
    nom: "Rolland",
    prenom: "Félix",
    telephone: "0667123456",
    photoURL: "",
    email: "fro@mobilis.fr",
    entrepot: "Grenis",
    status: "nonAffecté"
  }
];


export const equipesLivreursExample: EquipeLivreurs[] = [
  {
    id: "T1",
    livreurs: [
      {
        id: "jdd1",
        nom: "Morel",
        prenom: "Aline",
        telephone: "0612345678",
        email: "abr@mobilis.fr"
      },
      {
        id: "jdd2",
        nom: "Leclerc",
        prenom: "Bruno",
        telephone: "0687654321",
        email: "bcl@mobilis.fr"
      }
    ],
    horaire: "08:00-12:00",
    status: StatusEquipeLivreurs.Ready // en cours de livraison
  },
  {
    id: "T2",
    livreurs: [
      {
        id: "jdd3",
        nom: "Morin",
        prenom: "Clara",
        telephone: "0678541234",
        email: "cmr@mobilis.fr"
      },
      {
        id: "jdd4",
        nom: "Gallet",
        prenom: "Denis",
        telephone: "0654987123",
        email: "dgl@mobilis.fr"
      }
    ],
    horaire: "12:00-16:00",
    status: StatusEquipeLivreurs.EnLivraison // non disponible
  }
];

export const commandesExemple: Commande[] = [
  {
    id: "c001",
    etat: EtatCommande.ouverte,
    date: "2024-01-04T16:00:00",
    horairePreferable: "18:00-20:00",
    dateLivraisonEstimee: "04/01/2024 de 18:00 à 20:00",
    client: {
      code: "x001",
      email: "amartin@wan.fr",
      prenom: "agathe",
      nom: "MARTIN",
      adresse: "332 Route de la Jars",
      codePostal: 38950,
      ville: "Quaix-en-Chartreuse",
      latitude: 45.25666,
      longitude: 5.72195,
      etat: "livrable"
    }
  },
  {
    id: "c002",
    etat: EtatCommande.livree,
    date: "2024-01-05T00:00:00",
    dateLivre: "2024-01-05T02:00:00",
    client: {
      code: "x052",
      email: "azainab@m6.com",
      prenom: "ahmed",
      nom: "ZAINAB",
      adresse: "9 Chemin des Vouillants",
      codePostal: 38600,
      ville: "Fontaine",
      latitude: 45.187277,
      longitude: 5.672983,
      etat: "livré"
    }
  },
  {
    id: "c004",
    etat: EtatCommande.livree,
    date: "2024-01-09T00:00:00",
    dateLivre: "2024-01-09T02:00:00",
    client: {
      code: "x053",
      email: "lsaleh@brt.fr",
      prenom: "aisha",
      nom: "SALEH",
      adresse: "114 Chemin des Pensées",
      codePostal: 38410,
      ville: "Saint-Martin-d'Uriage",
      latitude: 45.140189,
      longitude: 5.833471,
      etat: "livré"
    }
  },
  {
    id: "c005",
    etat: EtatCommande.livree,
    date: "2024-01-11T00:00:00",
    dateLivre: "2024-01-11T02:00:00",
    client: {
      code: "x051",
      email: "apascal@or.fr",
      prenom: "agathe",
      nom: "PASCAL",
      adresse: "88 Chemin du Sonnant",
      codePostal: 38410,
      ville: "Saint-Martin-d'Uriage",
      latitude: 45.150744,
      longitude: 5.817776,
      etat: "livré"
    }
  },
  {
    id: "c006",
    etat: EtatCommande.livree,
    date: "2024-02-02T00:00:00",
    dateLivre: "2024-02-02T02:00:00",
    client: {
      code: "x163",
      email: "ssharma@but.org",
      prenom: "raj",
      nom: "SHARMA",
      adresse: "2 Rue des Marronniers",
      codePostal: 38320,
      ville: "Eybens",
      latitude: 45.145208,
      longitude: 5.755529,
      etat: "livré"
    }
  },
  {
    id: "c008",
    etat: EtatCommande.livree,
    date: "2024-02-02T00:00:00",
    dateLivre: "2024-02-02T02:00:00",
    client: {
      code: "x106",
      email: "ykim@but.org",
      prenom: "ji",
      nom: "KIM",
      adresse: "191 Route de la Ronzière",
      codePostal: 38410,
      ville: "Saint-Martin-d'Uriage",
      latitude: 45.169896,
      longitude: 5.836048,
      etat: "livré"
    }
  },
  {
    id: "c020",
    etat: EtatCommande.ouverte,
    date: "2024-02-05T03:30:00",
    horairePreferable: "18:00-20:00",
    dateLivraisonEstimee: "05/02/2024 de 18:00 à 20:00",
    client: {
      code: "x003",
      email: "lguyot@lp.net",
      prenom: "louna",
      nom: "GUYOT",
      adresse: "17 Avenue du Vercors",
      codePostal: 38170,
      ville: "Seyssinet-Pariset",
      latitude: 45.182207,
      longitude: 5.687907,
      etat: "livrable"
    }
  },
  {
    id: "c021",
    etat: EtatCommande.ouverte,
    date: "2024-02-05T03:30:00",
    horairePreferable: "16:00-18:00",
    dateLivraisonEstimee: "05/02/2024 de 16:00 à 18:00",
    client: {
      code: "x002",
      email: "emarchand@ok.fr",
      prenom: "elisa",
      nom: "MARCHAND",
      adresse: "7 Ensemble immobilier du Domaine des Plantées",
      codePostal: 38330,
      ville: "Biviers",
      latitude: 45.233075,
      longitude: 5.804502,
      etat: "livrable"
    }
  },
  {
    id: "c022",
    etat: EtatCommande.ouverte,
    date: "2024-02-05T03:30:00",
    horairePreferable: "16:00-18:00",
    dateLivraisonEstimee: "05/02/2024 de 16:00 à 18:00",
    client: {
      code: "x004",
      email: "amohed@brt.fr",
      prenom: "leyla",
      nom: "MOHAMMED",
      adresse: "9 Chemin des Vouillants",
      codePostal: 38600,
      ville: "Fontaine",
      latitude: 45.187277,
      longitude: 5.672983,
      etat: "livrable"
    }
  },
  {
    id: "c023",
    etat: EtatCommande.livree,
    date: "2024-02-05T03:30:00",
    dateLivre: "2024-02-05T05:00:00",
    client: {
      code: "x163",
      email: "ssharma@but.org",
      prenom: "raj",
      nom: "SHARMA",
      adresse: "2 Rue des Marronniers",
      codePostal: 38320,
      ville: "Eybens",
      latitude: 45.145208,
      longitude: 5.755529,
      etat: "livré"
    }
  },
  {
    id: "c024",
    etat: EtatCommande.livree,
    date: "2024-02-05T03:30:00",
    dateLivre: "2024-02-05T05:00:00",
    client: {
      code: "x120",
      email: "lgarnier@lp.net",
      prenom: "lucie",
      nom: "GARNIER",
      adresse: "5 Chemin du Pré",
      codePostal: 38100,
      ville: "Grenoble",
      latitude: 45.161473,
      longitude: 5.726909,
      etat: "livré"
    }
  },
  {
    id: "c040",
    etat: EtatCommande.ouverte,
    date: "2024-02-12T03:30:00",
    horairePreferable: "15:00-17:00",
    dateLivraisonEstimee: "13/02/2024 de 15:00 à 17:00",
    client: {
      code: "x005",
      email: "mkhalid@m6.com",
      prenom: "laila",
      nom: "KHALID",
      adresse: "8 Chemin de la Pissarde",
      codePostal: 38640,
      ville: "Claix",
      latitude: 45.112876,
      longitude: 5.67959,
      etat: "livrable"
    }
  },
  {
    id: "c052",
    etat: EtatCommande.ouverte,
    date: "2024-02-16T14:00:00",
    horairePreferable: "16:00-18:00",
    dateLivraisonEstimee: "17/02/2024 de 16:00 à 18:00",
    client: {
      code: "x006",
      email: "lfaure@faure.com",
      prenom: "louise",
      nom: "FAURE",
      adresse: "81 Route du Peuil",
      codePostal: 38640,
      ville: "Claix",
      latitude: 45.130076,
      longitude: 5.64821,
      etat: "livrable"
    }
  },
  {
    id: "c081",
    etat: EtatCommande.ouverte,
    date: "2024-03-04T13:00:00",
    horairePreferable: "18:00-20:00",
    dateLivraisonEstimee: "05/03/2024 de 18:00 à 20:00",
    client: {
      code: "x007",
      email: "mbonnet@or.fr",
      prenom: "marie",
      nom: "BONNETO",
      adresse: "3 Chemin du Fangeat",
      codePostal: 38180,
      ville: "Seyssins",
      latitude: 45.159826,
      longitude: 5.663139,
      etat: "livrable"
    }
  },
  {
    id: "c086",
    etat: EtatCommande.ouverte,
    date: "2024-03-05T17:00:00",
    horairePreferable: "16:00-18:00",
    dateLivraisonEstimee: "06/02/2024 de 16:00 à 18:00",
    client: {
      code: "x008",
      email: "lmartinez@or.fr",
      prenom: "léo",
      nom: "MARTIN",
      adresse: "Chemin de Charrière",
      codePostal: 38240,
      ville: "Meylan",
      latitude: 45.200435,
      longitude: 5.795018,
      etat: "livrable"
    }
  },
  {
    id: "c093",
    etat: EtatCommande.ouverte,
    date: "2024-03-08T15:30:00",
    horairePreferable: "18:00-20:00",
    dateLivraisonEstimee: "09/03/2024 de 18:00 à 20:00",
    client: {
      code: "x009",
      email: "rdubois@gm.fr",
      prenom: "romain",
      nom: "DUBOIS",
      adresse: "10 Allee des Moscaries",
      codePostal: 38240,
      ville: "Meylan",
      latitude: 45.218317,
      longitude: 5.796281,
      etat: "livrable"
    }
  },
  {
    id: "c099",
    etat: EtatCommande.livree,
    date: "2024-03-11T13:30:00",
    dateLivre: "2024-03-11T15:30:00",
    client: {
      code: "x139",
      email: "ldupuis2@hot.fr",
      prenom: "marie",
      nom: "DUPUIS",
      adresse: "10 Rue Giusto Gervasutti",
      codePostal: 38000,
      ville: "Grenoble",
      latitude: 45.161473,
      longitude: 5.726909,
      etat: "livré"
    }
  },
  {
    id: "c101",
    etat: EtatCommande.livree,
    date: "2024-03-12T13:30:00",
    dateLivre: "2024-03-12T15:30:00",
    client: {
      code: "x171",
      email: "rmercier@gm.fr",
      prenom: "romain",
      nom: "MERCIER",
      adresse: "13 Chemin des Combettes",
      codePostal: 38700,
      ville: "La Tronche",
      latitude: 45.217117,
      longitude: 5.745854,
      etat: "livré"
    }
  },
  {
    id: "c103",
    etat: EtatCommande.ouverte,
    date: "2024-03-12T13:30:00",
    horairePreferable: "16:00-18:00",
    dateLivraisonEstimee: "13/03/2024 de 16:00 à 18:00",
    client: {
      code: "x010",
      email: "mjean@lp.net",
      prenom: "marie",
      nom: "JEAN",
      adresse: "486 Route de Laliarey",
      codePostal: 38360,
      ville: "Engins",
      latitude: 45.204845,
      longitude: 5.629185,
      etat: "livrable"
    }
  },
  {
    id: "c104",
    etat: EtatCommande.ouverte,
    date: "2024-03-12T14:30:00",
    horairePreferable: "16:00-18:00",
    dateLivraisonEstimee: "13/03/2024 de 16:00 à 18:00",
    client: {
      code: "x013",
      email: "pnicolas@or.fr",
      prenom: "pauline",
      nom: "NICOLAS",
      adresse: "7c Avenue de Kimberley",
      codePostal: 38130,
      ville: "Échirolles",
      latitude: 45.147738,
      longitude: 5.72778,
      etat: "livrable"
    }
  },
  {
    id: "c105",
    etat: EtatCommande.ouverte,
    date: "2024-03-12T14:30:00",
    horairePreferable: "17:00-19:00",
    dateLivraisonEstimee: "13/03/2024 de 17:00 à 19:00",
    client: {
      code: "x011",
      email: "aibrahim@but.org",
      prenom: "amir",
      nom: "IBRAHIM",
      adresse: "6ter Rue de Chamechaude",
      codePostal: 38360,
      ville: "Sassenage",
      latitude: 45.206066,
      longitude: 5.684798,
      etat: "livrable"
    }
  },
  {
    id: "c106",
    etat: EtatCommande.ouverte,
    date: "2024-03-12T14:30:00",
    horairePreferable: "17:00-19:00",
    dateLivraisonEstimee: "13/03/2024 de 17:00 à 19:00",
    client: {
      code: "x012",
      email: "lmoreau@wan.fr",
      prenom: "lucas",
      nom: "MOREAU",
      adresse: "777 Route de la Mearie",
      codePostal: 38950,
      ville: "Quaix-en-Chartreuse",
      latitude: 45.25468,
      longitude: 5.723202,
      etat: "livrable"
    }
  },
  {
    id: "c107",
    etat: EtatCommande.ouverte,
    date: "2024-03-13T14:30:00",
    horairePreferable: "17:00-19:00",
    dateLivraisonEstimee: "14/03/2024 de 17:00 à 19:00",
    client: {
      code: "x014",
      email: "elaroche@lp.net",
      prenom: "emma",
      nom: "LAROCHE",
      adresse: "64 Avenue du Vercors",
      codePostal: 38600,
      ville: "Fontaine",
      latitude: 45.192466,
      longitude: 5.693683,
      etat: "livrable"
    }
  },
  {
    id: "c108",
    etat: EtatCommande.ouverte,
    date: "2024-03-13T16:00:00",
    horairePreferable: "17:00-19:00",
    dateLivraisonEstimee: "14/03/2024 de 17:00 à 19:00",
    client: {
      code: "x015",
      email: "lmartin@or.fr",
      prenom: "léo",
      nom: "MARTIN",
      adresse: "Chemin de Charrière",
      codePostal: 38240,
      ville: "Meylan",
      latitude: 45.200435,
      longitude: 5.795018,
      etat: "livrable"
    }
  },
  {
    id: "c109",
    etat: EtatCommande.ouverte,
    date: "2024-03-13T19:00:00",
    horairePreferable: "17:00-19:00",
    dateLivraisonEstimee: "14/03/2024 de 17:00 à 19:00",
    client: {
      code: "x012",
      email: "lmoreau@wan.fr",
      prenom: "lucas",
      nom: "MOREAU",
      adresse: "777 Route de la Mearie",
      codePostal: 38950,
      ville: "Quaix-en-Chartreuse",
      latitude: 45.25468,
      longitude: 5.723202,
      etat: "livrable"
    }
  },
  {
    id: "c110",
    etat: EtatCommande.ouverte,
    date: "2024-03-14T08:00:00",
    horairePreferable: "17:00-19:00",
    dateLivraisonEstimee: "15/03/2024 de 17:00 à 19:00",    
    client: {
      code: "x003",
      email: "lguyot@lp.net",
      prenom: "louna",
      nom: "GUYOT",
      adresse: "17 Avenue du Vercors",
      codePostal: 38170,
      ville: "Seyssinet-Pariset",
      latitude: 45.182207,
      longitude: 5.687907,
      etat: "livrable"
    }
  },
  {
    id: "c111",
    etat: EtatCommande.livree,
    date: "2024-03-14T09:00:00",
    dateLivre: "2024-03-14T11:00:00",
    client: {
      code: "x099",
      email: "hmartin@hot.fr",
      prenom: "hugo",
      nom: "MARTIN",
      adresse: "57 Chemin du Vieux Chêne",
      codePostal: 38240,
      ville: "Meylan",
      latitude: 45.208218,
      longitude: 5.7968,
      etat: "livré"
    }
  },
  {
    id: "c200",
    etat: EtatCommande.planifiee,
    date: "2025-02-06T00:00:00",
    tournee: "T1",
    client: {
      code: "x003",
      email: "lguyot@lp.net",
      prenom: "louna",
      nom: "GUYOT",
      adresse: "17 Avenue du Vercors",
      codePostal: 38170,
      ville: "Seyssinet-Pariset",
      latitude: 45.182207,
      longitude: 5.687907,
      etat: "livrable"
    }
  },
  {
    id: "c201",
    etat: EtatCommande.enLivraison,
    date: "2025-02-06T00:00:00",
    tournee: "T1",
    horairePreferable: "17:00-19:00",
    dateLivraisonEstimee: "07/02/2025 de 17:00 à 19:00",
    client: {
      code: "x010",
      email: "mjean@lp.net",
      prenom: "marie",
      nom: "JEAN",
      adresse: "486 Route de Laliarey",
      codePostal: 38360,
      ville: "Engins",
      latitude: 45.204845,
      longitude: 5.629185,
      etat: "livrable"
    }
  },
  {
    id: "c202",
    etat: EtatCommande.enLivraison,
    date: "2025-02-06T00:00:00",
    horairePreferable: "17:00-19:00",
    dateLivraisonEstimee: "08/02/2025 de 17:00 à 19:00",
    tournee: "T1",
    client: {
      code: "x011",
      email: "lmoreau@wan.fr",
      prenom: "lucas",
      nom: "MOREAU",
      adresse: "777 Route de la Mearie",
      codePostal: 38950,
      ville: "Quaix-en-Chartreuse",
      latitude: 45.25468,
      longitude: 5.723202,
      etat: "livrable"
    }
  },
  {
    id: "c204",
    etat: EtatCommande.enLivraison,
    date: "2025-02-06T00:00:00",
    horairePreferable: "17:00-19:00",
    dateLivraisonEstimee: "08/02/2025 de 17:00 à 19:00",
    tournee: "T1",
    client: {
      code: "x012",
      email: "rmercier@gm.fr",
      prenom: "romain",
      nom: "MERCIER",
      adresse: "13 Chemin des Combettes",
      codePostal: 38700,
      ville: "La Tronche",
      latitude: 45.217117,
      longitude: 5.745854,
      etat: "livrable"
    }
  },
  {
    id: "c205",
    etat: EtatCommande.planifiee,
    date: "2025-02-06T00:00:00",
    horairePreferable: "17:00-19:00",
    dateLivraisonEstimee: "08/02/2025 de 17:00 à 19:00",
    tournee: "T1",
    client: {
      code: "x013",
      email: "omenard@lp.net",
      prenom: "olivier",
      nom: "MENARD",
      adresse: "7c Avenue de Kimberley",
      codePostal: 38130,
      ville: "Échirolles",
      latitude: 45.147738,
      longitude: 5.72778,
      etat: "livrable"
    }
  }
];
