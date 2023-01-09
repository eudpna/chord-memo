
import Chord from '@tombatossals/react-chords/lib/Chord'
import instruments from '@tombatossals/chords-db/lib/instruments.json'
import React, { useState, useEffect, useRef } from 'react'
import { Gctx } from '../../../game/Gctx'
import { ChordType, guitarChords } from '../../../game/lib/chords'
// import { ChordType, name2url } from "../../../lib/chords"
import ChordImg from '@tombatossals/react-chords/lib/Chord'
import { ChordEl } from './ChordEl'
import { keyidToPitch } from '../../../game/lib/sound/keyIdToPitch'
import { ChordImage } from './ChordImage'
import { removeItemOnce } from '../../../game/lib/array'



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
    const chord = guitarChords.getChordByName(gctx.chordDetail.text)
    return (
        <div 
            // className="w-full max-w-sm mx-auto border-2 my-4 rounded-lg cursor-pointer relative pb-2 bg-gray-200"
            style={{
                border: 'solid 1px black'
            }}
        >
            <div>
                {chord2displayName(chord)}
            </div>
            <div className="">
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
                            width: 180,
                        }}>
                            <button className='rounded px-2 py-0.5 text-sm mb-0.5' style={{
                                border: 'solid black 1px',
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
                            <div className='text-sm'>
                                構成音: {position.midi.map(num => {
                                    const pitch = keyidToPitch(num)
                                    // return String(pitch.octave) + pitch.solfa + ' '
                                    return pitch.solfa + ' '
                                })}
                            </div>
                        </div>
                        <div>
                            {isSelected ? 
                                <button className='rounded  py-1 mt-3' style={{
                                    width: 80,
                                    border: 'solid 1px black',
                                }}>
                                    選択中
                                </button>
                            : 
                            <button className='rounded  py-1 mt-3' style={{
                                width: 80,
                                border: 'solid 1px black',
                            }}>
                                選択
                            </button>}
                            
                        </div>
                       
                    </div>})
                }
            </div>

        </div>
    )
}




function chord2displayName(chord: ChordType): string {
    if (chord.suffix === 'M') return chord.key
    return chord.key + chord.suffix
}