import React from "react"
import dynamic from "next/dynamic"

const AvoidSSRComponent = dynamic(
    () => import('./GameEl')
        .then(modules => modules.GameEl),
    { ssr: false }
)

export const GameElAvoidSSR: React.FC<{
}> = (props) => {
    return <AvoidSSRComponent />
}
