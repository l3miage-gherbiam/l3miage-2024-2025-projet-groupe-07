import { LatLng } from "leaflet";
import { Tournee } from "./tournee.model";

export interface TourneeDetailed{
    tourneeInfo: Tournee;
    destinations: LatLng[];
}