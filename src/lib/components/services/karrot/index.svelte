<script lang="ts">
    import { newAvatar } from '$lib/utils';
    import { exportAsImage } from '$lib/exporting';
    import Icon from '$lib/icons';
    import InfoPopup from '$lib/components/utils/infoPopup.svelte';
    import markdown from '$lib/markdown';

    import { colord } from 'colord';
    import ColorPicker from 'svelte-awesome-color-picker';

    const infoText = `\`*별표*\`로 *기울기*를,
    \`**별표 두번**\`으로 **볼드**를,
    ![](이미지 url)로 이미지를 넣을 수 있습니다.`;

    let data = {
        title: '아무 제목',
        nickname: '아무닉네임',
        avatar: newAvatar(),
        location: '서울시 유투구 웃짤동',
        interest: 1,
        views: 10,
        temperature: 36.5,
        tag: '카테고리',
        timePassed: '1시간',
        content: '아무내용',
        price: 3000,
        image: ''
    };

    let target: HTMLElement;

    let exportTransparentBG = false;
    let bgColor = colord('#ffffffff');
    let bgHex = '#ffffffff';
    let width = 400;
    let exportScale = 2;

    $: processdContent = markdown(data.content) || '';

    function getRankByTemp(temp: number) {
        if (temp < 30) return 'rank6';
        if (30 <= temp && temp < 36.5) return 'rank5';
        if (36.5 <= temp && temp < 50.5) return 'rank4';
        if (50.5 <= temp && temp < 65.5) return 'rank3';
        if (65.5 <= temp && temp < 88) return 'rank2';
        if (88 <= temp) return 'rank1';
    }

    function setGreenScreen() {
        bgColor = colord('#00b140');
        bgHex = '#00b140';
    }

    function exportImage() {
        exportAsImage(exportTransparentBG, bgColor, target, exportScale);
    }

    function heroError(this: any) {
        this.src = `https://placehold.co/${width}x${width}`;
    }
</script>

