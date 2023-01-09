import { ChordData } from "./lib/chords"
import { Score } from "./lib/score"

export type SoundType = 'guitar' | 'ukulele' | 'piano' | 'epiano' 


// export type Score = (string | ChordData[])[]

export class Gctx {
    text: string = ''
    soundType: SoundType = 'guitar'
    score: Score

    makeScore() {
        const tmp = this.text.matchAll(/\[.*?\]/g)
        
        const ms = Array.from(tmp)
        const result = []
        let x = 0
        ms.map(m => {
            return {
                index: m.index,
                text: m[0]
            }
        }).map(m => {
            const lyric = this.text.substring(x, m.index)
            const chord = this.text.substring(m.index, m.index + m.text.length).replaceAll('[', '').replaceAll(']', '')
            result.push({
                type: 'lyric',
                text: lyric,
            })
            result.push({
                type: 'chord',
                text: chord
            })
            x = m.index + m.text.length
        })
        this.score = result

        // this.score = result.map(r => {
            
        // })

        console.log(result)
    }

    constructor(public rerenderUI: Function) {

    }
    

}