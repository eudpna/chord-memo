import urlList from '../../script/resource/audioList.json'
import { Howl } from 'howler'
import path from 'path'
import { Gctx } from '../Gctx'

export default async function loadAudios(gctx: Gctx): Promise<{ [key: string]: Howl }> {

    const audios = await Promise.all(urlList.map(url => getAudio(path.join('audios', url), gctx)))

    const results: { [key: string]: Howl } = {}

    for (let i = 0; i < urlList.length; i++) {
        results[path.basename(urlList[i], '.mp3')] = audios[i]
    }

    return results
}


function getAudio(url: string, gctx: Gctx): Promise<Howl> {
    return new Promise((resolve, reject) => {
        const rootPath = '/'

        const sound = new Howl({
            src: [rootPath+url]
        });

        sound.on("load", () => {
            gctx.loadedFileNum ++
            gctx.rerenderUI()
            resolve(sound)
        })
        
    })
}


