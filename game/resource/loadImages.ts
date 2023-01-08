import urlList from '../../script/resource/imgList.json'
import path from 'path'
import { Gctx } from '../Gctx'


export default async function loadImages(gctx: Gctx): Promise<{ [key: string]: HTMLImageElement }> {

    const imgs = await Promise.all(urlList.map(url => getImage(path.join('images', url), gctx)))

    const results: { [key: string]: HTMLImageElement } = {}

    for (let i = 0; i < urlList.length; i++) {
        results[path.basename(urlList[i], '.png')] = imgs[i]
    }

    return results
}


function getImage(url: string, gctx: Gctx): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const rootPath = '/'

        const image = new Image() // Using optional size for image

        image.src = rootPath + url
        image.addEventListener('load', e => {
            gctx.loadedFileNum ++
            gctx.rerenderUI()
            resolve(image)
        });
    })
}


