import { Gctx } from "../Gctx"
import { ChordData, chordToName, guitarChords, ukuleleChords } from "../../game/lib/chords"

export type ScoreElement = ScoreElementChord | ScoreElementLyric



export type ScoreElementChord = {
    type: 'chord'
    text: string
    chordName: string
    variation: number
    // textの位置
    pointer: {
        line: number
        start: number
        end: number
    }
}

export type ScoreElementLyric = {
    type: 'lyric'
    text: string
}

export type Score = ScoreElement[]



export function textToScore(text: string, line: number): Score {
    const tmp = text.matchAll(/\[.*?\]/g)

    const ms = Array.from(tmp)
    const result = []
    let x = 0
    ms.map(m => {
        return {
            index: m.index,
            text: m[0]
        }
    }).map(m => {
        const lyric = text.substring(x, m.index)
        let chordText = text.substring(m.index, m.index + m.text.length)

        // variation
        const vm = chordText.match(/\((.*?)\)/)
        let variation = 0
        let chordName = chordText
        if (vm) {
            variation = Number(vm[1])
            chordName = removeParenthes(chordText)
        }
        chordName = removeBrackets(chordName)

        if (lyric.trim() !== '') {
            result.push({
                type: 'lyric',
                text: lyric,
            })
        }
        result.push({
            type: 'chord',
            text: chordText,
            chordName: chordName,
            variation: variation,
            pointer: {
                line: line,
                start: m.index,
                end: m.index + m.text.length
            }
        })
        x = m.index + m.text.length
    })
    const lyric = text.substring(x, text.length)
    if (lyric.trim() !== '') {
        result.push({
            type: 'lyric',
            text: lyric,
        })
    }

    return result
}



export function textToScoreSimpleNotation(text: string, line: number, gctx: Gctx): Score {

    const tmp = text.matchAll(/\S+/g)

    const ms = Array.from(tmp)
    const result = []
    let x = 0
    ms.map(m => {

        const simple = m[0]
        
        // variation
        const vm = simple.match(/\((.*?)\)/)
        let variation = 0
        if (vm) {
            variation = Number(vm[1])
        }

        const chord = (gctx.instrument === 'guitar' ? guitarChords : ukuleleChords).getChordByName(removeParenthes(simple))
        if (!chord) {
            result.push({
                type: 'lyric',
                text: simple,
            })
        } else {
            result.push({
                type: 'chord',
                text: simple,
                chordName: removeBrackets(removeParenthes(simple)),
                variation: variation,
                pointer: {
                    line: line,
                    start: m.index,
                    end: m.index + simple.length
                }
            })
        }
        x = m.index + simple.length
    })

    return result
}




export function removeParenthes(text: string) {
    const m = text.match(/\(.*?\)/)
    if (m) {
        return text.replace(m[0], '')
    }
    return text
}

export function removeBrackets(text: string) {
    return text.replaceAll('[', '')
        .replaceAll(']', '')
        .replaceAll('(', '')
        .replaceAll(')', '')
}


