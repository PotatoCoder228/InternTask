import React from 'react';
import logo from '../resources/logo.svg';
import './HeaderStyle.css';

export function Header() {
    return (
        <div className="HeaderBlock">
            <header className="AppHeader">
                <img className="HeaderLogo" src={logo} alt="Логотип React"/>
                <h1 id="TaskName">Тестовое задание</h1>
                <h2 id="CreatorsName">Аталян Александр Эдуардович</h2>
                <h3 id="CreatorsUniversity">Университет ИТМО, 2023</h3>
            </header>
        </div>
    )
}