import { ReactElement } from "react"
import ScrollingFeed from "../../../components/ScrollingFeed/ScrollingFeed"
import json from './album.json'
import style from './styles.module.sass'

type Photo = {
    albumId: number
    id: number
    title: string
    url: string
    thumbnailUrl: string
}

const Index = (): ReactElement => {
    const { album, photo } = style
    const { photo_id, photo_albumid, photo_title, photo_img } = style
    return <ScrollingFeed container={album}
        maxDataLength={json.length / 10}
        responseData={({ start, end }) => json.slice(start, end)}
        children={(data: Photo, key: number) =>
            <div key={key} className={photo}>
                <div className={photo_title}>{data.title}</div>
                <img src={data.url} alt="" className={photo_img} />
                <div className={photo_id}>{data.id}</div>
                <div className={photo_albumid}>{data.albumId}</div>
            </div>
        } />
}

export default Index