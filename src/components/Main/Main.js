import { useState, useReducer, useRef, useCallback, useEffect, lazy, Suspense } from 'react'
import { get } from '../getter/getter'
import classes from './Main.module.scss'

const Animes = lazy(() => import('../Animes/Animes'))

const searchItems = {
    RATE: 'ratingRank',
    POPULAR: 'popularityRank',
    FAVORITE: '-favoritesCount',
    START: '-startDate'
}

const reducerFunctions = {
    GET: 'GET_ANIMES',
    UPDATE: 'UPDATE_ANIMES',
}

const [BASE, FILTERS] = ['https://kitsu.io/api/edge/anime/?sort=', '&page%5Blimit%5D=20&page%5Boffset%5D=']

const reducer = (state, action) => {
    switch (action.type) {
        case reducerFunctions.GET:
            return {
                animes: action.payload,
            }
        case reducerFunctions.UPDATE:
            return {
                animes: state.animes.concat(action.payload)
            }
        default:
            return state
    }
}

export default function Main() {

    const sortBy = sessionStorage.getItem('sortBy')

    const [state, dispatch] = useReducer(reducer, { animes: [] })
    const [loading, setLoading] = useState(true)
    const [sort, setSort] = useState(sortBy ? sortBy : searchItems.RATE)
    const observe = useRef()

    const getAnime = async (array, reducerFunction) => {
        setLoading(true)
        const $ = await get(BASE + sort + FILTERS + array.length)
        dispatch({
            type: reducerFunction,
            payload: await $.data
        })
        setLoading(false)
    }

    const refElement = useCallback(node => {
        if (loading) return
        if (observe.current) observe.current.disconnect()
        observe.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                getAnime(state.animes, reducerFunctions.UPDATE)
            }
        })
        if (node) observe.current.observe(node)
    }, [loading])


    useEffect(() => {
        getAnime([], reducerFunctions.GET)
    }, [sort])


    const selectHandler = (event) => {
        setSort(event.target.value)
        sessionStorage.setItem('sortBy', event.target.value)
    }


    return (
        <div className={classes.main}>
            <div className={classes.sortby}>
                <label>Filter&nbsp;
                    <select onChange={selectHandler} value={sortBy ? sortBy : searchItems.RATE}>
                        <option value={searchItems.RATE}>Rating</option>
                        <option value={searchItems.POPULAR}>Popularity</option>
                        <option value={searchItems.FAVORITE}>Most Favorite</option>
                        <option value={searchItems.START}>Upcoming & New</option>
                    </select>
                </label>
            </div>
            <div className={classes.animes}>
                <Suspense fallback={<div>Loading</div>}>

                    <Animes animes={state.animes} animeRef={refElement} loading={loading} />
                    {loading && <p style={{ marginLeft: "2rem" }}>Loading . . .</p>}
                </Suspense>
            </div>
        </div>
    )
}