import TextareaAutosize from "react-textarea-autosize"
import { Gctx } from "../../../game/Gctx"

export const TextField: React.FC<{
    gctx: Gctx
}> = (props) => {
    const gctx = props.gctx

    return <div className=" p-0">
        <div
        className="mb-3 mt-2" 
        >
            <div className="text-xs" style={{
                color: '#888'
            }}>
                タイトル
            </div>
            <input type="text" className="p-1 resize-none w-full border rounded"
             value={gctx.title}
            placeholder="タイトル"
            onChange={(e) => {
                gctx.title = e.target.value
                gctx.rerenderUI()
            }} style={{
                width: '100%',
                border: 'solid 1px #bbb',
            }} />
        </div>  

        
        <div className="text-xs" style={{
            color: '#888'
        }}>
            コード譜入力
        </div>
        <TextareaAutosize 
            value={gctx.text}
        placeholder={gctx.notation==='lyric'?"歌詞とコードを入力":'コードを入力'}
            className="p-1 resize-none w-full border  rounded" style={{
                border: 'solid 1px #bbb',
                lineHeight: 1.5,
            // fontSize: '16px'
        }} minRows={3} onChange={(e) => {
            gctx.text = (e.target.value)
            gctx.rerenderUI()
            gctx.makeScore()
        }}></TextareaAutosize>
    </div>
}