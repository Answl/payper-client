import type { Component } from "vue";

export interface CategoryPill {
  icon: Component;
  label: "카페" | "편의점" | "서점";
}
