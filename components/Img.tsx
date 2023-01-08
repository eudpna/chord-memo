import Image from 'next/image'

export const Img: React.FC<{
    src: string
    className?: string
    width: number
    height: number
    style?: any
}> = (props) => {
    const className = props.className ? props.className : ""

    // const { style, ...rest } = props;
    
    return <Image priority className={className + ' pointer-events-none'} src={props.src} width={props.width} height={props.height}/>
}