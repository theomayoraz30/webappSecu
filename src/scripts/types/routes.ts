import type { RouteRecordRaw } from "vue-router";


export type RouteWithChildren = Record<string, (RouteRecordRaw & { children?: RouteWithChildren })>;
