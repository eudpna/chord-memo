import { ChordData } from "./lib/chords"
import { Score, ScoreElementChord, textToScore } from "./lib/score"
import { playSounds } from "./lib/sound/sound"

export type SoundType = 'guitar' | 'ukulele' | 'piano' | 'epiano' 


// export type Score = (string | ChordData[])[]

export class Gctx {
    text: string = ''
    soundType: SoundType = 'guitar'
    score: Score[]
    instrument: 'guitar' | 'ukulele' = 'ukulele'
    chordDetail: null | ScoreElementChord = null
    playingChords: string[] = []

    makeScore() {
        const lines = this.text.trim().split('\n').map(line => {
            return textToScore(line.trim())
        })
        this.score = lines
    }

    setText(text: string) {
        this.text = text
        this.makeScore()
        this.rerenderUI()
    }

    constructor(public rerenderUI: Function) {
        this.setText(`[Dm]イントロ[A#]や 間奏、[Gm]アウトロは[A7]上のように
[Dm]歌詞への[A#]コード入力は[Gm]コードチェンジしたい[A7]文字の前に`)
    }

    playSounds(keyIds: number[]) {
        return playSounds(this.soundType, keyIds)
    }
    
    

}