import { ChordData } from "./lib/chords"
import { Score, textToScore } from "./lib/score"
import { playSounds } from "./lib/sound/sound"

export type SoundType = 'guitar' | 'ukulele' | 'piano' | 'epiano' 


// export type Score = (string | ChordData[])[]

export class Gctx {
    text: string = ''
    soundType: SoundType = 'guitar'
    score: Score[]
    instrument: 'guitar' | 'ukulele' = 'ukulele'
    chordDetail: null | ChordData = null

    makeScore() {
        const lines = this.text.trim().split('\n').map(line => {
            return textToScore(line.trim())
        })
        this.score = lines
    }

    constructor(public rerenderUI: Function) {
        this.text = `[Dm]イントロ[A#]や 間奏、[Gm]アウトロは[A7]上のように
[Dm]歌詞への[A#]コード入力は[Gm]コードチェンジしたい[A7]文字の前に`
    this.rerenderUI()
    }

    playSounds(keyIds: number[]) {
        playSounds(this.soundType, keyIds)
    }
    
    

}