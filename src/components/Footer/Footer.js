import React from "react";
import { Logo } from '../Logo/Logo';
import './Footer.css';

export const Footer = () => {
    return (
        <footer>
            <Logo />
            <p className="site-name">Boogle ClassBoard</p>
        </footer>
    );
}