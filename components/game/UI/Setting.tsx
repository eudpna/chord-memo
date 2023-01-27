import TextareaAutosize from "react-textarea-autosize"
import { Gctx } from "../../../game/Gctx"

export const Setting: React.FC<{
    gctx: Gctx
}> = (props) => {
    const gctx = props.gctx

    return <div className="text-sm p-2 rounded pb-4" style={{
        backgroundColor: '#eee'
    }}>
        <div className="font-bold pb-2" style={{
            color: '#444',
            fontSize: '1rem'
        }}>
            設定
        </div>
        <div className="pl-2">
        <div>
            楽器変更：
            <select value={gctx.instrument} className="rounded border-gray-400 px-2 bg-white" style={{
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
                <select value={gctx.notation} className="rounded border-gray-400 px-2 bg-white" style={{
                    border: 'solid 1px rgb(156,163,175)'
                }} name="" id="" onChange={(e) => {
                    
                    gctx.notation = e.target.value as Gctx['notation']
                    // if (gctx.notation === 'simple') {
                    //     gctx.convertLyricToSimple()
                    // } else {
                    //     gctx.convertSimpleToLyric()
                    // }
                    gctx.makeScore()
                    gctx.rerenderUI()
                }}>                    
                    <option value="lyric">歌詞付き</option>
                    <option value="simple">シンプル</option>
                </select>
            </div>
            <div className="text-xs pl-0.5">
                歌詞付きモードでは、コード記号を角括弧で囲う。（例： [G7]）
                <br />
                シンプルモードでは、コード記号をスペースで区切ってそのまま記述する。（例： Em G7 C）
            </div>
        </div>
        </div>
    </div>
}