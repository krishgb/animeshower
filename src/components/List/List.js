import classes from './List.module.scss'
import { Link } from 'react-router-dom'

const List = ({ image, title, id, reference }) => {

    return (

        <div className={classes.list} ref={reference && reference}>
            <Link to={`/a/${id}`} style={{ textDecoration: 'none' }}>
                <img
                    src={image?.small}
                    alt={title}
                    loading="lazy"
                />
                <p className={`${classes.title}`}>{title}</p>
            </Link>
        </div>

    )
}

export default List