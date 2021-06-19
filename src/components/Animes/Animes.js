import List from '../List/List'
const Animes = ({ animes }) => {

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr'
        }}>

            {animes.map(anime => {
                const { posterImage, canonicalTitle } = anime.attributes
                return (
                    <List
                        key={anime.id}
                        image={posterImage}
                        title={canonicalTitle}
                        id={anime.id} />
                )
            })}
        </div>
    )
}

export default Animes