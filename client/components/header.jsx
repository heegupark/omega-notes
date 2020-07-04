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
      view,
      data,
      username,
      isSignedIn,
      isModalOpen,
      isUploading } = this.props
    const { isSearch, search } = this.state
    return (
      <nav className="navbar bg-info fixed-top">
        <div className="input-group mb-3 search-input-box" style={{ display: view !== 'note' ? 'none' : ''}}>
          {isSearch && !isUploading
            ?(
              <>
                <input
                  type="text"
                  placeholder="search notes"
                  className="pl-2 search-input wide-animation"
                  value={search}
                  style={{ zIndex: '1' }}
                  onChange={handleSearchInputChange}
                />
                <div
                  className="input-group-append"
                  style={{ zIndex: '1' }}>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={handleSearchCancelClick}>
                    X
                  </button>
                </div>
              </>
            )
            : (
                <div
                  disabled={!isUploading}
                  className="search-icon text-white text-center cursor"
                  onClick={handleSearchClick}>
                  <i className="fas fa-search"></i>
                </div>
              )
          }
        </div>
        <div className="mx-auto">
          <div className="col my-auto text-center logo-box">
            <img className="omega-logo mr-1 mb-1" src="images/o-logo.png"/>
            <div className="navbar-brand text-white mx-auto omega-note" onClick={handleLogoClick}>notes</div>
          </div>
        </div>
        <div className="signin-box" style={{ display: view !== 'note' ? 'none' : '' }}>
          <div className="text-center text-white mx-auto mt-1">
            <span className="username">{username || ''}</span>
            {isSignedIn
              ? <button
                disabled={isModalOpen || isUploading ? true: false}
                className="mt-2 btn signin-btn text-dark"
                onClick={handleSignoutClick}>
                  <i className="fas fa-sign-out-alt"></i>
              </button>
              : <button
                disabled={isModalOpen || isUploading ? true : false}
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
