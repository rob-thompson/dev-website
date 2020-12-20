import React, { useState } from 'react';
import './nav.css';
import { Link } from "react-router-dom";

let mouseMovePropsSet = false;

const NavMenu = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const [subMenuOpen, setSubMenuOpen] = useState(false);
    const [selectedTopMenuItem, setSelectedTopMenuItem] = useState(null);

    const nav = document.querySelector("nav");
    const navLinksContainer = document.querySelector(".nav-links");
    const navLinks = [...document.querySelectorAll(".link")];

    if (!mouseMovePropsSet)
        navLinks.forEach((link, index) => {
            let hoverEl = navLinksContainer.querySelector(".hover-el");
            link.style.setProperty("--delay", `${index * 50}ms`);
            link.addEventListener("mousemove", function (e) {
                hoverEl.style.setProperty("--y", `${index * 60}px`);
                hoverEl.style.setProperty("opacity", "1");
                hoverEl.style.setProperty("--mousex", `${e.pageX - hoverEl.offsetLeft}px`);
                hoverEl.style.setProperty("--mousey", `${e.pageY - hoverEl.offsetTop}px`);
            });
        });

    const hideHover = () => {
        let hoverEl = navLinksContainer.querySelector(".hover-el");
        hoverEl.style.setProperty("opacity", "0");
    };

    const addTopMenuTabs = () => {
        [...document.querySelectorAll(".link")].forEach((link) => { link.tabIndex = 0; });
    };

    const removeTopMenuTabs = () => {
        [...document.querySelectorAll(".link")].forEach((link) => { link.tabIndex = -1; });
    };

    const addSubMenuButtonTab = () => {
        document.querySelector(".sub-menu-btn").tabIndex = 0;
    };

    const removeSubMenuButtonTab = () => {
        document.querySelector(".sub-menu-btn").tabIndex = -1;
    };

    const focusMenuButton = () => {
        document.querySelector(".menu-btn").focus();
    };

    const focusFirstSubMenuItem = () => {
        let subMenu = nav.querySelector(".sub-menu");
        subMenu.children[0].children[0].children[0].focus();
    };

    const handleLinkClick = (e, linkHasNoSubMenu = false) => {
        setSelectedTopMenuItem(null);
        if (linkHasNoSubMenu) {
            if (e.target && e.target.children[0])
                e.target.children[0].click(); //breaks for enter press, but not for mouse
            else
                e.target.click();
        }
        else
            handleLink(e);
    };

    const handleLink = (e, isKeyboardEvent = false) => {
        let link = e.target;
        link.blur();
        let hoverEl = navLinksContainer.querySelector(".hover-el");
        hoverEl.style.setProperty("opacity", "0");
        toggleSubmenu(link, isKeyboardEvent);
    };

    const menuButtonClick = (isKeyboardEvent = false) => {
        if (menuOpen) {
            removeTopMenuTabs();
            removeSubMenuButtonTab();
            mouseMovePropsSet = true;
            removeSubmenu();
        }
        else {
            addTopMenuTabs();
            removeSubMenuButtonTab();
        }
        if (isKeyboardEvent)
            focusMenuButton();
        setMenuOpen(!menuOpen);
    };

    const toggleSubmenu = (el, isKeyboardEvent = false) => {
        setSubMenuOpen(!subMenuOpen);
        let subMenu = nav.querySelector(".sub-menu");
        if (el.children[1]) {
            removeTopMenuTabs();
            createSubmenu(el, isKeyboardEvent);
        } else if (nav.contains(subMenu)) {
            addTopMenuTabs();
            removeSubmenu();
        }
    };

    const createSubmenu = (el, isKeyboardEvent = false) => {
        let subMenuContainer = document.createElement("div");
        subMenuContainer.className = "sub-menu";
        let subMenuItem = el.children[1].cloneNode(true);
        let subMenuItemList = [...subMenuItem.children];
        subMenuItemList.forEach((item, index) => {
            item.classList.add("off-menu");
            item.style.setProperty("--delay", `${index * 40}ms`);
        });
        nav.classList.toggle("sub-menu-open");
        addSubMenuButtonTab();
        removeTopMenuTabs();
        nav.appendChild(subMenuContainer);
        subMenuContainer.appendChild(subMenuItem);
        setTimeout(function () {
            subMenuItemList.forEach((item, index) => {
                item.classList.remove("off-menu");
                item.classList.add("on-menu");
                if (!index) item.focus();
            });
            if (isKeyboardEvent) {
                setTimeout(() =>
                    focusFirstSubMenuItem()
                    , 200);
            }
        }, 200);
    };

    const removeSubmenu = () => {
        let isFirst = true;
        removeSubMenuButtonTab();
        nav.querySelectorAll(".sub-menu").forEach((subMenu) => {
            if (!isFirst) {
                subMenu.remove();
                return;
            }
            if (!!selectedTopMenuItem)
                selectedTopMenuItem.focus();
            if (!subMenu || !subMenu.children || !subMenu.children.length || !subMenu.children[0])
                return;

            let subMenuItemList = [...subMenu.children[0].children];
            if (nav.contains(subMenu)) {
                subMenuItemList.forEach(item => {
                    item.classList.add("off-menu");
                    item.classList.remove("on-menu");
                });
                setTimeout(function () {
                    nav.removeChild(subMenu);
                }, 500);
                isFirst = false;
            }
        });
    };

    const handleKeyDown = (e, linkHasNoSubMenu = false) => {
        if (e.keyCode === 13) {
            if (linkHasNoSubMenu) {
                let node = e.target.children[0];
                node.click();
            }
            else {
                setSelectedTopMenuItem(e.target);
                handleLink(e, true);
            }
        }
    };

    const closeSubMenu = () => {
        nav.classList.toggle("sub-menu-open");
        addTopMenuTabs();
        removeSubmenu();
    };

    return (
        <div>
            <nav className={menuOpen ? "nav-open" : ""}>
                <div
                    className={`menu-btn${menuOpen ? " close" : ''}`}
                    tabIndex='0'
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => menuButtonClick()}
                    onKeyDown={(e) => { if (e.keyCode === 13) menuButtonClick(true); }}
                >
                    <div className="line line__1"></div>
                    <div className="line line__2"></div>
                    <div className="line line__3"></div>
                </div>

                <div
                    className={`sub-menu-btn`}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => closeSubMenu()}
                    onKeyDown={(e) => { if (e.keyCode === 13) closeSubMenu(); }}
                >
                    <div className="line line__1"></div>
                    <div className="line line__2"></div>
                </div>

                <ul className="nav-links" onMouseOut={() => hideHover()}>
                    <div className="hover-el" style={{ "--y": "0px", "--mousex": "0px", "--mousey": "0px" }} />
                    <li
                        className="link"
                        onClick={(e) => handleLinkClick(e, true)}
                        onMouseDown={(e) => e.preventDefault()}
                        onKeyDown={(e) => handleKeyDown(e, true)}
                    >
                        <Link to="/home" tabIndex='-1'>Home</Link>
                    </li>
                    <li className="link"
                        onClick={handleLinkClick}
                        onKeyDown={handleKeyDown}>
                        <Link
                            to="/home/algorithms"
                            tabIndex='-1'>
                            Algorithm Visualizers
                            </Link>
                        <ol>
                            <li><Link to="/sorts">Sorts</Link></li>
                            <li><Link to="/searches">Searches</Link></li>
                            <li><Link to="/machinelearning">Machine Learning</Link></li>
                        </ol>
                    </li>
                    <li className="link"
                        onClick={handleLinkClick}
                        onKeyDown={handleKeyDown}>
                        <Link
                            to="/home/personal"
                            tabIndex='-1'>
                            Published Works
                            </Link>
                        <ol>
                            <li><Link to="/#">Pint glass website</Link></li>
                            <li><Link to="/#">Chan's Lawncare</Link></li>
                        </ol>
                    </li>
                    <li className="link"
                        onClick={handleLinkClick}
                        onKeyDown={handleKeyDown}>
                        <Link
                            to="/home/personal"
                            tabIndex='-1'>
                            Personal Tools
                            </Link>
                        <ol>
                            <li><Link to="/#">Online Text Editor</Link></li>
                            <li><Link to="/#">Phasmo Tool</Link></li>
                            <li><Link to="/#">To-Do List</Link></li>
                        </ol>
                    </li>
                    <li className="link"
                        onClick={handleLinkClick}
                        onKeyDown={handleKeyDown}>
                        <Link
                            to="/home/contact"
                            tabIndex='-1'>
                            Contact
                                </Link>
                        <ol>
                            <li><Link to="/email">Email</Link></li>
                            <li><Link to="/#">LinkedIn</Link></li>
                        </ol>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default NavMenu;