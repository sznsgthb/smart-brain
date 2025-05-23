import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './brain-logo-01.png';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className='tile center' style={{ height: '300px', width: '300px' }}>
                <div className='pa1'>
                        <img style={{ paddingTop: '5px' }} src={brain} alt='logo' />
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;