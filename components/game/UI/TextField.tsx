import TextareaAutosize from "react-textarea-autosize"
import { Gctx } from "../../../game/Gctx"

export const TextField: React.FC<{
    gctx: Gctx
}> = (props) => {
    const gctx = props.gctx

    return <div className=" p-0">
        <TextareaAutosize 
            value={gctx.text}
        placeholder="歌詞とコードを入力"
            className="p-1 resize-none w-full border border-gray-400 rounded" style={{
            lineHeight: 1.5,
            fontSize: '16px'
        }} minRows={3} onChange={(e) => {
            gctx.text = (e.target.value)
            gctx.rerenderUI()
            gctx.makeScore()
        }}></TextareaAutosize>
    </div>
}