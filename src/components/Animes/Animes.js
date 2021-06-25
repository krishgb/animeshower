import List from '../List/List'
import classes from './Animes.module.scss'

const Animes = ({ animes, animeRef }) => {

    return (
        <div className={classes.animes}>

            {animes.map((anime, index) => {
                const { posterImage, titles, canonicalTitle } = anime.attributes
                return (

                    animes.length - 15 === index ?
                        <List
                            reference={animeRef}
                            key={anime.id}
                            image={posterImage}
                            title={titles.en}
                            id={anime.id} />
                        :
                        <List
                            key={anime.id}
                            image={posterImage}
                            title={titles.en ? titles.en : canonicalTitle}
                            id={anime.id} />
                )
            })}
        </div>
    )
}

export default Animes