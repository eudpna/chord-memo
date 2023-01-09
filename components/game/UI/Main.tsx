import React, { useEffect, useState } from "react"
import { Gctx } from "../../../game/Gctx"
import { Result } from "./Result"
import { TextField } from "./TextField"



export const Main: React.FC<{
    gctx: Gctx
}> = (props) => {
    const gctx = props.gctx


    return <div>
        <div className="mb-8">
            {/* <SoundSelect gctx={gctx} /> */}
        </div>
        <div>
            <div className="text-sm">コードネームを半角スペース区切りで入力してください</div>
            <TextField gctx={gctx} />
        </div>
        <div>
            <Result gctx={gctx} />
        </div>
        <div className="text-sm pt-4">
            コードを長押しすると音が出ます（数字1~9キーを押しても可）
        </div>
    </div>
}