<script lang="ts">
    import { addSong, addFolder, library } from "$lib/stores/userLibrary"
    import SidebarItems from "./SidebarItems.svelte"
</script>

<div class="sidebar">
    <h2>Library</h2>
    {#each $library.children as child}
        <SidebarItems item={child} />
    {/each}

    <button on:click={() => addSong("LIBRARY")}>Add Song</button>
    <button on:click={() => addFolder("LIBRARY")}>Add Folder</button>
</div>
