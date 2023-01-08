import { useEffect, useState } from "react";
import useCounter from "./useCounter";

const useTimer = (fps: number): [number, () => void] => {
    const [counter, countUp, resetCount] = useCounter()

    const update = () => {
        countUp()
    }

    useEffect(() => {
        const timerID = setTimeout(update, 1000 / fps)
        return () => { clearTimeout(timerID) }
    }, [counter]);

    return [counter, resetCount]
}

export default useTimer