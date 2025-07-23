import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(false);
  function authenticate() {
    isAuthenticated.value = true;
  }
  function logOut() {
    isAuthenticated.value = false;
  }

  return { isAuthenticated, authenticate, logOut };
});
