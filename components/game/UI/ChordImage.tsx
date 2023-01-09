import { Howl } from "howler"
import { useRef, useState, useEffect } from "react"
import { Gctx } from "../../../game/Gctx"
import { ChordData, chordToName } from "../../../game/lib/chords"
import { guitarInstrument } from "../../../game/lib/instruments"
import ChordImg from '@tombatossals/react-chords/lib/Chord'

export const ChordImage: React.FC<{
    gctx: Gctx
    chord: ChordData
    variation: number
    noName?: boolean
}> = (props) => {
    const gctx = props.gctx

    const ref = useRef<HTMLDivElement>(null)

    // 線を太くして見やすく（改造）
    useEffect(() => {
        const root = ref.current
        const path = root.firstChild.firstChild.firstChild.firstChild as SVGPathElement
        path.setAttribute('stroke-width', '0.75')
    }, []);

    return <div>
        {props.noName ? null :
        <div className="text-center text-sm font-bold" style={{
            marginBottom: -8,

        }}>
            {chordToName(props.chord)}
        </div>}
        <div ref={ref} className="w-full" style={{
            transform: 'rotate(-90deg)'
        }} >
            <ChordImg chord={props.chord.positions[props.variation]}
                instrument={guitarInstrument}
                lite
            />
        </div>
    </div>
}