import React, { Component } from 'react';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordconfirm: '',
      message: ''
    }
    this.handleCancelClick = this.handleCancelClick.bind(this)
    this.handleSigninClick = this.handleSigninClick.bind(this)
    this.handleSignupClick = this.handleSignupClick.bind(this)
    this.handleInputchange = this.handleInputchange.bind(this)
    this.handleBackToMain = this.handleBackToMain.bind(this)
    this.signup = this.signup.bind(this)
  }

  handleCancelClick() {
    this.setState({
      name: '',
      email: '',
      password: '',
      passwordconfirm: ''
    })
  }

  handleSigninClick() {
    this.props.setPage('signin')
  }

  handleBackToMain() {
    this.props.setPage('note')
  }

  handleInputchange() {
    if (event.target.value.length < 2) {
      event.target.value = event.target.value.trim();
    }
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSignupClick() {
    const { name, email, password, passwordconfirm } = this.state
    const { signup } = this
    if (password !== passwordconfirm) {
      this.setState({
        message: 'Passwords don\'t match.'
      })
    } else {
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
        if(data.token && data.user) {
          window.localStorage.setItem('omega-notes-token', data.token)
          this.props.setPage('note', data.user)
          this.props.setSignin()
        } else {
          this.setState({
            message: 'Sign-Up is not completed.'
          })
        }
      })
      .catch(err => {
        console.error(`Something wrong happened while signing up:${err.message}`)
      });
  }

  render() {
    const {
      handleCancelClick,
      handleSigninClick,
      handleSignupClick,
      handleBackToMain,
      handleInputchange } = this
    const { name, email, password, passwordconfirm, message } = this.state
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
                name="name"
                value={name || ''}
                onChange={handleInputchange}></input>
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text bg-info text-white">@</span>
              </div>
              <input
                type="email"
                className="form-control border-info"
                placeholder="email"
                name="email"
                value={email || ''}
                onChange={handleInputchange}></input>
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text bg-info text-white"><i className="fas fa-key"></i></span>
              </div>
              <input
                type="password"
                className="form-control border-info"
                placeholder="password"
                name="password"
                value={password || ''}
                onChange={handleInputchange}></input>
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text bg-info text-white"><i className="fas fa-key"></i></span>
              </div>
              <input
                type="password"
                className="form-control border-info"
                placeholder="password confirm"
                name="passwordconfirm"
                value={passwordconfirm || ''}
                onChange={handleInputchange}></input>
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
            <div className="text-center my-3">
              <button
                className="btn btn-sm mx-1 text-secondary sign-up-btn"
                onClick={handleBackToMain}>back to main</button>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default Signup;
