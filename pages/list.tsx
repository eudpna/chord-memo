
import Head from 'next/head'
import React, { useEffect } from 'react'
import { GameEl } from '../components/game/GameEl'
import { GameElAvoidSSR } from '../components/game/GameElAvoidSSR'
import { chordToName, guitarChordsData, ukuleleChordsData } from '../game/lib/chords'

import guitar from '@tombatossals/chords-db/lib/guitar.json'
import ukulele from '@tombatossals/chords-db/lib/ukulele.json'
import { A } from '../components/A'
import { solfaArr } from '../game/lib/sound/solfa'



function list(instrument: typeof guitar | typeof ukulele) {
    const keys = Object.keys(instrument.chords)
    keys.sort((a, b) => {
        return solfaArr.indexOf(a.replace('sharp', '#')) - solfaArr.indexOf(b.replace('sharp', '#'))
    })
    return keys.map(key => {
        return <div>
            <div className='text-lg font-bold mt-6'>
                {key.replace('sharp', '#')}
            </div>
            <div className='text-sm'>
                {instrument.chords[key].map(c => {
                    return <span key={chordToName(c)}>
                        {chordToName(c)}　
                    </span>
                })}
            </div>
        </div>
    })
}



const url = 'https://santa.nyaw.net'

const Index: React.FC<{}> = () => {
   
    return <>
        <Head>            
            <title>対応コード一覧 コード譜作成</title>
            {/* <meta name="viewport" content=""></meta> */}
        </Head>
        <div lang="ja" className="w-full h-full">
            <div className='p-3 max-w-3xl mx-auto pb-20'>
                <div style={{
                    marginLeft: -5,
                    paddingTop: 8,
                }}>
                    <A inSite href="/">戻る</A>
                </div>
                <div className='text-2xl pt-6' style={{
                    marginLeft: -5,

                }}>
                    対応しているコード一覧
                </div>


            <div>
                    <div className='text-2xl font-bold' style={{
                        marginLeft: -5,
                        marginBottom: -10,
                        marginTop: 50,
                    }}>
                        ギター
                    </div>
                <div>
                    {list(guitar)}
                    {/* {guitarChordsData.map(c => {
                        return <span key={chordToName(c)}>
                            {chordToName(c)}　
                        </span>
                    })} */}
                </div>
                
            </div>
            <div className='text-2xl font-bold' style={{
                marginLeft: -5,
                marginBottom: -10,
                marginTop: 90,
            }}>
                ウクレレ
            </div>
            <div>
                {list(ukulele)}
                {/* {ukuleleChordsData.map(c => {
                    return <span key={chordToName(c)}>
                        {chordToName(c)}
                    </span>
                })} */}
            </div>
            </div>
        </div>
    </>
}

export default Index




