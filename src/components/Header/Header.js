import { useState } from 'react'
import { Link } from 'react-router-dom'
import classes from './Header.module.scss'
import searchIcon from './search.png'
const Header = () => {

    const [value, setValue] = useState('')

    const changeHandler = event => {
        const iValue = event.target.value.trim()
        iValue.length && setValue(iValue)
    }

    return (
        <div className={classes.main}>
            <h1>Weeb</h1>
            <form onSubmit={(event) => event.preventDefault()}>
                <input type="search" onChange={changeHandler} placeholder="Search..." />
                <Link to={`/a/${value.toLowerCase().split(' ').join('-')}`}>
                    <button>
                        <img src={searchIcon} alt="Search" height="15" width="15" />
                    </button>
                </Link>
            </form>
        </div>
    )
}
export default Header