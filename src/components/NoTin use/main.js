import axios from "axios"
import { useEffect, useState } from "react"
import List from '../List/List'

const both = [[], []]


const Main = props => {
    const [animes, setAnimes] = useState([])
    const { url, searchAnime } = props

    let array = searchAnime ? 1 : 0
    const [end, setEnd] = useState(20)

    async function getAnimes(url) {
        try {
            const res = await axios.get(url + 0)
            const getting = await res.data
            const [count, data] = await [getting.meta.count, getting.data]
            both[array].splice(0, both[array].length)
            await both[array].push(...data)
            setAnimes(both[array].slice(0, 20))
            for (let j = 20; j < count; j += 20) {

                const response = await axios.get(url + j)
                const got = await response.data
                const animeData = await got.data

                await both[array].push(...animeData)
            }

        } catch (err) {
            if (err) alert(err)
        }
    }


    useEffect(() => {
        getAnimes(url)
        array = searchAnime ? 1 : 0
    }, [url, searchAnime])

    useEffect(() => {
        setEnd(20)
    }, [array])
    // useEffect(() => {
    //     const n = setInterval(() => {
    //         if (both[0].length === 20) setAnimes(both[0].slice(0, 20))
    //     }, 500)

    //     if (animes.length === end) clearInterval(n)


    // }, [])

    // useEffect(() => {
    //     console.log(end)
    //     // console.log(both[0].indexOf(both[0].slice(end - 20, end)[0]))

    // }, [end])


    const wheeler = async () => {
        if (window.innerHeight + window.scrollY > document.body.offsetHeight - 500) {
            await setEnd(end + 20)
            await setAnimes(animes.concat(both[array].slice(end, end + 20)))

        }
    }


    return (

        <div onWheel={wheeler}>
            Main

            {animes.length < 20 ? <p>Loading...</p> :
                <List animes={animes} />
            }
        </div>
    )
}

export default Main