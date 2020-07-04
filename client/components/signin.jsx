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
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSigninClick = this.handleSigninClick.bind(this)
    this.signin = this.signin.bind(this)
    this.handleBackToMain = this.handleBackToMain.bind(this)
    this.inputEmail = React.createRef()
  }

  componentDidMount(){
    this.inputEmail.current.focus()
  }

  handleSignupClick() {
    this.props.setPage('signup')
  }

  handleCancelClick() {
    this.setState({
      email: '',
      password: '',
      message: ''
    })
  }

  handleInputChange() {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handlePasswordValueChange() {
    this.setState({
      password: event.target.value
    })
  }

  handleBackToMain() {
    this.props.setPage('note')
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
    }).then(res => res.json())
      .then(data => {
        if(data.token && data.user) {
          window.localStorage.setItem('omega-notes-token', data.token)
          this.props.setPage('note', data.user)
          this.props.setSignin()
        } else {
          this.setState({
            message: 'Please check your email and password.'
          })
          this.inputEmail.current.focus()
        }
      })
      .catch(err => {
        console.error(`Something wrong happened while signing in:${err.message}`)
      });
  }

  render() {
    const {
      handleSignupClick,
      handleCancelClick,
      handleInputChange,
      handleSigninClick,
      handleBackToMain,
      inputEmail } = this
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
                ref={inputEmail}
                required
                type="email"
                className="form-control border-info"
                placeholder="email"
                name="email"
                value={email || ''}
                onChange={handleInputChange}></input>
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
                name="password"
                value={password || ''}
                onChange={handleInputChange}></input>
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

export default Signin;
