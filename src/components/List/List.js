import classes from './List.module.scss'
import { Link } from 'react-router-dom'

const List = ({ image, title, id }) => {


    return (

        <div>
            <Link to={`/${id}`}>
                <img
                    src={image.small}
                    alt={title}
                    loading="lazy"
                />
            </Link>
            <p><b> {title} </b></p>
        </div>

    )
}

export default List