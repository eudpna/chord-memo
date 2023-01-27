import Head from "next/head"
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
    const title = gctx.getTextFirstLineAsTitle()

    gctx.updateURL()

    return <div className="pt-4 px-2 pb-3 max-w-3xl mx-auto">
        {title ?
        <Head>
            <title>{title} | こーどめも</title>
        </Head> : null}
        <div className="mb-6">
            <A href="/" className="text-xl font-bold text-gray-700 inline-block">
                こーどめも
            </A>
            <div className="text-sm inline-block pl-2" style={{
            }}>
                コード譜作成ツール
            </div>
        </div>
        
        <div>
            {/* <div className="text-sm">コードネームを半角スペース区切りで入力してください</div> */}
            <TextField gctx={gctx} />
            <div className="text-right" style={{
                marginTop: -8
            }}>
                <button className="text-xs text-blue-600" onClick={() => {
                    gctx.downloadText()
                }}>入力をテキストファイルとしてダウンロード</button>
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
            <div className="text-xs">
                コード画像をクリックすると詳細を表示します。
            </div>
        </div>
        <div className="mt-12">
            <Setting gctx={gctx} />
        </div>
        
        <div className="mb-12 mt-8">
            <div className="text-sm p-2 rounded pb-4" style={{
                backgroundColor: '#eee'
            }}>
                <div className="font-bold pb-2" style={{
                    color: '#444',
                    fontSize: '1rem'
                }}>
                    保存・共有
                </div>
                <div className="pl-2">
                    このページの現在の状態を保存するには、ブラウザのアドレスバーのURLをコピーし、保管してください。<br />
                    （URLには、このページの現在の設定とコード譜の情報が含まれています。）
                </div>
            </div>
        </div>
        {/* <div className="text-sm mt-8">
            このコード譜の保存・共有用URL
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
        </div> */}
        <div className="mt-8 text-sm">
            サンプル譜：
            {sampleScores.map(sample => {
                return <span key={sample.title}>
                    /<A href={location.href.replace(location.search, '') + `?text=${encodeURIComponent(sample.text)}`+(sample.instrument==='ukulele' ? '&instrument=ukulele' : '')}> {sample.title} </A>
                    {/* <A key={sample.title} href={`https://${location.hostname}/?text=${encodeURIComponent(sample.text)}`}> {sample.title} </A>/ */}
                </span>
            })}
        </div>
        <div className="text-xs mt-4">
            <div className="mb-12">
                <A href="/list">利用可能なコード記号の一覧</A>
            </div>
            <div className="">
                不具合報告や要望などは <A href="https://twitter.com/teiwv">@teiwv</A> まで。<br />最終更新: 2023/01/27
            </div>
            {/* <div>
                このページの最終更新日は 2023/01/10
            </div> */}
        </div>
    </div>
}