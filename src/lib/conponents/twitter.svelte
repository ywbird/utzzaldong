<script lang="ts">
    import markdown from '$lib/markdown';
    import { Twitter } from '$lib/icons';
    import { Utils } from '$lib/icons';
    import TwitterComment from './twitterComment.svelte';

    import domtoimage from 'dom-to-image';
    import ColorPicker from 'svelte-awesome-color-picker';
    import { colord } from 'colord';
    import InfoPopup from './utils/infoPopup.svelte';

    const infoText = `\`*별표*\`로 *기울기*를,
    \`**별표 두번**\`으로 **볼드**를,
    ![](이미지 url)로 이미지를 넣을 수 있습니다.`;

    let target: HTMLElement;

    let exportTransparentBG = false;
    let bgColor = colord('#ffffffff');
    let bgHex = '#ffffffff';
    let width = 400;
    let exportScale = 2;
    let date = new Date();

    let data = {
        avatar: newAvatar(),
        nickname: '아무닉네임',
        handle: 'amu_id',
        content: '아무내용',
        fontSize: 16,
        roundBorder: false,
        time: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
            date.getDate()
        ).padStart(2, '0')}T${String(date.getHours()).padStart(2, '0')}:${String(
            date.getMinutes()
        ).padStart(2, '0')}`
    };

    $: date = new Date(data.time);

    $: processdContent = markdown(data.content) || '';

    function defaultComment() {
        return {
            nickname: '아무댓글닉네임',
            handle: 'amu_id',
            avatar: newAvatar(),
            content: '아무댓글',
            date: '2023-08-19'
        };
    }

    let comment = defaultComment();

    let comments: {
        nickname: string;
        handle: string;
        avatar: string;
        content: string;
        date: string;
    }[] = [];

    function addComment() {
        const newComment = structuredClone(comment);
        const tempComments = structuredClone(comments);
        tempComments.push(newComment);
        comments = tempComments;
        comment = defaultComment();
    }

    function removeComment(idx: number) {
        const tempComments = structuredClone(comments);
        tempComments.splice(idx, 1);
        comments = tempComments;
    }

    function moveComment(idx: number, to: number) {
        const tempComments = structuredClone(comments);
        comments = moveItem(tempComments, idx, to);
    }

    function exportAsImage() {
        // const resultElement = document.createElement('div');
        // resultElement.innerHTML = result.innerHTML;
        // const imgs = result.querySelectorAll('img');
        // imgs.forEach((img) => {
        //     getBase64FromImageUrl(img, img.src);
        // });
        // console.log(result);
        // // result.innerHTML = resultElement.innerHTML;
        // setTimeout(() => {
        //     html2canvas(result, {
        //         scale: exportScale || 4,
        //         backgroundColor: exportTransparentBG ? null : '#ffffff'
        //     }).then((canvas) => {
        //         const a = document?.createElement('a');
        //         a.setAttribute('download', `humor-${yyyymmdd(date)}.png`);
        //         a.setAttribute(
        //             'href',
        //             canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
        //         );
        //         a.click();
        //     });
        // }, 30);
        // const clonedResult = result.cloneNode(true);
        // target.style.transform = 'scale(3)';
        // function filter(node: Node) {
        //     return node.tagName !== 'i';
        // }
        // domtoimage
        //     .toSvg(document.getElementById('target'), { filter: filter })
        //     .then(function (dataUrl) {
        //         downloadDataUrl(dataUrl);
        //     })
        //     .catch(function (error) {
        //         console.error('oops, something went wrong!', error);
        //     });
        domtoimage
            .toPng(document.getElementById('target'), {
                bgcolor: exportTransparentBG ? 'rgba(0,0,0,0)' : bgColor.toHex(),
                width: target.clientWidth * exportScale,
                height: target.clientHeight * exportScale,
                style: {
                    transform: 'scale(' + exportScale + ')',
                    transformOrigin: 'top left'
                }
            })
            .then(function (dataUrl) {
                downloadDataUrl(dataUrl);
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });
    }

    function newAvatar(seed?: string) {
        // `https://api.dicebear.com/6.x/identicon/png?seed=${Math.random()}`
        return '/avatar.webp';
    }

    function rerollAvatar() {
        data.avatar = newAvatar();
    }

    function setGreenScreen() {
        bgColor = colord('#00b140');
        bgHex = '#00b140';
    }

    // function getBase64FromImageUrl(img: HTMLImageElement, url: string) {
    //     img.setAttribute('crossOrigin', 'anonymous');

    //     img.addEventListener('load', (e) => {
    //         var canvas = document.createElement('canvas');
    //         canvas.width = (e.target as HTMLImageElement).width;
    //         canvas.height = (e.target as HTMLImageElement).height;

    //         var ctx = canvas.getContext('2d');
    //         ctx.drawImage(e.target as CanvasImageSource, 0, 0);

    //         var dataURL = canvas.toDataURL('image/png');

    //         (e.target as HTMLImageElement).setAttribute('src', dataURL);
    //     });

    //     img.src = url;
    // }

    function downloadDataUrl(dataUrl: string) {
        const a = document?.createElement('a');
        a.setAttribute('download', `humor-${yyyymmdd(date)}.png`);
        a.setAttribute('href', dataUrl);
        a.click();
    }

    function moveItem(arr: any[], from: number, to: number) {
        var f = arr.splice(from, 1)[0];
        arr.splice(to, 0, f);
        return arr;
    }

    function yyyymmdd(d: Date) {
        const mm = d.getMonth() + 1; // getMonth() is zero-based
        const dd = d.getDate();
        const hh = d.getHours();
        const min = d.getMinutes();
        const sec = d.getSeconds();

        return [
            d.getFullYear(),
            (mm > 9 ? '' : '0') + mm,
            (dd > 9 ? '' : '0') + dd,
            (hh > 9 ? '' : '0') + hh,
            (min > 9 ? '' : '0') + min,
            (sec > 9 ? '' : '0') + sec
        ].join('');
    }
