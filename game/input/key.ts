import { Gctx } from "../Gctx"


export function keysToInput(gctx: Gctx) {
    const keys = gctx.input.keys
    if (keys.includes('left')) {
        gctx.input.direction.x = -1
    }
    if (keys.includes('right')) {
        gctx.input.direction.x = 1
    }
    if ((!keys.includes('left') && !keys.includes('right')) || (keys.includes('left') && keys.includes('right'))) {
        gctx.input.direction.x = 0
    }
}

export function setKeyEventListeners(gctx: Gctx) {
    window.addEventListener('keydown', (e) => {
        const key = replaceKeyName(e.key)
        

        if (key === 'z' && !gctx.input.keys.includes('z')) {
            gctx.input.jump = true
            gctx.input.lastJumpedTime = performance.now()
        }

        addKey(gctx, key)

        keysToInput(gctx)
    })

    window.addEventListener('keyup', (e) => {
        const key = replaceKeyName(e.key)
        removeKey(gctx, key)

        keysToInput(gctx)
    })
}

function replaceKeyName(k: string): string {
    let key = k.toLowerCase()
        .replace('arrowleft', 'left')
        .replace('arrowright', 'right')
        .replace('arrowdown', 'down')
        .replace('arrowup', 'up');

    if (key === 'a') return 'left'
    if (key === 'd') return 'right'
    if (key === 's') return 'down'
    if (key === 'w') return 'up'
    if (key === 'j') return 'z'
    if (key === 'k') return 'x'
    return key
}


function addKey(gctx: Gctx, key: string) {
    if (gctx.input.keys.includes(key)) return
    gctx.input.keys.push(key)
}

function removeKey(gctx: Gctx, key: string) {
    gctx.input.keys = gctx.input.keys.filter(k => k !== key)
}