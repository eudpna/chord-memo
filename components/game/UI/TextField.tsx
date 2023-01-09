import TextareaAutosize from "react-textarea-autosize"
import { Gctx } from "../../../game/Gctx"

export const TextField: React.FC<{
    gctx: Gctx
}> = (props) => {
    const gctx = props.gctx

    return <div className="border border-gray-500 rounded">
        <TextareaAutosize 
        placeholder="例：CM7 G# Bbm Fsus2 ..."
        className="p-1 pb-0 resize-none w-full" style={{
            lineHeight: 1.2
        }} minRows={2} onChange={(e) => {
            gctx.text = (e.target.value)
            console.log('chage')
            gctx.rerenderUI()
            gctx.makeScore()
        }}>{gctx.text}</TextareaAutosize>
    </div>
}