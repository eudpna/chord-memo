import { Gctx } from "../../../game/Gctx"

export const Setting: React.FC<{
    gctx: Gctx
}> = (props) => {
    const gctx = props.gctx

    return <div className="text-sm rounded pb-4">
        <div>
            <div>
                楽器：
                <select value={gctx.instrument} className="rounded px-2 bg-white" style={{
                    border: 'solid 1px #bbb',

                }} name="" id="" onChange={(e) => {
                    gctx.instrument = e.target.value as 'guitar' | 'ukulele'
                    gctx.makeScore()
                    gctx.rerenderUI()
                }}>
                    <option value="guitar">ギター</option>
                    <option value="ukulele">ウクレレ</option>
                </select>
            </div>
            <div className="mt-2">
                <div>
                    記法：
                    <select value={gctx.notation} className="rounded px-2 bg-white" style={{
                        border: 'solid 1px #bbb',
                    }} onChange={(e) => {
                        gctx.notation = e.target.value as Gctx['notation']
                        gctx.makeScore()
                        gctx.rerenderUI()
                    }}>
                        <option value="lyric">歌詞付き</option>
                        <option value="simple">シンプル</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
}