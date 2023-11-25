<script lang="ts">
    export let data: {
        nickname: string;
        handle: string;
        avatar: string;
        content: string;
        date: string;
    };
    import { Twitter } from '$lib/icons';
    import markdown from '$lib/markdown';

    const date = new Date(data.date);
</script>

<div class="main">
    <div class="comment">
        <img src={data.avatar || '/avatar.webp'} alt={data.avatar || 'avatar'} class="avatar" />
        <div>
            <div class="meta">
                <div class="nickname">{data.nickname || '닉네임'}</div>
                <div class="handle">@{data.handle || 'handle'}</div>

                <div class="date">
                    ·
                    {new Intl.DateTimeFormat('ko-KR', {
                        // year: none,
                        month: 'short',
                        day: 'numeric'
                    }).format(date)}
                </div>
            </div>
            <div class="content">
                {#await markdown(data.content)}
                    <p>converting...</p>
                {:then result}
                    <p>{@html result}</p>
                {:catch error}
                    <p>{error.message}</p>
                {/await}
            </div>
        </div>
    </div>
    <div class="icons">
        <Twitter.Comment size={16} />
        <Twitter.Retweet size={16} />
        <Twitter.Like size={16} />
        <Twitter.Share size={16} />
    </div>
</div>

<style lang="scss">
    .comment {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.7rem;
        .avatar {
            height: 50px;
        }
        .meta {
            display: flex;
            flex-direction: row;
            gap: 0.2rem;
            .nickname {
                font-weight: 500;
            }
            .handle {
                color: gray;
                font-weight: 400;
            }
            .date {
                color: gray;
                font-weight: 400;
            }
        }
        .content {
            font-weight: 400;
        }
    }
    .icons {
        display: flex;
        justify-content: space-around;
        margin-block: 0.3rem;
        padding-block: 0.6rem;
        padding-bottom: 1rem;
        width: 90%;
        border-left: 2px solid #727272;
        margin-left: 1.2rem;
    }
    .main {
        margin-bottom: 0.7rem;
    }
    .main:last-child {
        .icons {
            border-left: 2px solid transparent;
        }
    }
</style>
