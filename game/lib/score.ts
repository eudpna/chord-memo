export type ScoreElement = ScoreElementChord | ScoreElementLyric



export type ScoreElementChord = {
    type: 'chord'
    text: string
    variation: number
}

export type ScoreElementLyric = {
    type: 'lyric'
    text: string
}

export type Score = ScoreElement[]



export function textToScore(text: string): Score {
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
        const chord = text.substring(m.index, m.index + m.text.length).replaceAll('[', '').replaceAll(']', '')
        result.push({
            type: 'lyric',
            text: lyric,
        })
        result.push({
            type: 'chord',
            text: chord,
            variation: 0
        })
        x = m.index + m.text.length
    })
    const lyric = text.substring(x, text.length)
    result.push({
        type: 'lyric',
        text: lyric,
    })
    

    return result
}