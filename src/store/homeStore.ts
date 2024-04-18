import { defineStore } from "pinia";

export const useHomeStore = defineStore({
    id: "home",
    state: () => ({
        count: 0,
    }),
    actions: {
        increment() {
        this.count++;
        },
    },
});