import { useEffect, useState } from "react"
import Animes from '../Animes/Animes'
import getAnimes from "../getter/getter"

const searchedAnimes = []
const limit = []
const Search = props => {
    // eslint-disable-next-line no-restricted-globals
    let anime = location.pathname.split('/')[1]
    anime = anime ? anime : 'daily-Lives-of-High-School-Boys'

    const [animes, setAnimes] = useState([])
    const [searched, setSearched] = useState(anime)

    useEffect(() => {
        getAnimes(searchedAnimes, setAnimes, searched, limit)
    }, [searched])

    setInterval(() => {
        // eslint-disable-next-line no-restricted-globals
        const path = location.pathname.split('/')[1]
        if (path !== searched && path !== '') setSearched(path)
    }, 50)

    const wheeler = () => {
        if (window.innerHeight + window.scrollY > document.body.offsetHeight - 500 && animes.length <= limit[0]) {
            setAnimes(animes.concat(searchedAnimes.slice(animes.length, animes.length + 20)))
        }
    }

    return (
        <div onWheel={wheeler}>
            {!animes.length ? <p>Loading...</p> :
                <Animes animes={animes} />
            }
        </div>
    )
}

export default Search