import { useEffect, useRef } from "react";

export const Audio: React.FC<{
    src: string
    volume?: number
}> = (props) => {

    const audioRef = useRef<HTMLAudioElement>(null)

    useEffect(() => {
        if (!audioRef.current) return
        if (props.volume === undefined) return
        audioRef.current.volume = props.volume
    }, [audioRef.current]);

    return <audio
        ref={audioRef}
        controls
        src={props.src}>
        Your browser does not support the
        <code>audio</code> element.
    </audio>
}