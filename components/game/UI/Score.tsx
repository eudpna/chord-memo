import React, { useEffect, useRef, useState } from "react"
import ChordImg from '@tombatossals/react-chords/lib/Chord'
import { ChordData, chordToName, guitarChords } from "../../../game/lib/chords"
import { sound } from "../../../game/lib/sound/sound"
import { guitarInstrument } from "../../../game/lib/instruments"
import { Howl } from "howler"
import { Gctx, SoundType } from "../../../game/Gctx"
import { ChordEl } from "./ChordEl"

export const Score: React.FC<{
    gctx: Gctx    
}> = (props) => {
    const gctx = props.gctx

    if (!gctx.score) return null

    return <div className="pt-10 noselect" style={{
        marginLeft: -5,
        marginRight: -5,
        marginTop: 70,
    }}>
        {/* {gctx.score.map((line)} */}
    {gctx.score.map((line, i) => <div key={i} style={{
        minHeight: 80,
        marginBottom: 10,
    }}>
        {line.map((scoreElement, index) => {
            if (scoreElement.type === 'lyric') {
                return <div className="font-bold inline-block text-sm" style={{
                    color: '#a33c3c',
                    // top: 20,
                    // lineHeight: 3,
                    // height: 45,
                }}>
                    {scoreElement.text}
                </div>                
            }
            const chord = guitarChords.getChordByName(scoreElement.text)
            return <span key={index} className="inline-block relative" style={{
                height: 0,
                width: 40,
                marginLeft: 10,
            }}>
                <ChordEl gctx={props.gctx} index={index} chord={chord} />
            </span>
        }
            
        )}
    </div>)}
    </div>
}
