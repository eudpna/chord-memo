
import Head from 'next/head'
import React, { useEffect } from 'react'
import { GameEl } from '../components/game/GameEl'
import { GameElAvoidSSR } from '../components/game/GameElAvoidSSR'

const Index: React.FC<{}> = () => {
   
    return <>
        <Head>
            <link rel="icon" href="/favicon.png" />
            <title>コード譜作成</title>
        </Head>
        <div lang="ja" className="w-full h-full">
            <GameElAvoidSSR />
        </div>
    </>
}

export default Index




