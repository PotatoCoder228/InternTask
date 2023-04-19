import React from 'react';
import './FileFormStyle.css';

export function FileForm(){

    const onFileInputLabelClick = (e) => {
        console.log("Clicked");
    }

    return(
        <div className="FileFormBlock">
            <div id="FileFormDescription">
                <p id="FileFormDecriptionText">Форма загрузки</p>
            </div>
            <div id="FileForm">
                <label id="FileFormInputLabel" onClick = {onFileInputLabelClick}>Загрузите файл</label>
            </div>
            <input id="FileFormInputSubmit" type = "submit" value="Отправить"/>
        </div>
    )
}