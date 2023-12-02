import {withRouter, Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const remove = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="link">
        <img
          className="website-logo-img"
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
        />
      </Link>
      <button type="button" className="logout-btn" onClick={remove}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
