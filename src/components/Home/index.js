import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import Header from '../Header'
import './index.css'

class Home extends Component {
  render() {
    const token = Cookies.get('jwt_token')
    if (token === undefined) {
      return <Redirect to="ebank/login" />
    }
    return (
      <div className="app-container">
        <Header />
        <div className="digital-card-container">
          <h1 className="digital-card-heading">
            Your Flexibility, Our Excellence
          </h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
            alt="digital card"
            className="digital-card"
          />
        </div>
      </div>
    )
  }
}

export default Home
