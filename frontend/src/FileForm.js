import React from 'react';
import './FileFormStyle.css';

export function FileForm(){
    return(
        <div className="FileFormBlock">
            <div id="FileFormDescription">
                <p id="FileFormDecriptionText">Загрузите файл с именами</p>
            </div>
            <label id="FileInputLabel">Загрузите файл</label>
            <div id="FileForm">
                <input id="FileInput" type="file"/>
            </div>
        </div>
    )
}