import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleLogoClick = this.handleLogoClick.bind(this)
    this.handleLoginClick = this.handleLoginClick.bind(this)
    this.handleSignoutClick = this.handleSignoutClick.bind(this)
  }

  handleLogoClick() {
    this.props.setPage('note')
  }

  handleLoginClick() {
    this.props.setPage('signin')
  }

  handleSignoutClick() {
    this.props.openModal('signout')
  }

  render() {
    const { handleLogoClick, handleLoginClick, handleSignoutClick } = this
    const { data, username, isSignedIn, isModalOpen } = this.props
    return (
      <nav className="navbar bg-info fixed-top">
        <div className="row w-100 mx-auto">
          <div className="col my-auto text-center">
            <a href="https://www.heegu.net" target="_blank">
              <img className="omega-logo mr-1 mb-1" src="images/o-logo.png"/>
            </a>
            <a className="navbar-brand text-white mx-auto omega-note" onClick={handleLogoClick}>omega notes</a>
          </div>
        </div>
        <div className="signin-box">
          <div className="text-center text-white mx-auto mt-1">
            <span>{username || ''}</span>
            {isSignedIn
              ? <button
                disabled={isModalOpen ? true: false}
                className="mt-2 btn signin-btn text-dark"
                onClick={handleSignoutClick}>
                  <i className="fas fa-sign-out-alt"></i>
              </button>

              : <button
                disabled={isModalOpen ? true : false}
                className="mt-2 btn signin-btn text-white"
                onClick={handleLoginClick}>
                <i className="fas fa-sign-in-alt"></i>
              </button>
            }
          </div>
        </div>
      </nav>
    )
  }
}

export default Header;
