import {Switch, Redirect, Route} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import NotFound from './components/NotFound'

import './App.css'

const App = () => {
  return (
    <Switch>
      <Route exact path='/ebank/login' component={LoginForm} />
      <Route exact path='/' component={Home} />
      <Route exact path='/not-found' component={NotFound} />
      <Redirect to='/not-found' />
    </Switch>
  )
}

export default App
