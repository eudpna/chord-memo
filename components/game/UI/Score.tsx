import React, { } from "react"
import { Gctx } from "../../../game/Gctx"
import { ChordEl } from "./ChordEl"

export const Score: React.FC<{
    gctx: Gctx
}> = (props) => {
    const gctx = props.gctx

    if (!gctx.score) return null

    return <div className="noselect pt-8" style={{
        marginLeft: 5,
        marginRight: 5,
        marginTop: 45,
        overflow: 'hidden',
        overflowWrap: 'anywhere',
    }}>
        {gctx.score.map((line, i) => <div key={i} style={{
            minHeight: 80,
            marginBottom: 10,
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
                    height: gctx.notation === 'lyric' ? 45 : 80,
                    width: gctx.notation === 'lyric' ? 40 : 48,
                    marginLeft: (index !== 0 && line[index - 1].type === 'chord') ? 10 : -10,
                }}>
                    <ChordEl gctx={props.gctx} scoreElementChord={scoreElement} />
                </span>
            })}
        </div>)}
    </div>
}
