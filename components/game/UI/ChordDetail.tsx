
import Chord from '@tombatossals/react-chords/lib/Chord'
import instruments from '@tombatossals/chords-db/lib/instruments.json'
import React, { useState, useEffect, useRef } from 'react'
import { Gctx } from '../../../game/Gctx'
import { ChordType } from '../../../game/lib/chords'
// import { ChordType, name2url } from "../../../lib/chords"
import ChordImg from '@tombatossals/react-chords/lib/Chord'



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

export const Position: React.FC<{
    gctx: Gctx
    position: ChordType['positions'][number]
}> = (props) => {

    const ref = useRef<HTMLDivElement>(null)

    // 線を太くして見やすく（改造）
    useEffect(() => {
        const root = ref.current
        // const path = root.firstChild.firstChild.firstChild.firstChild as SVGPathElement
        // const circles = root.getElementsByTagName('circle')
        const texts = root.getElementsByTagName('text')
        Array.from(texts).map(text => {
            if (text.getAttribute('font-size') === '3pt') {
                text.setAttribute('font-size', '5px')
            }
        })
        // Array.from(circles).map(circle => {
        //     // const text = circle.getElementsByTagName('text')
        //     const text = circle.nextSibling as Element
        //     if (text) {
        //         text.setAttribute('font-size', '5px')
        //     }
            
        //     // Array.from(text).map(text => {
        //     //     text.setAttribute('font-size', '5px')
        //     // })
        // })
        // // path.setAttribute('stroke-width', '0.75')
    }, []);

    return <div>
        <div
        ref={ref}
         style={{
            width: 160,
        }}>
            {/* <Chord
                chord={props.position}
                instrument={props.gctx.instrument === 'guitar' ? guitarInstrument : ukuleleInstrument}
            /> */}
            <ChordImg chord={props.position}
                instrument={guitarInstrument}
                lite
            />
        </div>
        <button onClick={() => {
            props.gctx.playSounds(props.position.midi)
        }}>
            音を再生
        </button>
        
    </div>
}

export const ChordDetail: React.FC<{
    gctx: Gctx
}> = (props) => {
    const gctx = props.gctx



    if (!gctx.chordDetail) return null

    const c = gctx.chordDetail
    const positions = c.positions

    return (
        <div key={gctx.instrument + c.key + c.suffix}
            // className="w-full max-w-sm mx-auto border-2 my-4 rounded-lg cursor-pointer relative pb-2 bg-gray-200"
            style={{
                border: 'solid 1px black'
            }}
            onClick={(e) => {

            }}
        >
            <div>
                {chord2displayName(c)}
            </div>
            <div className="">
                {positions.map((p, i) =>
                    <div key={i} >
                        <Position gctx={gctx} position={p} />
                    </div>)
                }
            </div>

        </div>
    )
}




function chord2displayName(chord: ChordType): string {
    if (chord.suffix === 'M') return chord.key
    return chord.key + chord.suffix
}