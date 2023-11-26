<script>
    import '$lib/styles/fonts.css';
    import '$lib/styles/global.css';

    import Icon from '$lib/icons';
</script>

<a class="homebtn" href="/"><Icon.Utils.Home size={40} /></a>

<slot />

<style>
    .homebtn {
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        aspect-ratio: 1/1;
        padding: 0.3rem;
        border-radius: 12px;

        box-shadow: 0px 0px 19px 3px rgba(0, 0, 0, 0.3);
        -webkit-box-shadow: 0px 0px 19px 3px rgba(0, 0, 0, 0.3);
        -moz-box-shadow: 0px 0px 19px 3px rgba(0, 0, 0, 0.3);
        color: black;
    }
</style>
