<script lang="ts">
    export let content: string;
    import { Utils } from '$lib/icons';

    import markdown from '$lib/markdown';

    $: processdContent = markdown(content) || '';
</script>

<div class="popup">
    <span class="button"><Utils.Info /></span>
    <div class="content">
        {#await processdContent}
            <p>converting...</p>
        {:then result}
            <p>{@html result}</p>
        {:catch error}
            <p>{error.message}</p>
        {/await}
    </div>
</div>

<style lang="scss">
    .popup {
        position: relative;
    }
    .content {
        position: absolute;
        display: none;
        z-index: 10;
        background-color: white;
        padding-inline: 6px;
        padding-block: 2px;
        border: 1px solid black;
        width: fit-content;
        max-width: 200px;
        word-wrap: break-word;
        font-size: 14px;

        transform: translateY(calc(-100% - 25px));
    }

    .button:hover ~ .content {
        display: block;
    }
</style>
