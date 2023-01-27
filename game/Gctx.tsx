import sanitize from "sanitize-filename"
import { ChordData } from "./lib/chords"
import { copyToClipboard, downloadText, getUrlParameter, strSplice } from "./lib/lib"
import { Score, ScoreElementChord, textToScore, textToScoreSimpleNotation } from "./lib/score"
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
    notation: 'lyric' | 'simple' = 'lyric'
    initialTitle: string = ''

    makeScore() {
        const lines = this.text.trim().split('\n').map((line, i) => {
            if (this.notation === 'simple') return textToScoreSimpleNotation(line.trim(), i, this)
            else return textToScore(line.trim(), i)
        })
        this.score = lines
        console.log(this.score)
    }

    downloadText() {
        const title = this.getTextFirstLineAsTitle()
        downloadText(title? sanitize(`コード譜 ${title}.txt`) : 'コード譜.txt', this.text)
    }

    getTextFirstLineAsTitle(): string | null {
        const title = this.text.split(`\n`)[0].trim()
        if (title === '') return null
        return title
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
        return location.href.replace(location.search, '') + `?text=${encodeURIComponent(this.text)}` + (this.instrument === 'ukulele' ? '&instrument=ukulele' : '') + (this.notation === 'simple' ? '&notation=simple' : '')
    }
    
    updateURL() {
        history.replaceState(null, null, this.getShareURL())
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
            this.initialTitle = this.getTextFirstLineAsTitle()
        }
        const instrument = getUrlParameter('instrument', location.href)
        if (instrument && typeof instrument === 'string') {
            if (instrument === 'ukulele' || this.instrument === 'guitar') {
                this.instrument = instrument as this['instrument']
            }            
        }

        const notation = getUrlParameter('notation', location.href)
        if (notation && typeof notation === 'string') {
            if (notation === 'simple' || this.notation === 'simple') {
                this.notation = notation as this['notation']
            }
        }

        this.makeScore()
        this.rerenderUI()
    }

    playSounds(keyIds: number[]) {
        return playSounds(this.instrument, keyIds)
    }
    
    

    convertSimpleToLyric() {
        this.score.map(line => {
            line.map(scoreElement => {
                if (scoreElement.type === 'chord') {
                    let newText = `[${scoreElement.text}(${scoreElement.variation})]`
                    if (scoreElement.variation === 0) {
                        newText = `[${scoreElement.text}]`
                    }
                    this.changeTextOfChord(scoreElement, newText)
                }
            })
        })
    }

    convertLyricToSimple() {
        
        this.score.map(line => {
            line.map(scoreElement => {
                if (scoreElement.type === 'chord') {
                    let newText = scoreElement.text.replaceAll('[', ' ').replaceAll(']', ' ')
                    this.changeTextOfChord(scoreElement, newText)
                }
            })
        })
    }

    changeVariationOfChord(chord: ScoreElementChord, num: number) {
        let newStr = `${chord.chordName}(${num})`
        if (this.notation === 'lyric') {
            newStr = `[${newStr}]`
        }
        if (num === 0) {
            newStr = newStr.replace('(0)', '')
        }
        
        this.changeTextOfChord(chord, newStr)

        this.makeScore()
        
        const p = chord.pointer
        const thisChord = this.score[p.line].filter(e => {
            return e.type === 'chord' && e.pointer.start === p.start
        })[0]
        this.chordDetail = thisChord as ScoreElementChord
        console.log(this.chordDetail)
        this.rerenderUI()
    }

    replaceLine(lineNum: number, newText: string) {
        const tmp = this.text.split('\n')
        this.text = [...(tmp.slice(0, lineNum)),
        (newText), ...(tmp.slice(lineNum + 1))].join(`\n`)
        // this.makeScore()
        // this.rerenderUI()
    }

    changeTextOfChord(chord: ScoreElementChord, newStr: string) {
        const p = chord.pointer
        const line = this.text.split('\n')[p.line];
        const newLine = strSplice(line, p.start, p.end - p.start, newStr)
        this.replaceLine(p.line, newLine)
        // this.makeScore()
        // this.rerenderUI()
    }
       

}