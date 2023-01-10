import React, { useEffect, useState } from "react"
import { Gctx } from "../../../game/Gctx"
import { sampleScores } from "../../../game/sample"
import { A } from "../../A"
import { ChordDetail } from "./ChordDetail"
import { Score } from "./Score"
import { Setting } from "./Setting"

import { TextField } from "./TextField"



export const Main: React.FC<{
    gctx: Gctx
}> = (props) => {
    const gctx = props.gctx


    return <div className="pt-4 px-2 pb-16 max-w-3xl mx-auto">
        <div className="text-2xl">
            コード譜作成
        </div>
        <div className="mb-8">
            {/* <SoundSelect gctx={gctx} /> */}
        </div>
        <div>
            {/* <div className="text-sm">コードネームを半角スペース区切りで入力してください</div> */}
            <TextField gctx={gctx} />
            <div style={{
                marginTop: -6
            }}>
                <button className="text-sm text-blue-700" onClick={()=>{
                    gctx.downloadText()
                }}>テキストファイルとしてダウンロード</button>
            </div>
        </div>
        <div>
            <Score gctx={gctx} />
        </div>
        
        {/* <div className="text-sm pt-4">
            コードを長押しすると音が出ます（数字1~9キーを押しても可）
        </div> */}
        <div>
            <ChordDetail gctx={gctx} />
            <div className="text-sm">
                コード画像をクリックすると詳細を表示します。
            </div>
        </div>
        <div className="text-sm mt-8">
            このコード譜の共有用URL:
            <div className="bg-gray-200 p-0.5 text-xs" style={{
                overflowWrap: 'break-word',
                wordBreak: 'break-all',
            }}>
                {location.href.replace(location.search, '') + `?text=${encodeURIComponent(gctx.text)}` + (gctx.instrument === 'ukulele' ? '&instrument=ukulele' : '')}
            </div>
        </div>
        <div>
            <Setting gctx={gctx}/>
        </div>
        <div className="pt-2">
            コード譜の作例：
            {sampleScores.map(sample => {
                return <span key={sample.title}>
                    /<A  href={location.href.replace(location.search, '') + `?text=${encodeURIComponent(sample.text)}`}> {sample.title} </A>
                    {/* <A key={sample.title} href={`https://${location.hostname}/?text=${encodeURIComponent(sample.text)}`}> {sample.title} </A>/ */}
                </span>
            })}
        </div>
    </div>
}