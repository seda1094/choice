import React, { Component } from 'react';
import './Drawer.css'
import Backdrop from '../../UI/backdrop/Backdrop';
import { NavLink } from 'react-router-dom';




class Drawer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    clickHandler = () => {
        this.props.onClose()
    }

    renderLinks = (links) => {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink 
                    to={link.to} 
                    exact={link.exact} 
                    activeClassName={'active'}
                    onClick={this.clickHandler}>
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }
    render() {
        // alert(this.props.isAuthenticated)

        const links = [
            {to: '/', label: 'List', exact: true}
          ]
      
        //   console.log('AUth', this.props.isAuthenticated)
      
          if (this.props.isAuthenticated) {
            links.push({to: '/quiz-creator', label: 'Create test', exact: false})
            links.push({to: '/logout', label: 'LogOut', exact: false})
          } else {
            links.push({to: '/auth', label: 'Authentication', exact: false})
          }
      
        const cls = ['Drawer']
        if (!this.props.isOpen) {
            cls.push('close')
        }
        return (
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks(links)}
                    </ul>
                </nav>
                {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
            </React.Fragment>
        );
    }
}

export default Drawer;