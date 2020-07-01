import React, { Component } from 'react';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordconfirm: ''
    }
    this.handleCancelClick = this.handleCancelClick.bind(this)
    this.handleSigninClick = this.handleSigninClick.bind(this)
    this.handleUsernameValueChange = this.handleUsernameValueChange.bind(this)
    this.handleEmailValueChange = this.handleEmailValueChange.bind(this)
    this.handlePasswordValueChange = this.handlePasswordValueChange.bind(this)
    this.handlePasswordConfirmValueChange = this.handlePasswordConfirmValueChange.bind(this)
    this.handleSignupClick = this.handleSignupClick.bind(this)
    this.signup = this.signup.bind(this)
  }

  handleCancelClick() {
    this.props.setPage('note')
  }

  handleSigninClick() {
    this.props.setPage('signin')
  }

  handleUsernameValueChange(event) {
    if (event.target.value.length < 2) {
      event.target.value = event.target.value.trim();
    }
    this.setState({
      name: event.target.value
    })
  }

  handleEmailValueChange() {
    if (event.target.value.length < 2) {
      event.target.value = event.target.value.trim();
    }
    this.setState({
      email: event.target.value
    })
  }

  handlePasswordValueChange() {
    if (event.target.value.length < 2) {
      event.target.value = event.target.value.trim();
    }
    this.setState({
      password: event.target.value
    })
  }

  handlePasswordConfirmValueChange() {
    if (event.target.value.length < 2) {
      event.target.value = event.target.value.trim();
    }
    this.setState({
      passwordconfirm: event.target.value
    })
  }

  handleSignupClick() {
    const { name, email, password } = this.state
    const { signup } = this
    const credential = {
      name,
      email,
      password
    }
    signup(credential)
    this.setState({
      name: '',
      email: '',
      password: '',
      passwordconfirm: ''
    })
  }

  signup(credential) {
    fetch('/api/users', {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credential)
    })
      .then(res => res.json())
      .then(data => {
        window.localStorage.setItem('omega-notes-token', data.token)
        this.props.setPage('note', data.user)
        this.props.setSignin()
      })
      .catch(err => console.error(err.message));
  }

  render() {
    const {
      handleCancelClick,
      handleSigninClick,
      handleUsernameValueChange,
      handleEmailValueChange,
      handlePasswordValueChange,
      handlePasswordConfirmValueChange,
      handleSignupClick } = this
    const { message } = this.props
    const { signup } = this.state
    return (
      <main>
        <div className="row mx-auto sign-item-box">
          <div className="col-sm-6 mx-auto">
            <div className="h4 text-center text-secondary">signup</div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text bg-info text-white"><i className="fas fa-user"></i></span>
              </div>
              <input
                autoFocus
                required
                type="text"
                className="form-control border-info"
                placeholder="username"
                onChange={handleUsernameValueChange}></input>
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text bg-info text-white">@</span>
              </div>
              <input
                type="email"
                className="form-control border-info"
                placeholder="email"
                onChange={handleEmailValueChange}></input>
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text bg-info text-white"><i className="fas fa-key"></i></span>
              </div>
              <input
                type="password"
                className="form-control border-info"
                placeholder="password"
                onChange={handlePasswordValueChange}></input>
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text bg-info text-white"><i className="fas fa-key"></i></span>
              </div>
              <input
                type="password"
                className="form-control border-info"
                placeholder="password confirm"
                onChange={handlePasswordConfirmValueChange}></input>
            </div>
            <div className="text-center my-1">
              <span className="text-danger">{message}</span>
            </div>
            <div className="text-center my-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-info mx-1"
                onClick={handleSignupClick}>signup</button>
              <button
                className="btn btn-sm btn-outline-warning mx-1"
                onClick={handleCancelClick}>cancel</button>
            </div>
            <div className="text-center my-3">
              <button
                className="btn btn-sm mx-1 text-info sign-up-btn"
                onClick={handleSigninClick}>signin</button>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default Signup;
