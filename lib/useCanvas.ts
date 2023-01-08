import { RefObject, useEffect } from "react";
import { useRef, useState } from "react";


const useCanvas = (): [RefObject<HTMLCanvasElement>, CanvasRenderingContext2D | null] => {
    const [state, setstate] = useState<{
        cctx: CanvasRenderingContext2D | null
    }>({
        cctx: null
    });

    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (!canvasRef.current) return
        const canvas = canvasRef.current
        const cctx = canvas!.getContext('2d') as CanvasRenderingContext2D

        setstate(state => ({
            ...state,

            cctx,
        }))
    }, [canvasRef]);

    return [canvasRef, state.cctx]
}

export default useCanvas