import { Gctx } from "../Gctx"


export function setTouchEventListeners(gctx: Gctx) {
    // タッチ開始
    window.addEventListener('touchstart', (e) => {
        if ((e.target as HTMLElement).closest('.prevent-shot')) {
            return
        }
        gctx.input.touched_point = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
        }
        gctx.input.mouse_pointer = gctx.input.touched_point
    })
    window.addEventListener('mousedown', (e) => {
        if ((e.target as HTMLElement).closest('.prevent-shot')) {
            return
        }
        gctx.input.touched_point = {
            x: e.clientX,
            y: e.clientY,
        }
        gctx.input.mouse_pointer = gctx.input.touched_point
    })


    // 移動
    window.addEventListener('touchmove', (e) => {
        gctx.input.mouse_pointer = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
        }
    })
    window.addEventListener('mousemove', (e) => {
        gctx.input.mouse_pointer = {
            x: e.clientX,
            y: e.clientY,
        }
    })

    // タッチ終了
    window.addEventListener('touchend', (e) => {
        if (!gctx.input.touched_point) return

        if ((e.target as HTMLElement).closest('.prevent-shot')) {
            return
        }

        const d = {
            x: gctx.input.touched_point.x - gctx.input.mouse_pointer.x,
            y: gctx.input.touched_point.y - gctx.input.mouse_pointer.y
        }
        gctx.input.touched_point = null        
    })
    window.addEventListener('mouseup', (e) => {
        if (!gctx.input.touched_point) return

        if ((e.target as HTMLElement).closest('.prevent-shot')) {
            return
        }

        const d = {
            x: gctx.input.touched_point.x - e.clientX,
            y: gctx.input.touched_point.y - e.clientY,
        }
        gctx.input.touched_point = null
    })
}