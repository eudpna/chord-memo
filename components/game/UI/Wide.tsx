import React, { } from "react"
import { conf } from "../../../game/conf"
import { Gctx } from "../../../game/Gctx"
import { ChordEl } from "./ChordEl"

export const Wide: React.FC<{
    gctx: Gctx
}> = (props) => {
    const gctx = props.gctx

    if (!gctx.score) return null

    return <div className="noselect fixed inset-0 bg-white" style={{
        // columnCount: gctx.columns,
        height: '100%',
    }}>
        <div className="absolute inset-0" style={{
            height: '100%',
            width: 'auto',
            // padding: 20,
            // paddingTop: 40,
            // columnRule: 'solid 1px #bbb',
            // overflowY: 'scroll',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                maxHeight: '100%',
                flexGrow: 0,
                // width: '20rem',
                // gap: '5px',
                gap: 0,
                
                padding: 10,
                // paddingTop: 40,
                // marginTop: 10,
                paddingTop: 40,
                // columnRule: 'solid 1px #bbb',
                overflowX: 'scroll',
            }}>




                {gctx.score.map((line, i) => <div key={i} style={{
                    minHeight: 90,
                    // marginBottom: 10,
                    margin: 0,
                    paddingRight: 10,
                    flexGrow: 0,
                    // paddingBottom: -10,
                    borderRight: 'solid 1px #888',
                    // width: `${Math.floor(100 / gctx.columns)}%`,
                    maxWidth: 400*gctx.columns/conf.maxColumns+200,
                    // minWidth: 300,
                 
                }}>
                    {line.map((scoreElement, index) => {
                        if (scoreElement.type === 'lyric') {
                            return <div key={index} className="font-bold inline-block text-sm" style={{
                                color: '#a33c3c',
                                lineHeight: '80px',
                            }}>
                                {scoreElement.text}
                            </div>
                        }
                        return <span key={index} className="inline-block relative" style={{
                            height: 45,
                            width: 53,
                            // marginLeft: (index !== 0 && line[index - 1].type === 'chord') ? 10 : -10,
                            marginRight: (index < line.length-1 && line[index + 1].type === 'chord') ? 10 : 0,
                            marginLeft: -10,
                        }}>
                            <ChordEl gctx={props.gctx} scoreElementChord={scoreElement} />
                        </span>
                    })}
                </div>)}

                <div>
                    <div className="fixed" style={{
                        right: 0,
                        bottom: 0,
                        width: 230,
                        height: 65,
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
                    </button>


                    <div className="fixed" style={{
                        right: 100,
                        bottom: 10,
                    }}>
                        <input
                            className="cursor-pointer"
                            type="range" min={0} max={conf.maxColumns}
                            value={gctx.columns}
                            onChange={(e) => {
                                gctx.columns = Number(e.target.value)
                                gctx.rerenderUI()
                            }}
                        />
                    </div>

                    {/* <div className="fixed" style={{
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
                    </div> */}
                </div>
                
                            
            </div>
        </div>
    </div>
}
