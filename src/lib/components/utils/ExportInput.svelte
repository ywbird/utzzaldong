<script lang="ts">
    import { downloadObject, yyyymmdd } from '$lib/utils'
    import { colord } from 'colord'
    import ColorPicker from 'svelte-awesome-color-picker'

    export let service = ''

    export let width = 400
    export let exportScale = 2
    export let bgColor = colord('#ffffffff')
    export let bgHex = bgColor.toHex()
    export let exportTransparentBG = false
    export let exportImage = () => {}
    export let setGreenScreen = () => {}
    export let data: { [key: string]: any } = {}

    let selectedFile: HTMLInputElement
    let status: HTMLElement

    const date = new Date()

    function saveData() {
        downloadObject(data, `${yyyymmdd(date)}-${data.service}-data.json`)
    }

    function loadData() {
        const file = selectedFile.files[0]

        const reader = new FileReader()

        reader.readAsText(file)

        reader.addEventListener('load', () => {
            const result = JSON.parse(reader.result as string)

            if (result.service === service) {
                data = result

                status.classList.add('success')
                status.classList.remove('error')
                status.innerText = '파일이 업로드되었습니다.'
            } else {
                status.classList.remove('success')
                status.classList.add('error')
                status.innerText = '올바르지 않은 형식의 파일입니다.'
            }

            selectedFile.value = null
        })

        reader.addEventListener('error', () => {
            status.classList.remove('success')
            status.classList.add('error')
            status.innerText = '에러가 발생했습니다.'

            selectedFile.value = null
        })
    }
</script>

<fieldset>
    <legend>내보내기</legend>
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
        <button on:click={exportImage}>📥다운로드</button>
    </div>
</fieldset>
<fieldset>
    <legend>저장하기</legend>
    <button on:click={saveData}>💾내용저장</button>
    <hr />
    <p>
        <label for="select-file">불러오기</label>
        <input
            bind:this={selectedFile}
            name="select-file"
            id="select-file"
            type="file"
            accept=".json"
            on:change={loadData}
        />
    </p>
    <span bind:this={status} class="status">파일을 업로드해주세요.</span>

    <style>
        .status {
            color: gray;
            font-size: smaller;
        }
        .status.error {
            color: tomato;
        }
        .status.success {
            color: limegreen;
        }
    </style>
</fieldset>

<style lang="scss">
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

        #greenscreen-color {
            width: 12px;
            height: 12px;
            background-color: #00b140;
        }
    }
    button {
        display: flex;
        flex-direction: row;
        align-items: baseline;
    }
</style>
