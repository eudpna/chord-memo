import React, { useEffect, useState } from "react";
import conf from "../../game/conf";
import { Gctx } from "../../game/Gctx";
import { View } from "./UI/View";


export const GameEl: React.FC<{}> = () => {
    const [state, setState] = useState<{
        gctx: Gctx | null
    }>({
        gctx: null
    })
    
    const [_, setState0] = useState<{}>({})
    
    function rerenderUI() {
        setState0(state => ({ ...state }))
    }

    useEffect(() => {
         setState(state => ({
            gctx: new Gctx(rerenderUI)
        }))
    }, [])
    
    
    return <>
    <div className="flex flex-col" style={{
        height: '100%',
        width: '100%',
    }}>
            <div className="flex-1"></div>
            <div className="flex-0">
                <div className="mx-auto noselect border border-black"
                    style={{
                        position: 'relative',
                        width: conf.screen.w + 2,
                        height: conf.screen.h + 2
                    }}
                >
                    {state.gctx ? <View gctx={state.gctx} /> : null}
                </div>
            </div>

            <div className="" style={{
                flex: '2 1 0%'
            }}></div>

    </div>
        
    </>
}
