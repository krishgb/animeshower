import Main from './components/Main/Main'
import Header from './components/Header/Header'
import { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

const BASE_URL = 'https://kitsu.io/api/edge/'


const App = () => {
    const [url, setUrl] = useState(`${BASE_URL}anime/?sort=ratingRank&page%5Blimit%5D=20&page%5Boffset%5D=`)
    const [searchAnime, setSearchAnime] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const formHandler = event => {
        setIsLoading(true)
        event.preventDefault()
        const value = event.target.children[0].value.trim()

        if (value !== '') {
            setSearchAnime(value)
            setUrl(`${BASE_URL}anime/?filter%5Btext%5D=${value}&page%5Blimit%5D=20&page%5Boffset%5D=`)

        } else {
            setUrl(`${BASE_URL}anime/?sort=ratingRank&page%5Blimit%5D=20&page%5Boffset%5D=`)
            setSearchAnime('')
        }
        setIsLoading(!1)
    }

    const changeHandler = event => {
    }

    return (

        <div>
            <Header formHandler={formHandler} changeHandler={changeHandler} />
            <BrowserRouter>
                <Switch>
                    <Route path='/' >
                        <Main url={url} searchAnime={searchAnime} isLoading={isLoading} />
                    </Route>

                </Switch>
            </BrowserRouter>
        </div>
    )


}

export default App