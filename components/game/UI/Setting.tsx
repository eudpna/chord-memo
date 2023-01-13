import TextareaAutosize from "react-textarea-autosize"
import { Gctx } from "../../../game/Gctx"

export const Setting: React.FC<{
    gctx: Gctx
}> = (props) => {
    const gctx = props.gctx

    return <div className="text-sm p-0 pt-6">
        <div>
            楽器変更：
            <select value={gctx.instrument} className="rounded border-gray-400 px-2" style={{
                border: 'solid 1px rgb(156,163,175)'
            }} name="" id="" onChange={(e) => {
                gctx.instrument = e.target.value as 'guitar' | 'ukulele'
                gctx.makeScore()
                gctx.rerenderUI()
            }}>
                <option value="guitar">ギター</option>
                <option value="ukulele">ウクレレ</option>
            </select>
        </div>
        <div className="mt-4">
            <div>
                記法：
                <select value={gctx.notation} className="rounded border-gray-400 px-2" style={{
                    border: 'solid 1px rgb(156,163,175)'
                }} name="" id="" onChange={(e) => {
                    gctx.notation = e.target.value as Gctx['notation']
                    gctx.makeScore()
                    gctx.rerenderUI()
                }}>
                    <option value="lyric">歌詞付き</option>
                    <option value="simple">シンプル</option>
                </select>
            </div>
            <div className="text-xs">
                歌詞付きモードでは、コード記号を角括弧で囲う。（例： [G7]）<br />
                シンプルモードでは、コード記号をスペースで区切ってそのまま記述する。（例： Em G7 C）
            </div>
        </div>
    </div>
}