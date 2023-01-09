import { Howl } from "howler"
import { useRef, useState, useEffect } from "react"
import { Gctx } from "../../../game/Gctx"
import { ChordData, chordToName, guitarChords } from "../../../game/lib/chords"
import { guitarInstrument } from "../../../game/lib/instruments"
import ChordImg from '@tombatossals/react-chords/lib/Chord'
import { ChordImage } from "./ChordImage"
import { ScoreElementChord } from "../../../game/lib/score"

export const ChordEl: React.FC<{
    gctx: Gctx
    scoreElementChord: ScoreElementChord
}> = (props) => {
    const gctx = props.gctx
    const chord = guitarChords.getChordByName(props.scoreElementChord.text)
    return <div className=" inline-block rounded cursor-pointer absolute" style={{
        marginRight: -10,
        marginLeft: -10,
        width: 60,
        left: 20,
        bottom: 10,
        // backgroundColor: state.sounds.length !== 0 ? '#ddd' : 'transparent'
    }}
    onClick={() => {
        gctx.chordDetail = props.scoreElementChord
        gctx.rerenderUI()
    }}
    >
        <ChordImage  gctx={gctx} chord={chord} variation={props.scoreElementChord.variation} />
    </div>
}