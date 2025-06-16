<script lang="ts">
    let audioSrc = ""
    let audioEl: HTMLAudioElement

    function onFileSelect(event: Event) {
        const file = (event.target as HTMLInputElement)?.files?.[0]
        if (file) {
            audioSrc = URL.createObjectURL(file)
        }
    }
</script>

<div class="audio-player">
    <input type="file" accept="audio/*" on:change={onFileSelect} />
    {#if audioSrc}
        <audio bind:this={audioEl} controls src={audioSrc}></audio>
    {/if}
    <!-- TODO: Add YouTube player (embed or via API) -->
</div>
