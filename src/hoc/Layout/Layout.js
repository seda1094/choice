import React, {Component} from 'react';
import './Layout.css'
import MenuToggle from '../../components/navigation/menuToggle/MenuToggle';
import Drawer from '../../components/navigation/drawer/Drawer';
import { connect } from 'react-redux';
class Layout extends Component {
    state={
        menu: false
    }
    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    }
    menuCloseHandler = () => {
        this.setState({
        menu: false

        })
    }
    render(){
        return (
            <div className='Layout'>
                <Drawer 
                isOpen={this.state.menu}
                isAuthenticated={this.props.isAuthenticated}
                onClose={this.menuCloseHandler}/>
                <MenuToggle 
                    onToggle={this.toggleMenuHandler}
                    isOpen={this.state.menu}
                />
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      isAuthenticated: !!state.auth.token
    }
  }
  
  export default connect(mapStateToProps,null)(Layout)