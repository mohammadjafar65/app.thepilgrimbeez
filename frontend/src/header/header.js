import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import HomePage from '../home/homepage';

function Header() {

    const [isChecked, setIsChecked] = useState(false);
    const [divHeight, setDivHeight] = useState('0px');

    useEffect(() => {
        const handleScroll = () => {
        setDivHeight('0px');
        setIsChecked(false);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleChange = (e) => {
        if (e.target.checked) {
        setDivHeight('220px');
        setIsChecked(true);
        } else {
        setDivHeight('0px');
        setIsChecked(false);
        }
    };

    const { pathname } = useLocation();

    return (
        <section id="header">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 xs-center col-md-12 col-12 ">
                        <div className="header_bar">
                            <div className="menu">
                                <div className="menu_icon">
                                    <input type="checkbox" id="checkbox" checked={isChecked} onChange={handleChange} />
                                    {/* <input id="checkbox" type="checkbox" className="validate" /> */}
                                    <label for="checkbox" className="toggle">
                                        <div className="bars" id="bar1"></div>
                                        <div className="bars" id="bar2"></div>
                                        <div className="bars" id="bar3"></div>
                                    </label>
                                </div>
                                <h2><a href="index.html">Home</a></h2>
                                <div className="logo">
                                    <Link to="/" className="btn">
                                        <img src='img/tpb-logo.png' alt=''/>
                                    </Link>
                                    {/* <h3>TPB</h3> */}
                                </div>
                            </div>
                            <div id="mega_menu" style={{ height: divHeight }} classNameName={isChecked ? 'newclassName' : ''}>
                            {/* <div className="mega_menu" id="mega_menu"> */}
                                <div className="inner_ct_menu">
                                    <ul>
                                        <li 
                                            className={pathname === "/" ? "active" : ""}>
                                            <a 
                                            aria-current="page"
                                            href="/">Home</a>
                                        </li>
                                        <li
                                            className={pathname === "/about" ? "active" : ""}>
                                            <a aria-current="page"
                                            href="/about">About</a></li>
                                        <li><a href="contact_us.html">Contact</a></li>
                                        <li><a href="allpackages.html">Packages <iconify-icon
                                                    icon="ph:arrow-up-right"></iconify-icon></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Header;