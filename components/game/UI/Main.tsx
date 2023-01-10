import React, { useEffect, useState } from "react"
import { Gctx } from "../../../game/Gctx"
import { sampleScores } from "../../../game/sample"
import { A } from "../../A"
import { CopyIcon } from "../../icons/CopyIcon"
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
                marginTop: -8
            }}>
                <button className="text-xs text-blue-700" onClick={() => {
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
        <div className="relative" style={{
            zIndex: 10
        }}>
            <ChordDetail gctx={gctx} />
            <div className="text-sm">
                コード画像をクリックすると詳細を表示します。
            </div>
        </div>
        <div className="mb-12">
            <Setting gctx={gctx} />
        </div>
        <div className="text-sm mt-8">
            このコード譜の共有用URL:
            <div className="relative">
                <div className="bg-gray-200 p-0.5 text-xs relative" style={{
                    overflowWrap: 'break-word',
                    wordBreak: 'break-all',
                    // maxHeight: '60px',
                    height: '60px',
                    overflow: 'scroll'
                }}>
                    {gctx.getShareURL()}
                </div>
                <div className="absolute right-0 top-0 cursor-pointer" style={{
                    background: 'rgba(0,0,0,0.4)'
                }} onClick={() => {
                    gctx.copyURLToClipBoard()
                }}>
                    {gctx.copiedMessage ? 
                        <div className="text-gray-500 font-bold text-sm" style={{
                            marginTop: -20,
                            width: 0,
                            marginLeft: -20,
                            
                        }}>Copied!</div>
                    : null}
                    
                    <div className="relative pt-0.5 pl-0.5" style={{
                        width: 27,
                        height: 30,
                    }}>
                        <CopyIcon />
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-8 text-sm">
            コード譜の作例：
            {sampleScores.map(sample => {
                return <span key={sample.title}>
                    /<A href={location.href.replace(location.search, '') + `?text=${encodeURIComponent(sample.text)}`}> {sample.title} </A>
                    {/* <A key={sample.title} href={`https://${location.hostname}/?text=${encodeURIComponent(sample.text)}`}> {sample.title} </A>/ */}
                </span>
            })}
        </div>
        <div className="text-xs mt-6">
            <div className="mb-4">
                <A inSite href="/list">対応しているコードの一覧</A>
            </div>
            <div>
                不具合報告や要望などは <A href="https://twitter.com/teiwv">@teiwv</A> まで。
            </div>
            <div>
                このページの最終更新日は 2023/01/10
            </div>
        </div>
    </div>
}