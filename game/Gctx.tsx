import { ChordData } from "./lib/chords"
import { Score, textToScore } from "./lib/score"

export type SoundType = 'guitar' | 'ukulele' | 'piano' | 'epiano' 


// export type Score = (string | ChordData[])[]

export class Gctx {
    text: string = ''
    soundType: SoundType = 'guitar'
    score: Score[]

    makeScore() {
        const lines = this.text.trim().split('\n').map(line => {
            return textToScore(line.trim())
        })
        this.score = lines
    }

    constructor(public rerenderUI: Function) {

    }
    

}