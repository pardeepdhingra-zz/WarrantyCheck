import React, { Component } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { Link } from 'react-router'

import './mainNavbar.css'

class MainNavbar extends Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect>
      <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Warranty Check</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem><Link to="/login">Login</Link></NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default MainNavbar