<h1>당근마켓</h1>
<main>
    <div class="section">
        <h2>Edit</h2>
        <div class="edit">
            <div class="inputs user-edit">
                <p>
                    <label for="제목">제목</label>
                    <input
                        type="text"
                        name="제목"
                        id="제목"
                        placeholder="매너온도"
                        bind:value={data.title}
                    />
                </p>
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
                    <label for="avatar">프사</label>
                    <input
                        type="text"
                        name="avatar"
                        id="avatar"
                        placeholder="프사"
                        bind:value={data.avatar}
                    />
                </p>
                <p>
                    <label for="location">위치</label>
                    <input
                        type="text"
                        name="location"
                        id="location"
                        placeholder="위치"
                        bind:value={data.location}
                    />
                </p>
                <p>
                    <label for="interest">관심</label>
                    <input
                        type="number"
                        name="interest"
                        id="interest"
                        placeholder="관심"
                        bind:value={data.interest}
                    />
                </p>
                <p>
                    <label for="views">조회</label>
                    <input
                        type="number"
                        name="views"
                        id="views"
                        placeholder="조회"
                        bind:value={data.views}
                    />
                </p>
                <p>
                    <label for="temp">매너온도</label>
                    <input
                        type="number"
                        name="temp"
                        id="temp"
                        step="5"
                        max="99"
                        min="0"
                        placeholder="매너온도"
                        bind:value={data.temperature}
                    />
                </p>
                <p>
                    <label for="tag">카테고리</label>
                    <input
                        type="text"
                        name="tag"
                        id="tag"
                        placeholder="카테고리"
                        bind:value={data.tag}
                    />
                </p>
                <p>
                    <label for="time-passed">지난 시간</label>
                    <input
                        type="text"
                        name="time-passed"
                        id="time-passed"
                        placeholder="지난 시간"
                        bind:value={data.timePassed}
                    />
                </p>
                <p>
                    <label for="price">가격</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        step="1000"
                        placeholder="가격"
                        bind:value={data.price}
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
                        <label for="image">이미지</label>
                        <input
                            type="text"
                            name="image"
                            id="image"
                            placeholder="이미지 Url"
                            bind:value={data.image}
                        />
                    </p>
                </div>
            </div>
        </div>
        <span>
            <a href="https://www.markdownguide.org/basic-syntax/"
                >Markdown을 지원합니다. Supports GFM markdown</a
            ><InfoPopup content={infoText} />
        </span>
    </div>

    <div style="--width: {width}px;" class="section">
        <h2>Content</h2>
        <div
            style={`background:${exportTransparentBG ? `url('/alpha.png')` : bgColor.toHex()};`}
            class="result"
        >
            <div bind:this={target} class="target" id="target">
                <img
                    class="hero"
                    src={data.image.length ? data.image : `https://placehold.co/${width}x${width}`}
                    alt={data.image}
                    on:error={heroError}
                />
                <div class="main">
                    <div class="user">
                        <div class="meta-wrapper">
                            <img class="avatar" src={data.avatar} alt="" />
                            <div class="meta">
                                <div class="nickname">{data.nickname}</div>
                                <div class="location">{data.location}</div>
                            </div>
                        </div>
                        <div class="temperature">
                            <div class={`number ${getRankByTemp(data.temperature)}`}>
                                {data.temperature}°C
                            </div>
                            <div class="label">매너온도</div>
                        </div>
                    </div>
                    <hr />
                    <div class="content">
                        <div class="title">{data.title}</div>
                        <p class="label">{data.tag} · {data.timePassed} 전</p>
                        <div class="body">
                            {#await processdContent}
                                <p>converting...</p>
                            {:then result}
                                <p>{@html result}</p>
                            {:catch error}
                                <p>{error.message}</p>
                            {/await}
                        </div>
                        <p class="label">관심 {data.interest} · 조회 {data.views}</p>
                    </div>
                    <!-- <hr /> -->
                </div>
                <div class="foot">
                    <div class="right">
                        <div class="icon"><Icon.Karrot.Heart size={26} /></div>
                        <div>
                            <div class="price">{data.price.toLocaleString(undefined)}원</div>
                            <div class="offer">가격제안하기</div>
                        </div>
                    </div>
                    <div class="left">
                        <button>채팅으로 거래하기</button>
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
            <button on:click={exportImage}>내보내기</button>
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

        .main {
            padding: 1rem;
        }

        textarea {
            max-width: 100%;
            border: 1px solid black;
        }

        hr {
            height: 1px;
            border: none;
            background-color: #efefef;
            margin-block: 1rem;
        }

        .result {
            border: 1px solid black;

            .user {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                padding-bottom: 0.5rem;

                .meta-wrapper {
                    display: flex;
                    flex-direction: row;
                    gap: 0.5rem;
                    .avatar {
                        height: 50px;
                        border-radius: 25px;
                    }

                    .meta .nickname {
                        font-weight: bold;
                    }
                }

                .temperature {
                    display: flex;
                    flex-direction: column;
                    align-items: end;

                    .number {
                        font-size: 1.2em;
                        font-weight: bold;

                        $rankcolors: #ff6e1d #f7be68 #2fc795 #019ceb #0277b2 #868b94;

                        @for $i from 1 through length($rankcolors) {
                            $c: nth($rankcolors, $i);

                            &.rank#{$i} {
                                color: $c;
                            }
                        }
                    }
                    .label {
                        font-size: 0.8em;
                        color: gray;
                        text-decoration: underline;
                    }
                }
            }

            .hero {
                width: 100%;
                aspect-ratio: 1/1;
            }

            .content {
                .title {
                    font-size: larger;
                    font-weight: bold;
                }

                .label {
                    font-size: 0.8em;
                    color: gray;
                    margin-block: 0.7rem;
                }
            }

            .foot {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                border-top: 1px solid #efefef;
                padding: 0.6rem;
                .right {
                    display: flex;
                    gap: 0.6rem;
                    .icon {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #d5d5d5;
                        width: 2.8rem;
                        border-right: 1px solid #cfcfcf;
                    }

                    .price {
                        font-weight: bold;
                    }
                    .offer {
                        color: #f06000;
                        font-size: small;
                        font-weight: bold;
                    }
                }

                .left {
                    button {
                        background-color: #f06000;
                        border: none;
                        padding-block: 0.6rem;
                        padding-inline: 0.9rem;
                        border-radius: 5px;
                        font-size: large;
                        font-weight: bold;
                        color: white;
                    }
                }
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
</style>
