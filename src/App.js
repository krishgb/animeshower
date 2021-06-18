import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Header from './components/Header/Header'
import Main from './components/Main/Main'
import Search from './components/Search/Search'



const App = () => {



    return (

        <BrowserRouter>
            <Header />
            <Switch>


                <Route path='/:a([\w\W]+)' exact>
                    <Search />
                </Route>

                <Route path='/'>
                    <Main />
                </Route>

            </Switch>
        </BrowserRouter>
    )


}

export default App