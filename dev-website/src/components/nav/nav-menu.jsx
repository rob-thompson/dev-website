import React, { useState } from 'react';
import './nav.css';

function NavMenu() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [subMenuOpen, setSubMenuOpen] = useState(false);
    const [selectedSubMenu, setSelectedSubMenuOpen] = useState('');

    const nav = document.querySelector("nav");
    const navLinksContainer = document.querySelector(".nav-links");
    const navLinks = [...document.querySelectorAll(".link")];

    navLinks.forEach((link, index) => {
        let hoverEl = navLinksContainer.querySelector(".hover-el");
        link.style.setProperty("--delay", `${index * 50}ms`);
        link.addEventListener("mousemove", function(e) {
            hoverEl.style.setProperty("--y", `${index * 60}px`);
            hoverEl.style.setProperty("opacity", "1");
            hoverEl.style.setProperty("--mousex", `${e.pageX - hoverEl.offsetLeft}px`);
            hoverEl.style.setProperty("--mousey", `${e.pageY - hoverEl.offsetTop}px`);
        });
        navLinksContainer.addEventListener("mouseout", function() {
            hoverEl.style.setProperty("opacity", "0");
        });
        link.addEventListener("click", function() {
            let hoverEl = navLinksContainer.querySelector(".hover-el");
            hoverEl.style.opacity = '0';
        });
    });

    return (
        <div>

            <nav className={menuOpen ? "nav-open" : ""}>
                <div className={`menu-btn${menuOpen ? " close" : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <div className="line line__1"></div>
                    <div className="line line__2"></div>
                    <div className="line line__3"></div>
                </div>

                <div className="sub-menu-btn"
                    onClick={() => setSubMenuOpen(false)}
                >
                    <div className="line line__1"></div>
                    <div className="line line__2"></div>
                </div>

                <ul className="nav-links">
                    <div className="hover-el" style={{"--y": "0px", "--mousex": "0px","--mousey": "0px"}}/>
                    <li className="link">
                        <a href="/#">Home</a>
                    </li>
                    <li className="link">
                        <a href="/#">About</a>
                        <ol>
                            <li><a href="/#">designers</a></li>
                            <li><a href="/#">developers</a></li>
                        </ol>
                    </li>
                    <li className="link">
                        <a href="/#">Work</a>
                        <ol>
                            <li><a href="/#">web</a></li>
                            <li><a href="/#">graphic </a></li>
                            <li><a href="/#">apps </a></li>
                        </ol>
                    </li>
                    <li className="link">
                        <a href="/#">Contact</a>
                        <ol>
                            <li><a href="/#">Email</a></li>
                            <li><a href="/#">Social</a></li>
                        </ol>
                    </li>
                    <li className="link">
                        <a href="/#">follow me</a>
                        <ol>
                            <li>
                                <a href="/#">
                                    Twitter <i className="fab fa-twitter"></i>
                                </a>
                            </li>
                            <li>
                                <a href="/#">
                                    Codepen <i className="fab fa-codepen"></i>
                                </a>
                            </li>
                        </ol>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default NavMenu;