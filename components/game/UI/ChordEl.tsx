import { Howl } from "howler"
import { useRef, useState, useEffect } from "react"
import { Gctx } from "../../../game/Gctx"
import { ChordData, chordToName, guitarChords, ukuleleChords } from "../../../game/lib/chords"
import { guitarInstrument } from "../../../game/lib/instruments"
import ChordImg from '@tombatossals/react-chords/lib/Chord'
import { ChordImage } from "./ChordImage"
import {  removeBrackets, removeParenthes, ScoreElementChord } from "../../../game/lib/score"

export const ChordEl: React.FC<{
    gctx: Gctx
    scoreElementChord: ScoreElementChord
}> = (props) => {
    const gctx = props.gctx

    const chordName = removeBrackets(removeParenthes(props.scoreElementChord.text))
    const chord = (gctx.instrument === 'guitar' ? guitarChords : ukuleleChords).getChordByName(chordName)
    let variation = 0

    const isDetailOpened = gctx.chordDetail === props.scoreElementChord

    // console.log(chordName, chord)
    
    if (typeof props.scoreElementChord.variation === 'number' && props.scoreElementChord.variation % 1 === 0 && 0 < props.scoreElementChord.variation && props.scoreElementChord.variation < chord.positions.length) {
        variation = props.scoreElementChord.variation
    }

    if (!chord) return <div className="font-bold inline-block rounded   absolute text-sm" style={{
        marginRight: -10,
        marginLeft: -10,
        width: 60,
        left: 20,
        bottom: 10,
        // backgroundColor: state.sounds.length !== 0 ? '#ddd' : 'transparent'
    }}>
        {/* {props.scoreElementChord.text} */}
        {chordName}
    </div>
    return <div className=" inline-block rounded  absolute" style={{
        marginRight: -10,
        marginLeft: -10,
        width: 60,
        left: 20,
        bottom: 10,
        cursor: 'pointer',
        backgroundColor: isDetailOpened ? '#ddd' : 'transparent',
    }}
    onClick={() => {
        gctx.chordDetail = props.scoreElementChord
        gctx.rerenderUI()
    }}
    >
        <ChordImage  gctx={gctx} chord={chord} variation={variation} />
    </div>
}