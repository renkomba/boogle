import React from "react";
import { Logo } from '../Logo/Logo';
import './Footer.css';

const Footer = () => {
    return (
        <footer>
            <Logo />
            <p className="site-name">Boogle ClassBoard</p>
        </footer>
    );
}

export default Footer;