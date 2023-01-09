import React, { useEffect, useRef, useState } from "react"
import ChordImg from '@tombatossals/react-chords/lib/Chord'
import { ChordData, chordToName } from "../../../game/lib/chords"
import { sound } from "../../../game/lib/sound/sound"
import { guitarInstrument } from "../../../game/lib/instruments"
import { Howl } from "howler"
import { Gctx, SoundType } from "../../../game/Gctx"

export const Result: React.FC<{
    gctx: Gctx    
}> = (props) => {

    return <div className="pt-10 noselect" style={{
        marginLeft: -5,
        marginRight: -5,
    }}>
    {/* {props.gctx.chords.map((line, i) => <div style={{
        minHeight: 50
    }}>
        {line.map((chord, index) => 
            <ChordEl gctx={props.gctx} index={index} chord={chord} />
        )}
    </div>)} */}
    </div>
}
