import React, { useEffect, useRef, useState } from "react"
import ChordImg from '@tombatossals/react-chords/lib/Chord'
import { ChordData, chordToName, guitarChords } from "../../../game/lib/chords"
import { guitarInstrument } from "../../../game/lib/instruments"
import { Howl } from "howler"
import { Gctx, SoundType } from "../../../game/Gctx"
import { ChordEl } from "./ChordEl"

export const Score: React.FC<{
    gctx: Gctx    
}> = (props) => {
    const gctx = props.gctx

    if (!gctx.score) return null

    return <div className="noselect" style={{
        marginLeft: 5,
        marginRight: -5,
        marginTop: 70,
    }}>
        {/* {gctx.score.map((line)} */}
    {gctx.score.map((line, i) => <div key={i} style={{
        minHeight: 90,
        marginBottom: 10,
    }}>
        {line.map((scoreElement, index) => {
            if (scoreElement.type === 'lyric') {
                return <div key={index} className="font-bold inline-block text-sm" style={{
                    color: '#a33c3c',
                    // top: 20,
                    // lineHeight: 3,
                    // height: 45,
                    lineHeight: '80px'
                }}>
                    {scoreElement.text}
                </div>                
            }
             return <span key={index} className="inline-block relative" style={{
                height: 45,
                width: 40,
                marginLeft: (index !== 0 && line[index-1].type === 'chord') ? 10 : -10,
                //  lineHeight: '80px'
                
            }}>
                <ChordEl gctx={props.gctx} scoreElementChord={scoreElement} />
            </span>
        }
            
        )}
    </div>)}
    </div>
}
