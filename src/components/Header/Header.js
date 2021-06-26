import { useState } from 'react'
import { Link } from 'react-router-dom'
import classes from './Header.module.scss'
const Header = () => {

    const [value, setValue] = useState('')

    const changeHandler = event => {
        const iValue = event.target.value.trim()
        iValue.length && setValue(iValue)
    }

    return (
        <div className={classes.main}>
            <h1 contentEditable>Weeb</h1>
            <form onSubmit={(event) => event.preventDefault()}>
                <input type="text" onChange={changeHandler} placeholder="Search..." />
                <Link to={`/a/${value.toLowerCase().split(' ').join('-')}`}>
                    <button>
                        Search
                    </button>
                </Link>
            </form>
        </div>
    )
}
export default Header