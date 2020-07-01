import React, { Component } from 'react';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      message: ''
    }
    this.handleSignupClick = this.handleSignupClick.bind(this)
    this.handleCancelClick = this.handleCancelClick.bind(this)
    this.handleEmailValueChange = this.handleEmailValueChange.bind(this)
    this.handlePasswordValueChange = this.handlePasswordValueChange.bind(this)
    this.handleSigninClick = this.handleSigninClick.bind(this)
    this.signin = this.signin.bind(this)
  }

  componentDidMount(){
    this.inputEmail.focus()
  }

  handleSignupClick() {
    this.props.setPage('signup')
  }

  handleCancelClick() {
    this.props.setPage('note')
  }

  handleEmailValueChange() {
    this.setState({
      email: event.target.value
    })
  }

  handlePasswordValueChange() {
    this.setState({
      password: event.target.value
    })
  }

  handleSigninClick() {
    const { email, password } = this.state
    const { signin } = this
    const credential = {
      email,
      password
    }
    this.setState({
      password: ''
    })
    signin(credential)
  }

  signin(credential) {
    fetch('/api/users/signin', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Connection": "keep-alive"
      },
      body: JSON.stringify(credential)
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          message: 'Successfully signed in.'
        })
        window.localStorage.setItem('omega-notes-token', data.token)
        this.props.setPage('note', data.user)
        this.props.setSignin()
      })
      .catch(err => {
        this.setState({
          message: 'Please check your email and password.'
        })
        this.inputEmail.focus()
        console.error(err.message)
      });
  }

  render() {
    const {
      handleSignupClick,
      handleCancelClick,
      handleEmailValueChange,
      handlePasswordValueChange,
      handleSigninClick } = this
    const { email, password, message } = this.state
    return (
      <main>
        <div className="row mx-auto sign-item-box">
          <div className="col-sm-6 mx-auto">
            <div className="h4 text-center text-secondary">signin</div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text bg-info text-white">@</span>
              </div>
              <input
                ref={(input) => { this.inputEmail = input }}
                required
                type="email"
                className="form-control border-info"
                placeholder="email"
                value={email}
                onChange={handleEmailValueChange}></input>
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text bg-info text-white"><i className="fas fa-key"></i></span>
              </div>
              <input
                required
                type="password"
                className="form-control border-info"
                placeholder="password"
                value={password}
                onChange={handlePasswordValueChange}></input>
            </div>
            <div className="text-center my-1">
              <span className="text-danger">{message}</span>
            </div>
            <div className="text-center my-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-info mx-1"
                onClick={handleSigninClick}>signin</button>
              <button
                className="btn btn-sm btn-outline-warning mx-1"
                onClick={handleCancelClick}>cancel</button>
            </div>
            <div className="text-center my-3">
              <button
                className="btn btn-sm mx-1 text-info sign-up-btn"
                onClick={handleSignupClick}>signup</button>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default Signin;
