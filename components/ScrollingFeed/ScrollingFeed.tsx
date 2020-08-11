import { ReactElement, useState, useMemo, CSSProperties, useEffect } from "react";
import styleDefault from './sccrollingfeed.module.sass'
import Loader, { LoaderType } from 'react-loaders'

export type Interval = {
    start: number
    end: number
}

type Props<T> = {
    stepInterval?: number
    maxDataLength: number
    typeloader?: LoaderType
    container?: string //css class
    loader?: string //css class
    responseData(interval: Interval): T[]
    children(data: T, key?: number): ReactElement
}

function ScrollingFeed<T>({ stepInterval = 15, container, loader,
    maxDataLength, typeloader = "pacman",
    responseData, children }: Props<T>): ReactElement {
    const { feed, loaderDefault, containerDefault } = styleDefault
    const [datass, _/* setDatass */] = useState<T[][]>([])
    const [interval, setInterval] = useState<Interval>({ start: 0, end: stepInterval })
    const [loading, setLoading] = useState(false)
    const [isScrollCollapse, setIsScrollCollapse] = useState<boolean>(true)

    const MaxTodos = useMemo<boolean>(() => interval.end <= maxDataLength, [interval])
    const UpdateInterval = (): void => {
        [interval.start, interval.end] = [interval.end, interval.end + stepInterval]
        setInterval({ ...interval })
    }

    useMemo(() =>
        globalThis.onscroll = _ => {
            const { scrollY } = globalThis
            const { scrollHeight, offsetHeight } = document.body
            if (!loading && MaxTodos && scrollY >= scrollHeight - offsetHeight) {
                if (isScrollCollapse || scrollHeight - offsetHeight == 0)
                    setIsScrollCollapse(false)
                UpdateInterval()
            }
        }, [])

    useMemo(async () => {
        if (loading || !MaxTodos) return

        setLoading(true)
        await (() => {
            datass.push(responseData(interval))
            setLoading(false)
        }).call(null)
    }, [interval])

    return <div className={feed}>
        {<div className={container ?? containerDefault}>
            {datass.map((datas, i) =>
                datas.map((data, j) =>
                    children(data, (i + 1) * (j + 1))))}
        </div>}
        {MaxTodos ? <div className={loaderDefault ?? loader}>
            {isScrollCollapse ? <button onClick={UpdateInterval}>Load yet</button> : null}
            <Loader type={typeloader} active={loading} />
        </div> : null}
    </div >
}

export default ScrollingFeed