</script>

<!-- {#if $editMode} -->
<main>
    <div class="section">
        <h2>Edit</h2>
        <div class="edit">
            <h3>본문</h3>
            <div class="inputs user-edit">
                <p>
                    <label for="nickname">닉네임</label>
                    <input
                        type="text"
                        name="nickname"
                        id="nickname"
                        placeholder="닉네임"
                        bind:value={data.nickname}
                    />
                </p>
                <p>
                    <label for="handle">아이디</label>
                    <input
                        type="text"
                        name="handle"
                        id="handle"
                        placeholder="아이디"
                        bind:value={data.handle}
                    />
                </p>
                <p>
                    <label for="avatar">프사</label>
                    <input
                        type="text"
                        name="avatar"
                        id="avatar"
                        placeholder="이미지 url"
                        bind:value={data.avatar}
                    />
                    <button class="btn" on:click={rerollAvatar}>🎲</button>
                </p>
                <p>
                    <label for="time">시간</label>
                    <input
                        type="datetime-local"
                        name="time"
                        id="time"
                        placeholder="시간"
                        bind:value={data.time}
                    />
                </p>
            </div>
            <br />
            <div class="content-edit">
                <textarea
                    placeholder="웃긴 내용을 채워보세요!"
                    rows="6"
                    cols="52"
                    bind:value={data.content}
                    class="content-area"
                />

                <div class="inputs">
                    <p>
                        <label for="fontsize">폰트 크기</label>
                        <input
                            type="number"
                            name="fontsize"
                            id="fontsize"
                            placeholder="폰트 크기 (기본 16px)"
                            bind:value={data.fontSize}
                        />
                    </p>
                    <p>
                        <label for="roundcorner">둥근 사진 모서리</label>
                        <input
                            type="checkbox"
                            name="roundcorner"
                            id="roundcorner"
                            bind:checked={data.roundBorder}
                        />
                    </p>
                </div>
            </div>
            <br />
            <div class="comment-edit">
                <h3>댓글</h3>

                <div class="inputs">
                    <p>
                        <label for="nickname">닉네임</label>
                        <input
                            type="text"
                            name="nickname"
                            id="nickname"
                            placeholder="닉네임"
                            bind:value={comment.nickname}
                        />
                    </p>
                    <p>
                        <label for="handle">아이디</label>
                        <input
                            type="text"
                            name="handle"
                            id="handle"
                            placeholder="아이디"
                            bind:value={comment.handle}
                        />
                    </p>
                    <p>
                        <label for="avatar">프사</label>
                        <input
                            type="text"
                            name="avatar"
                            id="avatar"
                            placeholder="이미지 url"
                            bind:value={comment.avatar}
                        />
                    </p>
                    <p>
                        <label for="time">시간</label>
                        <input
                            type="date"
                            name="time"
                            id="time"
                            placeholder="시간"
                            bind:value={comment.date}
                        />
                    </p>
                </div>
                <br />
                <textarea
                    name="comment-content"
                    id="comment-content"
                    placeholder="댓글 내용"
                    cols="52"
                    rows="3"
                    bind:value={comment.content}
                />
                <br />
                <button on:click={addComment}>추가</button>

                <div class="comment-previews">
                    <ul>
                        {#each comments as c, idx}
                            <li>
                                <p>
                                    <button
                                        on:click={() => {
                                            removeComment(idx);
                                        }}>x</button
                                    >
                                    <button
                                        disabled={idx === 0}
                                        on:click={() => {
                                            moveComment(idx, idx - 1);
                                        }}>↑</button
                                    >
                                    <button
                                        disabled={idx === comments.length - 1}
                                        on:click={() => {
                                            moveComment(idx, idx + 1);
                                        }}>↓</button
                                    >
                                    <span>
                                        {c.nickname}·{c.content.slice(0, 15)}{c.content.length > 16
                                            ? '...'
                                            : ''}
                                    </span>
                                </p>
                            </li>
                        {/each}
                    </ul>
                </div>
            </div>
        </div>
        <span>
            <a href="https://www.markdownguide.org/basic-syntax/"
                >Markdown을 지원합니다. Supports GFM markdown</a
            ><InfoPopup content={infoText} />
        </span>
    </div>

    <!-- {:else} -->
    <div style="--width: {width}px;" class="section">
        <h2>Content</h2>
        <div
            style={`background:${exportTransparentBG ? `url('/alpha.png')` : bgColor.toHex()};`}
            class="result"
        >
            <div bind:this={target} id="target" class="target">
                <!-- {/if} -->
                <div class="user">
                    <img
                        src={data.avatar || '/avatar.webp'}
                        alt={data.avatar || 'avatar'}
                        class="avatar"
                    />
                    <div class="meta">
                        <div class="nickname">{data.nickname || '닉네임'}</div>
                        <div class="handle">@{data.handle || 'handle'}</div>
                    </div>
                </div>
                <div
                    style={`--font-size:${data.fontSize || 16}px; --round-border:${
                        data.roundBorder ? '15px' : '0'
                    }`}
                    class="content"
                >
                    {#await processdContent}
                        <p>converting...</p>
                    {:then result}
                        <p>{@html result}</p>
                    {:catch error}
                        <p>{error.message}</p>
                    {/await}
                    <div class="date">
                        {new Intl.DateTimeFormat('ko-KR', {
                            hour: 'numeric',
                            minute: 'numeric'
                        }).format(date)}·{new Intl.DateTimeFormat('ko-KR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        }).format(date)}
                    </div>
                    <div class="icons">
                        <Twitter.Comment />
                        <Twitter.Retweet />
                        <Twitter.Like />
                        <Twitter.Share />
                    </div>
                    <div class="comments">
                        {#each comments as c}
                            <TwitterComment data={c} />
                        {/each}
                    </div>
                </div>
            </div>
        </div>
        <div class="export">
            <div class="inputs">
                <p>
                    <label for="width">너비</label>
                    <input
                        type="number"
                        name="width"
                        id="width"
                        step="10"
                        placeholder="기본 400"
                        bind:value={width}
                    />
                </p>
                <p>
                    <label for="width">확대</label>
                    <input
                        type="number"
                        name="scale"
                        id="scale"
                        placeholder="기본 1"
                        bind:value={exportScale}
                    />
                </p>
                <p>
                    <label for="bg-color">배경색</label>
                    <ColorPicker bind:color={bgColor} bind:hex={bgHex} isAlpha={false} />
                </p>
                <p>
                    <label for="transparent-bg">투명 배경</label>
                    <input
                        type="checkbox"
                        name="transparent-bg"
                        id="transparent-bg"
                        bind:checked={exportTransparentBG}
                    />
                </p>
                <p>
                    <label for="greenscreen">그린스크린</label>
                    <button name="greenscreen" id="greenscreen" on:click={setGreenScreen}
                        >설정하기 <div id="greenscreen-color" /></button
                    >
                </p>
            </div>
            <button on:click={exportAsImage}>내보내기</button>
        </div>
    </div>
</main>

<style lang="scss">
    main {
        margin: auto;
        display: flex;
        flex-direction: row;
        gap: 2rem;
        justify-content: center;

        h2 {
            margin-block: 0;
            margin-bottom: 1rem;
        }

        .section {
            width: var(--width, 400px);
        }

        .edit {
            padding: 1rem;
            border: 1px solid black;
        }

        textarea {
            max-width: 100%;
            border: 1px solid black;
        }

        .target {
            padding: 1rem;
            max-width: 90%;
        }

        .result {
            border: 1px solid black;
            /* width: 100px;
            height: 100px; */
            background-image: url('/alpha.png');
            background-repeat: repeat;

            .user {
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 0.7rem;
                .avatar {
                    height: 50px;
                }
                .meta {
                    display: flex;
                    flex-direction: column;
                    .nickname {
                        font-weight: 500;
                    }
                    .handle {
                        color: gray;
                    }
                }
            }
            .content {
                font-weight: 500;
                font-size: var(--font-size, 1em);
                max-width: 100%;
                img {
                    max-width: 100%;
                }
            }
            .date {
                font-weight: 400;
                color: gray;
            }

            .icons {
                display: flex;
                justify-content: space-around;
                border-block: 1px solid #efefef;
                margin-block: 0.3rem;
                padding-block: 0.4rem;
            }
            .comments {
                margin-block: 1rem;
            }
        }
    }
    .inputs {
        width: 100%;
        display: table;
        border-collapse: separate;
        border-spacing: 0 0.4em;
        p {
            display: table-row;
        }
        label {
            display: table-cell;
        }
        input {
            display: table-cell;
        }

        button#greenscreen {
            display: flex;
            flex-direction: row;
            align-items: baseline;
        }
        #greenscreen-color {
            width: 12px;
            height: 12px;
            background-color: #00b140;
        }
    }

    .btn {
        all: unset;
        cursor: pointer;
        margin-left: 3px;
    }
</style>
