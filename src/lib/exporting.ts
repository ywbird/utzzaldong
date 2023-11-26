import type { Colord } from 'colord';
import domtoimage from 'dom-to-image';

export function exportAsImage(
    transparentBg: boolean,
    bgColor: Colord,
    target: HTMLElement,
    scale: number
) {
    domtoimage
        .toPng(document.getElementById('target'), {
            bgcolor: transparentBg ? 'rgba(0,0,0,0)' : bgColor.toHex(),
            width: target.clientWidth * scale,
            height: target.clientHeight * scale,
            style: {
                transform: 'scale(' + scale + ')',
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

function downloadDataUrl(dataUrl: string) {
    const a = document?.createElement('a');
    a.setAttribute('download', `humor-${yyyymmdd(new Date())}.png`);
    a.setAttribute('href', dataUrl);
    a.click();
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
