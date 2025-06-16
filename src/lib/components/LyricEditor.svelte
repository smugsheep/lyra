<script lang="ts">
    import LyricTextBox from "./LyricTextBox.svelte"
    import { currentSongId, library, getSong } from "$lib/stores/userLibrary"

    let leftArea: HTMLTextAreaElement
    let rightArea: HTMLTextAreaElement

    $: song = $currentSongId ? getSong($currentSongId) : null

    function persistChange() {
        library.update(lib => lib)
    }
</script>

<div class="lyric-editor">
    {#if song}
        <input
            type="text"
            bind:value={song.title}
            placeholder="no title"
            on:input={persistChange}
        />
        <div class="editor-container">
            <LyricTextBox
                label="original"
                bind:bindValue={song.originalText}
                value={song.originalText}
                placeholder="paste or transcribe lyrics here"
                bind:textareaRef={leftArea}
                on:input={persistChange}
            />
            <LyricTextBox
                label="translation"
                bind:bindValue={song.translationText}
                value={song.translationText}
                placeholder="write translation here"
                bind:textareaRef={rightArea}
                on:input={persistChange}
            />
        </div>
    {:else}
        <p>Select a song to edit</p>
    {/if}
</div>

<style>
    .lyric-editor {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    .editor-container {
        display: flex;
        gap: 1rem;
        margin: 2rem 0;
        width: 100%;
    }
</style>
