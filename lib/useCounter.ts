import { useState } from "react";

const useCounter = (): [number, () => void, () => void] => {
    const [state, setstate] = useState<{
        counter: number
    }>({
        counter: 0
    });

    const countUp = () => {
        setstate(state => ({
            ...state,
            counter: state.counter + 1
        }))
    }

    const resetCounter = () => {
        setstate(state => ({
            ...state,
            counter: 0
        }))
    }

    return [state.counter, countUp, resetCounter]
}

export default useCounter