import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Navbar from './Navbar'
import Login from './Login'
import Registration from './Registration'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = { key: 1 }
  }

  handleSelect(key){
    this.setState({key})
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <Tabs id="login-registration" className="form-tab" activeKey={this.state.key} onSelect={this.handleSelect.bind(this)}>
            <Tab title="Login" eventKey={1}>
              <Login />
            </Tab>
            <Tab title="Registration" eventKey={2}>
              <Registration />
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Main;
