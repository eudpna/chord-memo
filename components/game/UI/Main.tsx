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
import { Wide } from "./Wide"



export const Main: React.FC<{
    gctx: Gctx
}> = (props) => {
    const gctx = props.gctx
    const title = gctx.title

    gctx.updateURL()

    return <div className="">
        {title ?
            <Head>
                <title>{title} | こーどめも</title>
            </Head> : null}

        {gctx.openWide ? null :
            <div>
                <div style={{
                    // backgroundColor: 'rgb(234, 234, 234)'
                }}>


                    <div className=" max-w-3xl mx-auto px-2" style={{

                    }}>
                        <A href="/" className="text-xl font-bold text-gray-700 inline-block">
                            こーどめも
                        </A>
                        <div className="text-xs inline-block pl-2" style={{
                        }}>
                            コード譜作成ツール
                        </div>
                    </div>

                </div>

                <div className="" style={{
                    backgroundColor: 'white',
                    // width: '200%',
                    // overflow: 'hidden',
                }}>
                    <div className="max-w-3xl mx-auto px-2">





                        <div className="pt-12">
                            <TextField gctx={gctx} />
                            <div className="text-xs text-right" style={{
                                marginTop: -4,
                                color: '#999'
                            }}>
                                コード画像をクリックすると詳細を表示します。
                            </div>
                        </div>
                        <div className="mt-16">
                            <Score gctx={gctx} />
                        </div>



                        <div className="mt-12">
                            <Setting gctx={gctx} />
                        </div>

                        <div className="mt-6 pb-4">
                            <div className="text-xs text-right" style={{
                            }}>
                                <A href={gctx.getChordShortcutURL()}>
                                    ChordShortcutで開く
                                </A>

                            </div>
                        </div>
                    </div>



                </div>


                <div className="relative" style={{
                    backgroundColor: 'rgb(234, 234, 234)',
                    // width: '100%',
                    // height: '100%'
                    // paddingBottom: -100,
                }}>
                    {/* <div className="absolute" style={{
                        left: -3000,
                        top: 0,
                        width: 10000,
                        height: 5000,
                        backgroundColor: 'rgb(234, 234, 234)',
                        overflow: 'hidden'
                    }}>
                    </div> */}




                    <div className="mx-auto max-w-3xl pt-12 px-2" style={{
                        color: '#777'
                    }}>


                        <div className="text-xs " style={{

                        }}>
                            <div className="font-bold" style={{

                            }}>記法について</div>
                            <div className="ml-1">
                                歌詞付きモードでは、コード記号を角括弧で囲う。（例： [G7]）
                                <br />
                                シンプルモードでは、コード記号をスペースで区切ってそのまま記述する。（例： Em G7 C）
                            </div>

                        </div>



                        <div className="mt-4 text-xs" style={{

                            lineHeight: 1.3,
                        }}>
                            <div className="font-bold" style={{

                            }}>保存方法</div>
                            <div className="ml-1">
                                このページの現在の状態を保存するには、ブラウザのアドレスバーのURLをコピーして保管するか、ブックマークしてください。（URLには、このページの現在の設定とコード譜の情報が含まれています。）
                            </div>

                        </div>


                        <div className="mt-8 text-xs">
                            <div className="font-bold" style={{

                            }}>サンプル譜</div>
                            <div className="ml-2">
                                {sampleScores.map(sample => {
                                    return <div key={sample.title}>
                                        ・<A href={location.href.replace(location.search, '') + `?title=${encodeURIComponent(sample.title)}&text=${encodeURIComponent(sample.text)}` + (sample.instrument === 'ukulele' ? '&instrument=ukulele' : '')}> {sample.title} </A>
                                    </div>
                                })}
                            </div>


                        </div>

                        <div className="mt-6 text-xs pb-12">
                            <A href="/list">利用可能なコード記号の一覧</A>
                        </div>




                       

                    </div>

                </div>


                <div className="text-xs" style={{
                    color: '#888'
                }}>
                    <div className="flex">
                        <div className="flex-1 text-right pr-2">
                            <span className="pr-2">
                                <span className="pr-1" style={{
                                    fontSize: '11px',
                                }}>
                                    最終更新
                                </span>
                                2023/02/03
                            </span>
                            by&nbsp;
                            <A href="https://twitter.com/teiwv">@teiwv</A>
                        </div>
                    </div>
                </div>



                {gctx.shouldEnableWide() ?
                    <div>
                        <button className="p-2 px-4 rounded-full text-sm fixed z-0 bg-white text-black" style={{
                            border: 'solid 1px #bbb',
                            right: 10,
                            bottom: 30,
                        }} onClick={() => {
                            gctx.openWide = true
                            gctx.rerenderUI()
                        }}>
                            ワイド表示<br />
                        </button>
                    </div> : null}
            </div>
        }

        <div>
            {gctx.openWide ?
                <Wide gctx={gctx} /> : null}
        </div>


        <div className="relative" style={{
            zIndex: 10
        }}>
            <ChordDetail gctx={gctx} />
        </div>


    </div>
}