import TextareaAutosize from "react-textarea-autosize"
import { Gctx } from "../../../game/Gctx"

export const Setting: React.FC<{
    gctx: Gctx
}> = (props) => {
    const gctx = props.gctx

    return <div className=" p-0 pt-6">
        楽器変更：
        <select className="rounded px-2" style={{
            border: 'solid 1px black'
        }} name="" id="" onChange={(e) => {
            gctx.instrument = e.target.value as 'guitar' | 'ukulele'
            gctx.makeScore()
            gctx.rerenderUI()
        }}>
            <option value="guitar" selected>ギター</option>
            <option value="ukulele">ウクレレ</option>
        </select>
    </div>
}