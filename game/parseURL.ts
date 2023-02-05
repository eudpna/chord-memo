import { Gctx } from "./Gctx"
import { getUrlParameter, isNumeric } from "./lib/lib"

export type URLParameters = {
    title: string | null
    text: string | null
    instrument: Gctx['instrument'] | null
    columns: number | null
    notation: Gctx['notation'] | null
}

export function parseURL() {
    const result: URLParameters = {
        title: null,
        text: null,
        instrument: null,
        columns: null,
        notation: null,
    }

    const title = getUrlParameter('title', location.href)
    if (title && typeof title === 'string') {
        result.title = title
    }

    const text = getUrlParameter('text', location.href)
    if (text && typeof text === 'string') {
        result.text = text
    }

  

    const instrument = getUrlParameter('instrument', location.href)
    if (instrument && typeof instrument === 'string') {
        if (instrument === 'ukulele' || this.instrument === 'guitar') {
            result.instrument = instrument as Gctx['instrument']
        }
    }

    const notation = getUrlParameter('notation', location.href)
    if (notation && typeof notation === 'string') {
        if (notation === 'simple') {
            result.notation = notation as Gctx['notation']
        }
    }

    const columns = getUrlParameter('columns', location.href)
    if (title && typeof columns === 'string' &&
        isNumeric(columns)
    ) {
        const col = Number(columns)
        if (col % 1 === 0 && col > 0 && col < 5) {
            result.columns = col
        }
    }

    return result

}