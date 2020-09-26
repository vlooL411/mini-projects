import { ReactElement, useState, useMemo, useRef, CSSProperties, useEffect, MutableRefObject } from "react";
import styleDefault from './sccrollingfeed.module.sass'
import Loader, { LoaderType } from 'react-loaders'

export type Interval = {
    start: number
    end: number
}

type Props<T> = {
    onlyBody?: boolean
    shiftScroll?: number
    stepInterval?: number
    maxDataLength: number
    typeloader?: LoaderType
    style?: CSSProperties
    feed?: string //css class
    container?: string //css class
    loader?: string //css class
    responseData(interval: Interval): T[]
    children(data: T, key?: number): ReactElement
}

function ScrollingFeed<T>({ onlyBody = false, shiftScroll = 0,
    stepInterval = 15, style, feed, container, loader,
    maxDataLength, typeloader = "pacman",
    responseData, children }: Props<T>): ReactElement {
    const { feedDefault, loaderDefault, containerDefault } = styleDefault

    const scrollBody = useRef<HTMLDivElement>(null!)
    const [datass, setDatass] = useState<T[]>([])
    const [interval, setInterval] = useState<Interval>({ start: 0, end: stepInterval })
    const [loading, setLoading] = useState(false)
    const [isScrollCollapse, setIsScrollCollapse] = useState<boolean>(true)

    const isMaxDatas = (): boolean => interval.end <= maxDataLength
    const UpdateInterval = (): void => {
        [interval.start, interval.end] = [interval.end, interval.end + stepInterval]
        setInterval({ ...interval })
    }

    useEffect(() => {
        (onlyBody ? globalThis : scrollBody.current).onscroll = (ev) => {
            let scrollY, scrollH, offsetH;
            if (onlyBody) {
                const { scrollHeight, clientHeight } = document.body
                scrollY = globalThis.scrollY
                scrollH = scrollHeight
                offsetH = clientHeight
            }
            else {
                const { scrollTop, scrollHeight, offsetHeight } = scrollBody.current
                scrollY = scrollTop
                scrollH = scrollHeight
                offsetH = offsetHeight
            }
            scrollY += shiftScroll
            if (!loading && isMaxDatas() && scrollY >= scrollH - offsetH) {
                if (isScrollCollapse || scrollH - offsetH == 0)
                    setIsScrollCollapse(false)
                UpdateInterval()
            }
        }
    }, [])

    useMemo(async () => {
        if (loading) return

        setLoading(true)
        await (() => {
            responseData(interval).forEach(el => datass.push(el))
            setLoading(false)
        }).call(null)
    }, [interval])

    return <>
        <div className={feed ?? feedDefault} style={style} ref={scrollBody}>
            {/* {!isScrollCollapse ? <h1>Nice</h1> : null} */}
            <div className={container ?? containerDefault}>
                {datass.map((data, i) => children(data, i))}
            </div>
            {isMaxDatas() ? <div className={loaderDefault ?? loader}>
                {!loading && isScrollCollapse ?
                    <button onClick={UpdateInterval}>Load yet</button> : null}
                <Loader type={typeloader} active={loading} />
            </div> : null}
        </div >
    </>
}

export default ScrollingFeed
