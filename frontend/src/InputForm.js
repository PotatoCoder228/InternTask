import React, {useState} from 'react';
import './InputFormStyle.css';

export function InputForm() {

    const [isName, setIsName] = useState(<p className="ErrorPlaceholder">Ожидаю действий</p>);

    const onInputFormSubmit = (e) => {
        let textField = document.getElementById("InputFormInputTextField");
        let text = textField.value;
        let pattern = /^([А-ЯЁ]|[A-Z])([a-z]|[а-яё])+$/;//Валидация имени пользователя
        if (!pattern.test(text)) {
            setIsName(<p className="ErrorPlaceholder" style={{color: "red"}}>Имя не прошло валидацию</p>)
        } else {
            setIsName(<p className="ErrorPlaceholder">Ожидаю действий</p>)
        }
        //else post
    }

    return (
        <div className="InputFormBlock">
            <div id="InputFormDescription">
                <p id="InputFormDesciptionText">Форма ввода</p>
            </div>
            <div id="InputFormInputs">
                <input id="InputFormInputTextField" type="text" placeholder="Введите имя"/>
                {isName}
            </div>
            <input id="InputFormSubmit" type="submit" onClick={onInputFormSubmit} value="Отправить"/>
        </div>
    )
}