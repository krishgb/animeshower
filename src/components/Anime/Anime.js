import axios from "axios"
import { useEffect, useState } from "react"
// import classes from './Anime.module.scss'


const Anime = () => {
    // eslint-disable-next-line no-restricted-globals
    const url = `https://kitsu.io/api/edge/anime/${location.href.split('/').slice(-1)[0]}`

    const [data, setData] = useState('')

    let rated
    switch (data.ageRating) {
        case "G":
            rated = '3+'
            break;
        case "PG":
            rated = '13+'
            break
        default:
            rated = '18+'
            break;
    }

    useEffect(() => {
        async function getData() {
            try {
                const { data } = await axios.get(url)
                const attri = await data.data
                setData(attri.attributes)
            } catch (err) {
                alert(err)
            }
        }
        getData()
    }, [url])

    return (
        !data ?
            <p>Loading...</p>
            :
            <div>
                {/* // className={classes.flex}> */}
                <img src={data?.posterImage?.original} alt="img" height="400vh" width="300vw" />
                <div>
                    {/* Title */}
                    <p><strong>{data.canonicalTitle}</strong> [<small>{rated}</small>]</p>

                    {/* Story */}
                    <p>{data.synopsis.split('(')[data.synopsis.split('(').length - 1].includes('Source') ? data.synopsis.split('(')[0] : data.synopsis}</p>

                    {/* Rating */}
                    {data.averageRating && <p><strong>Rating:</strong> {(parseFloat(data.averageRating) / 10).toFixed(2)}</p>}

                    {/* Aired Date */}
                    <p><strong>Aired:</strong> {new Date(data.startDate).toDateString().slice(3)} </p>

                    {/* End Date */}
                    {data.endDate && data.endDate !== data.startDate && <p><strong>End:</strong> {new Date(data.endDate).toDateString().slice(3)}</p>}

                    {/* Next Release */}
                    {data.nextRelease && <p><strong>Next Release:</strong> {new Date(data.nextRelease.slice(0, 10)).toDateString().slice(3)}</p>}

                    {/* Popularity Ranking */}
                    <p><strong>Popularity Ranking:</strong> {data.popularityRank}</p>

                    {/* Rating Rank */}
                    <p><strong>Rating Rank:</strong>{data.ratingRank}</p>

                    {/* Trailer */}
                    {data.youtubeVideoId && (<iframe width="560" height="315" src={`https://www.youtube.com/embed/${data.youtubeVideoId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>)}
                </div>
            </div>


    )
}
export default Anime