import { useEffect, useState } from "react"
import Animes from '../Animes/Animes'
import getAnimes from "../getter/getter"

const allAnimes = []
const Main = props => {
    const [animes, setAnimes] = useState([])

    useEffect(() => {
        getAnimes(allAnimes, setAnimes)
    }, [])

    const wheeler = () => {
        if (window.innerHeight + window.scrollY > document.body.offsetHeight - 1000) {
            setAnimes(animes.concat(allAnimes.slice(animes.length, animes.length + 20)))
        }
    }

    return (
        <div onWheel={wheeler}>
            {animes.length < 20 ? <p>Loading...</p> :
                <Animes animes={animes} />
            }
        </div>
    )
}

export default Main