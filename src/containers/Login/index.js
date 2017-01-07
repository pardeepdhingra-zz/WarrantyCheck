import React, { Component } from 'react'
import { FormControl, Button } from 'react-bootstrap'
import { Link } from 'react-router'
import cookie from 'react-cookie'
import {login} from '../../graphql/services'

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: "test@tester.com",
      password: "12345678"
    }
    this.handleSubmit = this._handleSubmit.bind(this)
  }

  _handleSubmit(event) {
    event.preventDefault();
    let {email, password} = this.state;
    login(email, password)
      .then(response => {
        cookie.save('token', response.headers['access-token'], { path: '/' });
        //dispatch({ type: AUTH_USER });
        //window.location.href = CLIENT_ROOT_URL + '/dashboard';
        window.location.reload();
      })
      .catch((error) => {
        console.log(error)
        //errorHandler(dispatch, error.response, AUTH_ERROR)
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h5 className="form-signin-heading">Please Enter your details</h5>
          <FormControl
            type="text"
            placeholder="Email/Phone"
            value={this.state.email}
            onChange={e => this.setState({email: e.target.value})}
          />

          <FormControl
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={e => this.setState({password: e.target.value})}
          />

          <Button
            bsStyle="warning"
            className="btn btn-orange"
            type="submit">
            Login <i className="fa fa-angle-double-right"></i>
          </Button>
        </form>
        Don't have Account? <Link to="/registration">Create Account?</Link>
      </div>
    )
  }
}

export default Login
