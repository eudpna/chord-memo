import TextareaAutosize from "react-textarea-autosize"
import { Gctx } from "../../../game/Gctx"

export const Setting: React.FC<{
    gctx: Gctx
}> = (props) => {
    const gctx = props.gctx

    return <div className=" p-0 pt-6">
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
}