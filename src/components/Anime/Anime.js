import axios from "axios"
import { useEffect, useState } from "react"
import { getProducer, getGenres, getMainCharacters as getMCs } from '../getter/getter'
import classes from './Anime.module.scss'


const Anime = () => {
    // eslint-disable-next-line no-restricted-globals
    const id = location.href.split('/').slice(-1)[0]
    const url = `https://kitsu.io/api/edge/anime/${id}`

    const [data, setData] = useState('')
    const [otherDetails, setOtherDetails] = useState({ studio: '', genres: '', mainCharacters: '' })
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
                const { attributes } = await data.data
                const { posterImage, canonicalTitle, synopsis, averageRating, startDate, endDate, nextRelease, popularityRank, ratingRank, ageRating, youtubeVideoId } = attributes
                setData({
                    posterImage,
                    canonicalTitle,
                    synopsis,
                    averageRating,
                    startDate,
                    endDate,
                    nextRelease,
                    popularityRank,
                    ratingRank,
                    ageRating,
                    youtubeVideoId
                })
            } catch (err) {
                alert(err)
            }
        }
        getData()
        getProducer(id, setOtherDetails)
        getGenres(id, setOtherDetails)
        getMCs(id, setOtherDetails)
    }, [url])

    return (
        <>
            {!data ? <p>Loading...</p> :
                <div className={classes.parent}>

                    {/* //.anime */}
                    <div className={classes.anime}>
                        {/* .g */}
                        <div className={classes.g} style={{ "--background": `url(${data?.posterImage?.original}) 0/ cover fixed` }}>
                            {/* .h */}
                            <div className={classes.h}>
                                <img src={data?.posterImage?.original} alt="img" height="400vh" width="300vw" loading="lazy" />
                                {/* .attributes */}
                                <div className={classes.attributes}>

                                    <p style={{ textAlign: 'center' }}><strong>{data.canonicalTitle}</strong> [<small>{rated}</small>]</p>

                                    <p><b>Description: </b> {data.synopsis.split('(')[data.synopsis.split('(').length - 1].includes('Source') || data.synopsis.split('[')[data.synopsis.split('[').length - 1].includes('Written') ? data.synopsis.split(/[/(/[]/)[0] : data.synopsis}</p>

                                    {data.averageRating && <p><strong>Rating:</strong> {(parseFloat(data.averageRating) / 10).toFixed(2)}</p>}

                                    <p><strong>Aired: </strong> {new Date(data.startDate).toDateString().slice(3)} </p>

                                    {data.endDate && data.endDate !== data.startDate && <p><strong>End: </strong> {new Date(data.endDate).toDateString().slice(3)}</p>}

                                    {data.nextRelease && <p><strong>Next Release: </strong> {new Date(data.nextRelease.slice(0, 10)).toDateString().slice(3)}</p>}

                                    <p><strong>Popularity Ranking: </strong> {data.popularityRank}</p>

                                    <p><strong>Rating Rank: </strong>{data.ratingRank}</p>

                                    {otherDetails.studio && <p><strong>Studio: </strong> {otherDetails.studio.toUpperCase()}</p>}

                                    {otherDetails.genres && <p><strong>Genre: </strong> {otherDetails.genres}</p>}


                                </div>
                            </div>
                        </div>

                        {/* Main Characters */}
                        {/* <div>
                        {Object.entries(otherDetails.mainCharacters).map(
                            character => {
                                return (
                                    <div key={character[0]}>
                                        <img src={character[1]} alt={character[0]} />
                                        <p>{character[0]}</p>
                                    </div>
                                )
                            }
                        )}
                    </div> */}

                        {/* .video */}

                    </div>
                    {
                        data.youtubeVideoId && (
                            <div className={classes.video}>
                                <iframe
                                    width="560"
                                    height="315"
                                    src={`https://www.youtube.com/embed/${data?.youtubeVideoId}`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                >
                                </iframe>
                            </div>
                        )
                    }
                </div>
            }
        </>

    )
}
export default Anime














































































// import axios from "axios"
// import { useEffect, useState } from "react"
// import classes from './Anime.module.scss'


// const Anime = () => {
//     // eslint-disable-next-line no-restricted-globals    
//     const url = `https://kitsu.io/api/edge/anime/${location.href.split('/').slice(-1)[0]}`

//     const [data, setData] = useState('')

//     let rated
//     switch (data.ageRating) {
//         case "G":    
//             rated = '3+'
//             break;
//         case "PG":
//             rated = '13+'
//             break
//         default:
//             rated = '18+'
//             break;
//     }

//     useEffect(() => {
//         async function getData() {
//             try {
//                 const { data } = await axios.get(url)    
//                 const attri = await data.data
//                 setData(attri.attributes)
//             } catch (err) {
//                 alert(err)    
//             }
//         }
//         getData()
//     }, [url])

//     return (
//         !data ? <p>Loading...</p> :    
//             <>
//                 {/* //.anime */}
//                 <div className={classes.anime}>
//                     {/* .cover */}
//                     <div className={classes.cover} style={{ background: `url(${data?.posterImage?.original}) 0/ cover fixed` }}>
//                         {/* .data */}
//                         <div className={classes.data}>
//                             <div className={classes.image}>

//                                 <img src={data?.posterImage?.original} alt={data.canonicalTitle} />
//                             </div>
//                             {/* .attributes */}
//                             <div className={classes.attributes}>

//                                 <p style={{ textAlign: 'center' }}><strong>{data.canonicalTitle}</strong> [<small>{rated}</small>]</p>

//                                 <p><b>Description: </b> {data.synopsis.split('(')[data.synopsis.split('(').length - 1].includes('Source') ? data.synopsis.split('(')[0] : data.synopsis}</p>

//                                 {data.averageRating && <p><strong>Rating:</strong> {(parseFloat(data.averageRating) / 10).toFixed(2)}</p>}

//                                 <p><strong>Aired: </strong> {new Date(data.startDate).toDateString().slice(3)} </p>

//                                 {data.endDate && data.endDate !== data.startDate && <p><strong>End: </strong> {new Date(data.endDate).toDateString().slice(3)}</p>}

//                                 {data.nextRelease && <p><strong>Next Release: </strong> {new Date(data.nextRelease.slice(0, 10)).toDateString().slice(3)}</p>}

//                                 <p><strong>Popularity Ranking: </strong> {data.popularityRank}</p>

//                                 <p><strong>Rating Rank: </strong>{data.ratingRank}</p>

//                             </div>
//                             {/* .attributes */}
//                         </div>
//                         {/* .data */}
//                     </div>

//                     {/* .video */}
//                     {data.youtubeVideoId && (
//                         <div className={classes.video}>    
//                             <iframe
//                                 width="560"
//                                 height="315"
//                                 src={`https://www.youtube.com/embed/${data.youtubeVideoId}`}
//                                 title="YouTube video player"
//                                 frameBorder="0"
//                                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                                 allowFullScreen>
//                             </iframe>
//                         </div>)}
//                     {/* .cover */}
//                 </div>

//             </>

//     )
// }
// export default Anime



