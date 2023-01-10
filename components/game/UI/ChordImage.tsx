import { Howl } from "howler"
import { useRef, useState, useEffect } from "react"
import { Gctx } from "../../../game/Gctx"
import { ChordData, chordToName } from "../../../game/lib/chords"
import { guitarInstrument } from "../../../game/lib/instruments"
import ChordImg from '@tombatossals/react-chords/lib/Chord'
import { ukuleleInstrument } from "./ChordDetail"

export const ChordImage: React.FC<{
    gctx: Gctx
    chord: ChordData
    variation: number
    noName?: boolean
}> = (props) => {
    const gctx = props.gctx

    const ref = useRef<HTMLDivElement>(null)

    function kaizou() {
        
        // 線を太くして見やすく（改造）
        const root = ref.current
        if (!root) return
        const path = root.firstChild.firstChild.firstChild.firstChild as SVGPathElement
        path.setAttribute('stroke-width', '0.75')

        // 文字を大きくして見やすく（改造）
        root.style.overflow = 'visible'
        const texts = root.getElementsByTagName('text')
        Array.from(texts).map(text => {
            text.style.fill = '#777'
            // text.style.zIndex = '1'
            text.style.stroke = '#777'
            if (text.getAttribute('font-size') === '0.25rem') {
               text.setAttribute('font-size', '0.9rem')
                
                
                // text.setAttribute('transform', "translateX('-1rem')")
                // text.setAttribute('x', "-20")
                // text.style.marginLeft = '-20px'
                // text.style.left = '-20px'
                // text.style.textOverflow = 'visible'
                // text.style.overflow = 'visible'
                // text.parentElement.style.overflow = 'visible'
                // text.parentElement.style.width = '100px'
                // text.parentElement.style.height = '100px'
                // text.setAttribute('overflow', "visible")
            }
        })
    }

    
    useEffect(() => {
        kaizou()
    });

    // kaizou()

    return <div>
        {props.noName ? null :
        <div className="text-center text-sm font-bold" style={{
            marginBottom: -8,

        }}>
            {chordToName(props.chord)}
        </div>}
        <div ref={ref} className="w-full" style={{
            transform: 'rotate(-90deg)',
        }} >
            <ChordImg chord={props.chord.positions[props.variation]}
                instrument={gctx.instrument === 'guitar' ?  guitarInstrument : ukuleleInstrument}
                lite
            />
        </div>
    </div>
}