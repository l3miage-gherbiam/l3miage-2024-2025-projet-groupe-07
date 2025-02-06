import { z as zod } from "zod";

export interface GeoCodeProperties {
    readonly label: string;
    readonly score: number;
    readonly housenumber?: string;
    readonly id: string;
    readonly type: string;
    readonly name: string;
    readonly postcode: string;
    readonly citycode: string;
    readonly x: number;
    readonly y: number;
    readonly city: string;
    readonly context: string;
    readonly importance: number;
    readonly street?: string;
}

export const GeoCodePropertiesSchema = zod.object({
    label: zod.string(),
    score: zod.number(),
    housenumber: zod.string().optional(),
    id: zod.string(),
    type: zod.string(),
    name: zod.string(),
    postcode: zod.string(),
    citycode: zod.string(),
    x: zod.number(),
    y: zod.number(),
    city: zod.string(),
    context: zod.string(),
    importance: zod.number(),
    street: zod.string().optional()
}).readonly();