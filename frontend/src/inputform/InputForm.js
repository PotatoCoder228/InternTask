import React, {useState} from 'react';
import './InputFormStyle.css';
import axiosInstance from "../axios/Axios";

export function InputForm({table, setTable}) {

    const [isName, setIsName] = useState(<p className="StatPlaceholder">Ожидаю действий</p>);

    const dynamicTable = (array) => {
        return array.map((data) => {
            return (
                <div className="ColumnRow">
                    <div className="ColumnCell">{data.name}</div>
                    <div className="ColumnCell">{data.age}</div>
                    <div className="ColumnCell">{data.requests}</div>
                </div>
            )
        })
    }
    const onInputFormSubmit = (e) => {
        e.preventDefault();
        let textField = document.getElementById("InputFormInputTextField");
        let text = textField.value;
        let pattern = /^([А-ЯЁ]|[A-Z])([a-z]|[а-яё])+$/;//Валидация имени пользователя
        if (!pattern.test(text)) {
            setIsName(<p className="StatPlaceholder" style={{color: "red"}}>Имя не прошло валидацию</p>);
        } else {
            setIsName(<p style={{color: "green"}} className="StatPlaceholder">Отправка запроса...</p>);
            axiosInstance.post("/person",
                {
                    name: textField.value,
                    currentIndex: 0
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).then(function (response) {
                if (response.status === 200) {
                    setIsName(<p style={{color: "green"}} className="StatPlaceholder">Запрос прошёл успешно<br></br>Возраст
                        человека: {response.data.personAge}</p>);
                    let array = response.data.persons;
                    setTable(dynamicTable(array));
                } else {
                    setIsName(<p style={{color: "green"}} className="StatPlaceholder">{response.data.result}</p>);
                }
            });
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