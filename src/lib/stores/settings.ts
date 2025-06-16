import { writable } from "svelte/store"

const defaultSettings = {
    fontSize: 16,
    theme: "light",
}

// function loadSettings() {
//     if (typeof localStorage !== "undefined") {
//         const raw = localStorage.getItem("userSettings");
//         if (raw) return JSON.parse(raw);
//     }
//     return defaultSettings;
// }

// export const settings = writable(loadSettings());

// settings.subscribe((value) => {
//     if (typeof localStorage !== "undefined") {
//         localStorage.setItem("userSettings", JSON.stringify(value));
//     }
// });
