import React, { useEffect, useRef, useState } from "react"
import ChordImg from '@tombatossals/react-chords/lib/Chord'
import { ChordData, chordToName, guitarChords } from "../../../game/lib/chords"
import { guitarInstrument } from "../../../game/lib/instruments"
import { Howl } from "howler"
import { Gctx, SoundType } from "../../../game/Gctx"
import { ChordEl } from "./ChordEl"

export const Wide: React.FC<{
    gctx: Gctx    
}> = (props) => {
    const gctx = props.gctx

    if (!gctx.score) return null

    return <div className="noselect fixed inset-0 bg-white" style={{
        // backgroundColor: 'rgba(255,255,255,0.95)',
        columnCount: gctx.columns,
        padding: 20,
        paddingTop: 40,
        columnRule: 'solid 1px #bbb',
        overflowY: 'scroll',
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
                    lineHeight: '80px',
                    // overflow: 'hidden'
                }}>
                    {scoreElement.text}
                </div>                
            }
             return <span key={index} className="inline-block relative" style={{
                height: 45,
                width: 40,
                marginLeft: (index !== 0 && line[index-1].type === 'chord') ? 10 : -10,
                // overflow: 'visible'
                //  lineHeight: '80px'
                
            }}>
                <ChordEl gctx={props.gctx} scoreElementChord={scoreElement} />
            </span>
        }
            
        )}
    </div>)}





        <div>
            <div className="fixed " style={{
                right: 0,
                bottom: 0,
                width: 230,
                height: 65,
                // background: 'rgba(255,255,255,0.8)',
            }}>
            </div>

            <button className="p-2 px-4 rounded-full fixed text-sm bg-white text-black" style={{
                border: 'solid 1px #bbb',
                right: 10,
                bottom: 10,
            }} onClick={() => {
                gctx.openWide = false
                gctx.rerenderUI()
            }}>
                閉じる<br />
                {/* <span className="text-sm">(演奏時用)</span> */}
            </button>



            <div className="fixed" style={{
                right: 100,
                bottom: 10,
            }}>
                段数：
                <select value={gctx.columns} className="rounded  bg-white px-3" style={{
                    border: 'solid 1px #bbb'
                }} name="" id="" onChange={(e) => {

                    gctx.columns = Number(e.target.value)

                    gctx.rerenderUI()
                }}>
                    <option value="1">1段</option>
                    <option value="2">2段</option>
                    <option value="3">3段</option>
                    <option value="4">4段</option>
                </select>
            </div>

        </div>

        
    </div>
}
