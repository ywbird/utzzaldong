<script lang="ts">
    import Icon from '$lib/icons'
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

    <p>
        <a href="http://www.youtube.com/@utzzaldong" target="_blank">웃짤동</a> 생성기. <br />
        누구나 쉽게 만들 수 있는 유머 짤 생성기입니다. <br />
        Created by <a href="https://github.com/ywbird" target="_blank">ywbird</a>, Origin by
        <a href="http://www.youtube.com/@utzzaldong" target="_blank">@utzzaldong</a>
    </p>
</main>

<style lang="scss">
    main {
        display: flex;
        flex-direction: column;
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
            width: 60px;
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
