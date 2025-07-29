import type { Component } from "vue";
import type { NavigationRoutes } from "./NavigationRoutes";

export interface NavigationItem {
  id: number;
  title: string;
  name: NavigationRoutes;
  icon: Component;
}
