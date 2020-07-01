import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearch: false,
      search: ''
    }
    this.handleLogoClick = this.handleLogoClick.bind(this)
    this.handleLoginClick = this.handleLoginClick.bind(this)
    this.handleSignoutClick = this.handleSignoutClick.bind(this)
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this)
    this.handleSearchCancelClick = this.handleSearchCancelClick.bind(this)
    this.handleSearchClick = this.handleSearchClick.bind(this)
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

  handleSearchInputChange() {
    if (event.target.value.length < 2) {
      event.target.value = event.target.value.trim()
    }
    this.setState({
      search: event.target.value.trim()
    })
    this.props.searchKeyword(event.target.value.trim());
  }

  handleSearchClick() {
    this.setState({
      isSearch: true
    })
  }

  handleSearchCancelClick() {
    this.setState({
      isSearch: false,
      search: ''
    })
    this.props.searchKeyword('');
  }

  render() {
    const {
      handleLogoClick,
      handleLoginClick,
      handleSignoutClick,
      handleSearchInputChange,
      handleSearchCancelClick,
      handleSearchClick } = this
    const {
      data,
      username,
      isSignedIn,
      isModalOpen } = this.props
    const { isSearch, search } = this.state
    return (
      <nav className="navbar bg-info fixed-top">
        <div className="fixed-top input-group mb-3 search-input-box">
        {isSearch
          ?(
            <>
              <input
                type="text"
                placeholder="search notes"
                className="pl-2 search-input wide-animation"
                value={search}
                onChange={handleSearchInputChange}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={handleSearchCancelClick}>
                  X
                </button>
              </div>
              </>
          )
          :(
              <div className="search-cion text-white text-center cursor" onClick={handleSearchClick}>
              <i className="fas fa-search"></i>
            </div>
          )
        }
        </div>
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
