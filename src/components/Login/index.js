import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {userId: '', userPin: '', errorMsg: '', showErrorMsg: false}

  handleUserId = event => {
    this.setState({userId: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })

    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  handleUserPin = event => {
    this.setState({userPin: event.target.value})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userId, userPin} = this.state
    const userDetails = {user_id: userId, pin: userPin}
    const url = 'https://apis.ccbp.in/ebank/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {showErrorMsg, errorMsg, userId, userPin} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="app-container">
        <div className="responsive-card">
          <img
            className="website-login-img"
            alt="website login"
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
          />
          <div className="form-card-container">
            <form className="form" onSubmit={this.onSubmitForm}>
              <h1>Welcome Back!</h1>
              <div className="input-container">
                <label htmlFor="userId">User ID</label>
                <input
                  onChange={this.handleUserId}
                  type="text"
                  id="userId"
                  value={userId}
                  placeholder="Enter User ID"
                />
              </div>
              <div className="input-container">
                <label htmlFor="pin">PIN</label>
                <input
                  onChange={this.handleUserPin}
                  type="password"
                  value={userPin}
                  id="pin"
                  placeholder="Enter PIN"
                />
              </div>
              <button className="login-btn" type="submit">
                Login
              </button>
              {showErrorMsg && <p>{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
