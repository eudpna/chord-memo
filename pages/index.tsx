
import Head from 'next/head'
import React, { useEffect } from 'react'
import { GameEl } from '../components/game/GameEl'
import { GameElAvoidSSR } from '../components/game/GameElAvoidSSR'

const url = 'https://santa.nyaw.net'

const Index: React.FC<{}> = () => {
   
    return <>
        <Head>
            <link rel="icon" href="/favicon.png" />
            <title>etna</title>
            {/* <meta name="viewport" content=""></meta> */}

            {/* <meta name="twitter:card" content="summary" />
            <meta property="og:title" content="サンタクロースを撃ち落とすわよ" />
            <meta property="og:description" content="ブラウザで遊ぶミニゲーム" />
            <meta property="og:image" content={url+`/og.png`} />
            <meta property="og:url" content={url} /> */}

        </Head>
        <div lang="ja" className="w-full h-full">
            <GameElAvoidSSR />
        </div>
    </>
}

export default Index




