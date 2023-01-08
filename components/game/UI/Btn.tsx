import { ButtonHTMLAttributes } from "react"
import { Gctx } from "../../../game/Gctx"

const gray = '#ddd'

export const Btn: React.FC<ButtonHTMLAttributes<any> & {
    gctx: Gctx
    className?: string
    colorType?: 'red' | 'yellow' | 'blue' | 'dark_yellow'
    style?: any
    height?: number
    disabled?: boolean
}> = (props) => {
    const className = props.className ? props.className : ""

    // const style = props.style?props.style:{}
    

    let color = 'white'
    if (props.colorType) {
        if (props.colorType === 'red') {
            color = '#ff8088'
        }
        if (props.colorType === 'yellow') {
            color = '#fde047'
        }
        if (props.colorType === 'dark_yellow') {
            color = '#dea32f'
        }
        if (props.colorType === 'blue') {
            // color = '#93c5fd'
            color = '#a4f797'
            // color = '#86efac'
        }
    }

    
    


    const { colorType, style, disabled, ...rest } = props;
    
        
    return <button disabled={disabled} {...rest}  className={"bg-white border rounded border-gray-600 px-2 "+className} style={{
        height: 30,
        backgroundColor: color,
        cursor: disabled ? 'default': 'pointer',
        
        color: disabled ? gray : 'black',
        borderColor: disabled ? gray : 'black',
        ...(style===undefined?{}:style)
    }} >
        {props.children}
    </button>
}