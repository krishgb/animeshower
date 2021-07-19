import { useEffect, useState, useRef, useCallback } from 'react'
import { get } from '../getter/getter'
import Animes from '../Animes/Animes'
import classes from './Search.module.scss'

const [BASE, FILTERS] = ['https://kitsu.io/api/edge/anime/?filter%5Btext%5D=', '&page%5Blimit%5D=20&page%5Boffset%5D=']

export default function Search() {

    const [animes, setAnimes] = useState([])
    const [loading, setLoading] = useState(false)
    const [count, setCount] = useState(0)
    // eslint-disable-next-line no-restricted-globals
    const [search, setSearch] = useState(location.pathname.split('/').slice(-1)[0])


    useEffect(() => {
        const url = BASE + search + FILTERS
        async function $(url, end) {
            setLoading(true)
            setAnimes([])
            const $$ = await get(url, end)
            setAnimes(await $$.data)
            setCount(await $$.count)
            setLoading(false)
        }
        $(url, 0)
    }, [search])


    setInterval(() => {
        // eslint-disable-next-line no-restricted-globals
        const path = location.pathname.split('/').slice(-1)[0]
        if (path !== search) {
            setSearch(path)
        }
    }, 100)

    const obs = useRef()
    const last = useCallback(node => {
        if (loading) return
        if (obs.current) obs.current.disconnect()
        obs.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                const url = BASE + search + FILTERS

                async function $(url, end) {
                    setLoading(true)
                    const $$ = await get(url, end)
                    setAnimes(animes.concat(await $$.data))
                    setLoading(false)
                }
                $(url, animes.length)
            }
        })
        if (node) obs.current.observe(node)
    }, [animes, loading, search])


    return (
        <div className={classes.animes}>
            <Animes animes={animes} animeRef={last} />
            {(loading & count > animes.length) ? <p>Loading...</p> : null}
        </div>
    )
}