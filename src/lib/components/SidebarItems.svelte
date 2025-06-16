<script lang="ts">
    import SidebarItems from "./SidebarItems.svelte"
    import { currentSongId } from "$lib/stores/userLibrary"
    import type { Folder, Song } from "$lib/stores/userLibrary"

    export let item: Folder | Song

    function selectSong(song: Song) {
        currentSongId.set(song.id)
    }
</script>

<ul>
    <li>
        {#if "children" in item}
            {item.title}
            {#each item.children as child}
                <SidebarItems item={child} />
            {/each}
        {:else}
            <button on:click={() => selectSong(item as Song)}>
                {item.title.length > 0 ? item.title : "no title"}
            </button>
        {/if}
    </li>
</ul>
