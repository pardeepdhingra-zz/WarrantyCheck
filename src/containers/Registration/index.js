import React, { Component } from 'react'
import { FormControl, Button } from 'react-bootstrap'
import { Link } from 'react-router'

class Registration extends Component {
  constructor(props){
    super(props)
    this.handleSubmit = this._handleSubmit.bind(this)
  }

  _handleSubmit(e){
    alert('Form submitted' + this.state.email + " : " + this.state.password)
  }

  render() {
    return (
        <div>
  				<form method="post" onSubmit={this.handleSubmit}>
            <h5 className="form-signin-heading">Please Enter your details</h5>
            <FormControl
              type="text"
              placeholder="Email/Phone"
              onChange={e => this.setState({email: e.target.value})}
            />

            <FormControl
              type="password"
              placeholder="Password"
              onChange={e => this.setState({password: e.target.value})}
            />

            <FormControl
              type="password"
              placeholder="Confirm Password"
              onChange={e => this.setState({confirm_password: e.target.value})}
            />

            <Button
              bsStyle="warning"
              className="btn btn-orange"
              type="submit">
              Register <i className="fa fa-angle-double-right"></i>
            </Button>
  				</form>
          <Link to="login">Login</Link>
        </div>
    );
  }
}

export default Registration
