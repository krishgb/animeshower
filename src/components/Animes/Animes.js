import List from '../List/List'
import classes from './Animes.module.scss'

const Animes = ({ animes, animeRef, cate }) => {

    const c = cate === 'ratingRank' ? 'add' : null
    return (
        <div className={classes.animes}>

            {animes.map((anime, index) => {
                const { posterImage, titles, canonicalTitle } = anime.attributes
                return (

                    animes.length - 15 === index ?
                        <List
                            add={index < 6 && c}
                            reference={animeRef}
                            key={anime.id}
                            image={posterImage}
                            title={titles.en}
                            id={anime.id} />
                        :
                        <List
                            add={index < 6 && c}
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