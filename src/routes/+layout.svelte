<script>
    import '$lib/styles/fonts.css'
    import '$lib/styles/global.css'

    import Icon from '$lib/icons'

    import { page } from '$app/stores'
    import { fade } from 'svelte/transition'
</script>

<svelte:head>
    <title>페이크 웃짤동</title>
</svelte:head>

{#if $page.route.id !== '/'}
    <a transition:fade={{ delay: 0, duration: 250 }} class="homebtn" href="/"
        ><div class="icon"><Icon.Utils.Home size={30} /></div></a
    >
{/if}

{#key $page.url}
    <div in:fade={{ duration: 150, delay: 0 }} out:fade={{ duration: 0 }}>
        <slot />
    </div>
{/key}

<style lang="scss">
    .homebtn {
        background-color: white;
        color: black;
        position: absolute;
        /* display: flex;
        justify-content: center;
        align-items: center; */
        width: 60px;
        aspect-ratio: 1/1;
        /* padding: 0.7rem; */
        border-bottom-right-radius: 200%;

        left: 0;
        top: 0;

        box-shadow: 0px 0px 19px 3px rgba(0, 0, 0, 0.3);
        -webkit-box-shadow: 0px 0px 19px 3px rgba(0, 0, 0, 0.3);
        -moz-box-shadow: 0px 0px 19px 3px rgba(0, 0, 0, 0.3);

        .icon {
            padding: 0.4rem;
            /* width: 30px; */
        }
    }
</style>
