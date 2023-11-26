<script lang="ts">
    import Icon from '$lib/icons';
</script>

<main>
    <ul class="icon-list">
        <a href="/twitter">
            <li class="icon-item">
                <Icon.Twitter.TwitterIcon size={40} />
            </li>
        </a>
        <a href="/karrot"
            ><li class="icon-item">
                <img src="/karrot.png" alt="" height="40" />
            </li>
        </a>
    </ul>
</main>

<style lang="scss">
    main {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .icon-list {
        list-style: none;
        display: flex;
        gap: 2rem;
        flex-direction: row;
        padding-left: 0;

        .icon-item {
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
    }
</style>
