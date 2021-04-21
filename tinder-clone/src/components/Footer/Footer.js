import React from 'react'
import './Footer.css';
import Xicon from '../../assets/Xicon.png';
import starIcon from '../../assets/starIcon.png';
import tickIcon from '../../assets/tickIcon.png';
function Footer() {
    return (
        <div className='footer'>
            <img className='footer__icon' src={Xicon} alt=''/>
            <img className='footer__icon' src={starIcon} alt=''/>
            <img className='footer__icon' src={tickIcon} alt=''/>
        </div>
    )
}

export default Footer
