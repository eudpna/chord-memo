export type ScoreElement = ScoreElementChord | ScoreElementLyric



export type ScoreElementChord = {
    type: 'chord'
    text: string
    variation: number
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
        let chord = text.substring(m.index, m.index + m.text.length).replaceAll('[', '').replaceAll(']', '')

        // variation
        const vm = chord.match(/\((.*?)\)/)
        let variation = 0
        if (vm) {
            console.log(vm[0])
            variation = Number(vm[1])
            chord = removeParenthes(chord)
        }

        if (lyric.trim() !== '') {
            result.push({
                type: 'lyric',
                text: lyric,
            })
        }
        result.push({
            type: 'chord',
            text: chord,
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

export function removeParenthes(text: string) {
    const m = text.match(/\(.*?\)/)
    if (m) {
        return text.replace(m[0], '')
    }
    return text
}