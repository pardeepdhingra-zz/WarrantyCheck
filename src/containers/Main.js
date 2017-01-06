import React, { Component } from 'react';
import MainNavbar from './MainNavbar'

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
        <MainNavbar />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Main;
