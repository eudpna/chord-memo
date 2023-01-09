export type ScoreElement = {
    type: 'chord' | 'lyric'
    text: string
}

export type Score = ScoreElement[]