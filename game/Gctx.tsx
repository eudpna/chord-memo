import sanitize from "sanitize-filename"
import { copyToClipboard, downloadText, strSplice } from "./lib/lib"
import { Score, ScoreElementChord, textToScore, textToScoreSimpleNotation } from "./lib/score"
import { playSounds } from "./lib/sound/sound"
import { parseURL } from "./parseURL"
import audioList from '../script/resource/audioList.json'
import { ResourceLoader } from "../components/game/ResourceLoader"

export type SoundType = 'guitar' | 'ukulele' | 'piano' | 'epiano' 

export class Gctx {
    title: string = ''
    text: string = ''
    columns: number = 2
    score: Score[]
    instrument: 'guitar' | 'ukulele' = 'guitar'
    chordDetail: null | ScoreElementChord = null
    playingChords: string[] = []
    copiedMessage: number = 0
    notation: 'lyric' | 'simple' = 'lyric'
 
    // wide表示用
    openWide = false
    
    resourceLoader = new ResourceLoader()
    
    loadInstrumentAudio() {
        audioList.map(src => {
            this.resourceLoader.load(src)
            .then((resource) => {
                this.rerenderUI()
            })
        })
    }
    

    makeScore() {
        const lines = this.text.trim().split('\n').map((line, i) => {
            if (this.notation === 'simple') return textToScoreSimpleNotation(line.trim(), i, this)
            else return textToScore(line.trim(), i)
        })
        this.score = lines
     }

    downloadText() {
        downloadText(this.title? sanitize(`コード譜 ${this.title}.txt`) : 'コード譜.txt', this.text)
    }

    shouldEnableWide() {
        if (!window) return false
        if (window.screen.width < 1000) return false
        return true
    }


    getURL() {
        return location.href.replace(location.search, '') +
            `?title=${encodeURIComponent(this.title.trim())}` +
            `&text=${encodeURIComponent(this.text)}` +
            `&columns=${encodeURIComponent(this.columns)}` +
            (this.instrument === 'ukulele' ? '&instrument=ukulele' : '') +
            (this.notation === 'simple' ? '&notation=simple' : '')
    }
    
    updateURL() {
        if (location.href === this.getURL()) return
        history.replaceState(null, null, this.getURL())
    }

    setText(text: string) {
        this.text = text
        this.makeScore()
        this.rerenderUI()
    }

    constructor(public rerenderUI: Function) {
        this.loadURL()

        this.loadInstrumentAudio()

        this.makeScore()
        this.rerenderUI()
    }

    playSounds(keyIds: number[]) {
        return playSounds(this.instrument, keyIds)
    }
    
    loadURL() {
        const url = parseURL()

        if (url.title !== null) {
            this.title = url.title
        }
        if (url.text !== null) {
            this.setText(url.text)
        }
        if (url.instrument !== null) {
            this.instrument = url.instrument
        }
        if (url.columns !== null) {
            this.columns = url.columns
        }
        if (url.notation !== null) {
            this.notation = url.notation
        }

        this.makeScore()
        this.rerenderUI()
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
        this.rerenderUI()
    }

    replaceLine(lineNum: number, newText: string) {
        const tmp = this.text.split('\n')
        this.text = [...(tmp.slice(0, lineNum)),
        (newText), ...(tmp.slice(lineNum + 1))].join(`\n`)
    }

    changeTextOfChord(chord: ScoreElementChord, newStr: string) {
        const p = chord.pointer
        const line = this.text.split('\n')[p.line];
        const newLine = strSplice(line, p.start, p.end - p.start, newStr)
        this.replaceLine(p.line, newLine)
    }
       

    getChordShortcutURL() {
        const chordNames: string[] = []
        
        this.score.flatMap(s => s).filter(score => score.type === 'chord')
        .map(score => {
            const s = score as ScoreElementChord
            if (!chordNames.includes(s.chordName)) {
                chordNames.push(s.chordName)
            }
        })
        let text = ''
        let count = 1
        chordNames.map(chordName => {
            text = text + chordName + ' '
            if (count % 10 === 0) {
                text = text + '\n'
            }
            count++
        })
        text = text.trim()


        return `https://chordshortcut.nyaw.net/` +
            `?title=${encodeURIComponent(this.title.trim())}` +
            `&text=${encodeURIComponent(text)}`
    }

}