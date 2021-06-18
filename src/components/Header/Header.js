import { useState } from 'react'
import { Link } from 'react-router-dom'
const Header = ({ formHandler }) => {

    const [value, setValue] = useState('')

    const changeHandler = event => {
        const iValue = event.target.value.trim().toLowerCase().split(' ').join('-')
        iValue.length && setValue(iValue)
    }

    return (
        // <Router>
        <>
            <h1>Weeb</h1>
            <form onSubmit={(event) => event.preventDefault()}>
                <input type="text" onChange={changeHandler} />
                <Link to={`/${value}`}>
                    <button>

                        Search

                    </button>
                </Link>

            </form>
        </>
        // </Router>
    )
}
export default Header