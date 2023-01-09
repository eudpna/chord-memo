import { Howl } from "howler"
import { useRef, useState, useEffect } from "react"
import { Gctx } from "../../../game/Gctx"
import { ChordData, chordToName } from "../../../game/lib/chords"
import { guitarInstrument } from "../../../game/lib/instruments"
import { sound } from "../../../game/lib/sound/sound"
import ChordImg from '@tombatossals/react-chords/lib/Chord'

export const ChordEl: React.FC<{
    gctx: Gctx
    chord: ChordData
    index: number
}> = (props) => {
    const gctx = props.gctx

    const ref = useRef<HTMLDivElement>(null)



    // 線を太くして見やすく（改造）
    useEffect(() => {
        const root = ref.current
        const path = root.firstChild.firstChild.firstChild.firstChild as SVGPathElement
        path.setAttribute('stroke-width', '0.75')
    }, []);

  

    
    // const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

  

    return <div className="w-24 inline-block rounded cursor-pointer" style={{
        marginRight: -10,
        marginLeft: -10,
        // backgroundColor: state.sounds.length !== 0 ? '#ddd' : 'transparent'
    }}
    >
        <div className="text-center text-lg font-bold" style={{
            marginBottom: -12,

        }}>
            {chordToName(props.chord)}
        </div>
        <div ref={ref} className="w-full" style={{
            transform: 'rotate(-90deg)'
        }} >
            <ChordImg chord={props.chord.positions[0]}
                instrument={guitarInstrument}
                lite
            />
        </div>
    </div>
}