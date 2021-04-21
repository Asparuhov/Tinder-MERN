import React from 'react'
import PersonIcon from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton';
import fireIcon from '../../assets/fireIcon.png';
import ChatIcon from '@material-ui/icons/Chat';
import './Header.css';
function Header() {
    return (
        <div className='header'>
            <IconButton>
            <PersonIcon fontSize='large' className='header__icon'/>
            </IconButton>
            <img className='header__icon'
            src={fireIcon}/>
            <IconButton>
            <ChatIcon fontSize='large' className='header__icon'/>
            </IconButton>
        </div>
    )
}

export default Header
