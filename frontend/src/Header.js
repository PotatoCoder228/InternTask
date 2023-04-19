import React from 'react';
import logo from './logo.svg';
import './HeaderStyle.css';

export function Header(){
    return(
        <div className="HeaderBlock">
            <img className="HeaderLogo" src={logo} alt="Логотип React"/>
            <header className="AppHeader">
                <h1 id = "TaskName">Задание для стажировки в Naumen</h1>
                <h2 id = "CreatorsName">Аталян Александр Эдуардович</h2>
                <h3 id = "CreatorsUniversity">Университет ИТМО, 2023</h3>
            </header>
        </div>
    )
}