import Head from "next/head";
import React, { useEffect, useState } from "react";
import conf from "../../game/conf";
import { Gctx } from "../../game/Gctx";
import { View } from "./UI/View";


export const OGHeader: React.FC<{}> = () => {

    return <>
        <Head>
            <meta name="twitter:card" content="summary" />
            <meta property="og:title" content="サンタクロースを撃ち落とすわよ" />
            <meta property="og:description" content="ブラウザで遊ぶミニゲーム" />
            <meta property="og:image" content={`https://${location.hostname}/og.png`} />
            <meta property="og:url" content={`https://${location.hostname}`} />
        </Head>
    </>
}
