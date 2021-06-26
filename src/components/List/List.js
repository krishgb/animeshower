import classes from './List.module.scss'
import { Link } from 'react-router-dom'

const List = ({ image, title, id, reference, add }) => {

    return (

        <div className={`${classes.list}  ${add !== 'add' ? classes.k : classes.ctitle}`} ref={reference && reference}>
            <Link to={`/a/${id}`} style={{ textDecoration: 'none' }}>
                <img
                    className={add !== 'add' ? classes.k : classes.cimg}
                    src={image?.original}
                    alt={title}
                    loading="lazy"
                />
                <p className={`${classes.title}`}>{title}</p>
            </Link>
        </div>

    )
}

export default List