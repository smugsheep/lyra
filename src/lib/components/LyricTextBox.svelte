<script lang="ts">
    export let label: string
    export let value: string
    export let bindValue: string
    export let placeholder: string = "your text goes here!"
    export let textareaRef: HTMLTextAreaElement

    function autoResize(el: HTMLTextAreaElement) {
        el.style.height = "auto"
        el.style.height = el.scrollHeight + "px"
    }

    $: if (textareaRef) autoResize(textareaRef)
</script>

<div class="lyrics-col">
    <label for={label}>{label}</label>
    <textarea
        id={label}
        bind:this={textareaRef}
        bind:value={bindValue}
        on:input={() => autoResize(textareaRef)}
        {placeholder}
        spellcheck="false"
        style="min-height: 70vh;"
    ></textarea>
</div>

<style>
    .lyrics-col {
        display: flex;
        flex-direction: column;
        flex: 1 1 0;
        min-width: 0;
    }

    label {
        font-style: italic;
    }

    textarea {
        line-height: 1.5;
    }
</style>
