import M from './M'
const List = (props) => {

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr'
        }}>
            {props.animes.map(a => <M key={a.id} a={a} />)}
        </div>
    )
}

export default List