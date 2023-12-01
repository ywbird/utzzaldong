import names from '$lib/names.json'

export function newName() {
    const idx = Math.floor(Math.random() * names.length)
    return names[idx]
}

export function newAvatar(seed?: string) {
    return `https://api.dicebear.com/6.x/identicon/png?seed=${Math.random()}`
    // return '/avatar.webp';
}

export function yyyymmdd(d: Date) {
    const mm = d.getMonth() + 1 // getMonth() is zero-based
    const dd = d.getDate()
    const hh = d.getHours()
    const min = d.getMinutes()
    const sec = d.getSeconds()

    return [
        d.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd,
        (hh > 9 ? '' : '0') + hh,
        (min > 9 ? '' : '0') + min,
        (sec > 9 ? '' : '0') + sec,
    ].join('')
}

export function downloadObject(obj: object, filename: string) {
    const blob = new Blob([JSON.stringify(obj, null, 2)], {
        type: 'application/json;charset=utf-8',
    })
    const url = URL.createObjectURL(blob)
    const elem = document.createElement('a')
    elem.href = url
    elem.download = filename
    elem.click()
}
