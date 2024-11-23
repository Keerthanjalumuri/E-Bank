import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    userId: '',
    pin: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      showErrorMsg: true,
      errorMsg,
    })
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}
    const apiUrl = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    const {userId, pin, showErrorMsg, errorMsg} = this.state
    return (
      <div className="login-container">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="login-img"
          />
          <form className="login-form" onSubmit={this.onSubmitForm}>
            <h1 className="login-heading">Welcome Back!</h1>
            <div className="input-container">
              <label htmlFor="username" className="label-element">
                User ID
              </label>
              <input
                id="username"
                type="text"
                className="input-element"
                placeholder="Enter User ID"
                value={userId}
                onChange={this.onChangeUserId}
              />
            </div>
            <div className="input-container">
              <label htmlFor="password" className="label-element">
                PIN
              </label>
              <input
                id="password"
                type="password"
                className="input-element"
                placeholder="Enter PIN"
                value={pin}
                onChange={this.onChangePin}
              />
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>
            {showErrorMsg && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
