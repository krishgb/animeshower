import { useState } from 'react'
import { Link } from 'react-router-dom'
const Header = ({ formHandler }) => {

    const [value, setValue] = useState('')

    const changeHandler = event => {
        const iValue = event.target.value.trim()
        iValue.length && setValue(iValue)
    }

    return (
        <form onSubmit={(event) => event.preventDefault()}>
            <input type="text" onChange={changeHandler} />
            <Link to={`/a/${value.toLowerCase().split(' ').join('-')}`}>
                <button>
                    Search
                </button>
            </Link>

        </form>
    )
}
export default Header