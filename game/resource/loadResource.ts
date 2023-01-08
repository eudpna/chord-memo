import loadAudios from "./loadAudios";
import loadImages from "./loadImages";
import { Howl } from 'howler'
import { Gctx } from "../Gctx";

export type AudioResource = { [key: string]: Howl }
export type ImageResource = { [key: string]: HTMLImageElement }

export type Resource = {
    imgs: ImageResource
    audios: AudioResource
}

export async function loadResource(gctx: Gctx): Promise<Resource> {
    // const a = await new Promise((resolve) => {
    //     setTimeout(resolve, 5000)
    // })
    return {
        imgs: await loadImages(gctx),
        audios: await loadAudios(gctx),
    }
}