
import Chord from '@tombatossals/react-chords/lib/Chord'
import instruments from '@tombatossals/chords-db/lib/instruments.json'
import React, { useState, useEffect, useRef } from 'react'
import { Gctx } from '../../../game/Gctx'
import { ChordType, guitarChords, ukuleleChords } from '../../../game/lib/chords'
// import { ChordType, name2url } from "../../../lib/chords"
import ChordImg from '@tombatossals/react-chords/lib/Chord'
import { ChordEl } from './ChordEl'
import { keyidToPitch } from '../../../game/lib/sound/keyIdToPitch'
import { ChordImage } from './ChordImage'
import { removeItemOnce } from '../../../game/lib/array'
import { removeParenthes, ScoreElementChord } from '../../../game/lib/score'
import { CloseIcon } from '../../icons/CloseIcon'



export const guitarInstrument = {
    ...instruments.guitar,
    tunings: {
        standard: ['E2', 'A2', 'D3', 'G3', 'B3', 'E4']
    }
}

export const ukuleleInstrument = {
    ...instruments.ukulele,
    tunings: {
        standard: ['G4', 'C4', 'E4', 'A4']
    }
}

export const ChordDetail: React.FC<{
    gctx: Gctx
}> = (props) => {
    const gctx = props.gctx



    if (!gctx.chordDetail) return null

    // const c = gctx.chordDetail
    // const positions = c.positions
    const chord = ( gctx.instrument === 'guitar' ? guitarChords : ukuleleChords).getChordByName(gctx.chordDetail.text)
    return (
        <div className='p-1 fixed inset-0' style={{
            background: 'rgba(0,0,0,0.2)'
        }} onClick={(e)=>{
            // 詳細ウインドウを閉じる
            if ((e.target as HTMLElement).closest('.prevent-shot')) {
                return
            }
            gctx.chordDetail = null
            gctx.rerenderUI()
        }}>
            <div className='flex'>
                <div className='flex-1'></div>
        <div 
        className='prevent-shot pt-3 pb-8 px-2 bg-white rounded relative'
            // className="w-full max-w-sm mx-auto border-2 my-4 rounded-lg cursor-pointer relative pb-2 bg-gray-200"
            style={{
                // border: 'solid 1px rgb(156,163,175)',
                margin: 10,
                marginTop: 20,
                width: 380,
                height: 'auto'
                // border: 'solid 1px black'
            }}
        >
            <div  style={{
                position: 'absolute',
                right: 0,
                top: 0,
                padding: 5,
                marginRight: 0,
                marginTop: 0,
                width: 44,
                height: 44,
                cursor: 'pointer',
                background: '#eee'
            }} onClick={(e) => {
                e.stopPropagation()
                gctx.chordDetail = null
                gctx.rerenderUI()
            }}>
                <CloseIcon />
            </div>
            
            <div className='p-1  mx-2 pb-3'>
                <span className='text-xl font-bold'>
                    {chord2displayName(chord)}
                </span>
                の詳細
            </div>
            <div className="mx-auto " style={{
                width: 250
            }}>
                {chord.positions.map((position, i) =>{
                    const playingChord = gctx.chordDetail.text + String(i)
                    const isPlaying = gctx.playingChords.includes(playingChord)
                    const isSelected = gctx.chordDetail.variation === i
                    return <div key={i} className="flex">
                        <div className='relative inline-block' style={{
                            height: 70,
                            width: 60,
                            marginRight: 8,

                        }}>
                            <ChordImage gctx={props.gctx} chord={chord} variation={i} noName />
                        </div>
                       
                        <div className='inline-block' style={{
                            // width: 'full',
                            marginTop: 10,
                            width: 120,
                        }}>
                            <button className='rounded px-2 py-0.5 text-sm mb-0.5' style={{
                                border: 'solid 1px rgb(156,163,175)',
                                // border: 'solid black 1px',
                                background: isPlaying ? '#bbb' : 'white'
                            }} onClick={() => {
                                
                                props.gctx.playingChords.push(playingChord)
                                gctx.rerenderUI()
                                props.gctx.playSounds(position.midi)
                                .then(() => {
                                    setTimeout(() => {
                                        removeItemOnce(props.gctx.playingChords, playingChord)
                                        gctx.rerenderUI()
                                    }, 3000);
                                })
                            }}>
                                {isPlaying ? '再生中…' : '音を再生' }
                            </button>
                            {/* <div className='text-xs'>
                                構成音: {position.midi.map(num => {
                                    const pitch = keyidToPitch(num)
                                    // return String(pitch.octave) + pitch.solfa + ' '
                                    return <span><span className='text-xs'>{String(pitch.octave)}</span><span className='font-bold'>{pitch.solfa}</span> </span>
                                })}
                            </div> */}
                        </div>
                        <div>
                            {isSelected ? 
                                <button className='rounded  py-1 mt-2' style={{
                                    width: 80,
                                    borderStyle: 'solid',
                                    borderWidth: '1px',
                                    color: theGreen,
                                    borderColor: theGreen
                                }}>
                                    選択中
                                </button>
                            : 
                            <button className='rounded  py-1 mt-2' style={{
                                width: 80,
                                    border: 'solid 1px rgb(156,163,175)',
                                // border: 'solid 1px black',
                            }}
                            onClick={() => {
                                const p = gctx.chordDetail.pointer
                                const line = gctx.text.split('\n')[p.line];
                                let newStr = `[${gctx.chordDetail.text}(${i})]`
                                if (i===0) {
                                    newStr = newStr.replace('(0)', '')
                                }
                                const newLine = strSplice(line, p.start, p.end-p.start, newStr)
                             
                                const tmp = gctx.text.split('\n')
                                gctx.text = [...(tmp.slice(0, p.line)),
                                (newLine), ...(tmp.slice(p.line+1))].join(`\n`)

                                gctx.makeScore()
                                const thisChord = gctx.score[p.line].filter(e => {
                                    return e.type === 'chord' && e.pointer.start === p.start
                                })[0]
                                gctx.chordDetail = thisChord as ScoreElementChord
                                gctx.rerenderUI()
                            }}
                            >
                                選択
                            </button>}
                            
                        </div>
                       
                    </div>})
                }
            </div>

        </div>
                <div className='flex-1'></div>
            </div>
        </div>
    )
}




function chord2displayName(chord: ChordType): string {
    if (chord.suffix === 'M') return chord.key
    return chord.key + chord.suffix
}

export function strInsert(str: string, index: number, text: string) {
    const res = str.slice(0, index) + text + str.slice(index);
    return res;
};

export function strSplice(str: string, start: number, len: number, text: string) {
    const res = str.slice(0, start) + text + str.slice(start+len);
    return res;
};

const theGreen = '#4ade80'
const thinGreen = '#bbf7d0'