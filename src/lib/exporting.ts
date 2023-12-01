import type { Colord } from 'colord'
import domtoimage from 'dom-to-image'
import { yyyymmdd } from './utils'

export function exportAsImage(
    transparentBg: boolean,
    bgColor: Colord,
    target: HTMLElement,
    scale: number,
) {
    domtoimage
        .toPng(document.getElementById('target'), {
            bgcolor: transparentBg ? 'rgba(0,0,0,0)' : bgColor.toHex(),
            width: target.clientWidth * scale,
            height: target.clientHeight * scale,
            style: {
                transform: 'scale(' + scale + ')',
                transformOrigin: 'top left',
            },
        })
        .then(function (dataUrl) {
            downloadDataUrl(dataUrl)
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error)
        })
}

function downloadDataUrl(dataUrl: string) {
    const a = document?.createElement('a')
    a.setAttribute('download', `humor-${yyyymmdd(new Date())}.png`)
    a.setAttribute('href', dataUrl)
    a.click()
}
