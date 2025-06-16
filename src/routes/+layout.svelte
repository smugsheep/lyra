<script lang="ts">
    import "../app.css"
    import Sidebar from "$lib/components/Sidebar.svelte"
</script>

<div class="content">
    <Sidebar />
    <slot />
</div>

<style>
    .content {
        display: flex;
        flex-direction: row;
        flex-grow: 1;
        padding-top: 1em;
        overflow: hidden;
        margin-bottom: 1em;
        justify-content: space-between;
        gap: 2em;
    }
</style>