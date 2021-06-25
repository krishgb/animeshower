import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Header from './components/Header/Header'
import Main from './components/Main/Main'
import Search from './components/Search/Search'
import Anime from './components/Anime/Anime'



const App = () => {



    return (

        <BrowserRouter>
            <h1>AS</h1>
            <Header />
            <Switch>

                <Route path='/a/:a(\d+)' exact>
                    <Anime />
                </Route>

                <Route path='/a/:a([\w\W]+)' exact>
                    <Search />
                </Route>

                <Route path='/' >
                    <Main />
                </Route>

            </Switch>
        </BrowserRouter>
    )


}

export default App