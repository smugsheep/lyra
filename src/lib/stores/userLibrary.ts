import { get, writable } from "svelte/store"

export type Song = {
    id: string
    title: string
    originalText: string
    translationText: string
    mediaLink?: string // e.g. YouTube link, audio file
    createdDate: Date
    updatedDate: Date
}

export type Folder = {
    id: string
    title: string
    children: (Folder | Song)[]
}

export type Library = {
    id: string
    children: (Folder | Song)[]
}

function addToParent(
    node: Folder | Library,
    parentId: string,
    item: Folder | Song,
): boolean {
    if (node.id === parentId) {
        node.children.push(item)
        return true
    }

    for (const child of node.children) {
        if ("children" in child && addToParent(child, parentId, item)) {
            return true
        }
    }

    return false
}

export function addSong(parentId: string, song?: Song) {
    if (!song) {
        song = {
            id: crypto.randomUUID(),
            title: "",
            originalText: "",
            translationText: "",
            createdDate: new Date(),
            updatedDate: new Date(),
        }
    }

    library.update((lib) => {
        addToParent(lib, parentId, song!)
        return lib
    })

    return song
}

export function addFolder(parentId: string, folder?: Folder) {
    if (!folder) {
        folder = {
            id: crypto.randomUUID(),
            title: "new folder",
            children: [],
        }
    }

    library.update((lib) => {
        addToParent(lib, parentId, folder!)
        return lib
    })

    return folder
}

export function getSong(id: string): Song | null {
    function findSong(node: any): any {
        if (!node) return null
        if (node.id === id && !("children" in node)) return node
        if ("children" in node) {
            for (const child of node.children) {
                const found = findSong(child)
                if (found) return found
            }
        }

        return null
    }

    return findSong(get(library))
}

// local storage & store

const LS_LIBRARY_KEY = "userLibrary"
const LS_CURRENT_SONG_ID_KEY = "currentSongId"

export const library = writable<Library>(loadLibrary())
export const currentSongId = writable<string | null>(loadCurrentSongId())

function loadLibrary(): Library {
    if (typeof localStorage !== "undefined") {
        const raw = localStorage.getItem(LS_LIBRARY_KEY)
        if (raw) return JSON.parse(raw)
    }

    return {
        id: "LIBRARY",
        children: [],
    }
}

function loadCurrentSongId(): string | null {
    if (typeof localStorage !== "undefined") {
        const raw = localStorage.getItem(LS_CURRENT_SONG_ID_KEY)
        if (raw) return raw
    }

    return addSong("LIBRARY").id
}

library.subscribe((value) => {
    if (typeof localStorage !== "undefined") {
        localStorage.setItem(LS_LIBRARY_KEY, JSON.stringify(value))
    }
})

currentSongId.subscribe((value) => {
    if (typeof localStorage !== "undefined") {
        if (value) {
            localStorage.setItem(LS_CURRENT_SONG_ID_KEY, value)
        }
    }
})