import { ChordData } from "./lib/chords"
import { copyToClipboard, downloadText, getUrlParameter } from "./lib/lib"
import { Score, ScoreElementChord, textToScore } from "./lib/score"
import { playSounds } from "./lib/sound/sound"


export type SoundType = 'guitar' | 'ukulele' | 'piano' | 'epiano' 


// export type Score = (string | ChordData[])[]

export class Gctx {
    text: string = ''
    // soundType: SoundType = 'guitar'
    score: Score[]
    instrument: 'guitar' | 'ukulele' = 'guitar'
    chordDetail: null | ScoreElementChord = null
    playingChords: string[] = []
    copiedMessage: number = 0

    makeScore() {
        const lines = this.text.trim().split('\n').map((line, i) => {
            return textToScore(line.trim(), i)
        })
        this.score = lines
    }

    downloadText() {
        downloadText('コード譜.txt', this.text)
    }

    copyURLToClipBoard() {
        copyToClipboard(this.getShareURL())
        .then(() => {
            this.copiedMessage++
            this.rerenderUI()
            setTimeout(() => {
                this.copiedMessage--
                this.rerenderUI()
            }, 2000);
        })
        // if (navigator && navigator.clipboard) {
        //     navigator.clipboard.writeText(this.getShareURL())
        //     this.copiedMessage++
        //     this.rerenderUI()
        //     setTimeout(() => {
        //         this.copiedMessage--
        //         this.rerenderUI()
        //     }, 2000);
        // }
        
    }

    getShareURL() {
        return location.href.replace(location.search, '') + `?text=${encodeURIComponent(this.text)}` + (this.instrument === 'ukulele' ? '&instrument=ukulele' : '')
    }

    setText(text: string) {
        this.text = text
        this.makeScore()
        this.rerenderUI()
    }

    constructor(public rerenderUI: Function) {
        const text = getUrlParameter('text', location.href)
        if (text && typeof text === 'string') {
            this.setText(text)
        }
        const instrument = getUrlParameter('instrument', location.href)
        if (instrument && typeof instrument === 'string') {
            if (instrument === 'ukulele' || this.instrument === 'guitar') {
                this.instrument = instrument as this['instrument']
            }            
        }

        this.makeScore()
        this.rerenderUI()
    }

    playSounds(keyIds: number[]) {
        return playSounds(this.instrument, keyIds)
    }
    
    

}